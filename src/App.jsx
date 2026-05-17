import { useState, useEffect } from "react";
import FrameworkMap from "./components/FrameworkMap";
import QuestionFlow from "./components/QuestionFlow";
import Synthesis from "./components/Synthesis";
import Auth from "./components/Auth";
import { FRAMEWORK_NODES } from "./data/framework";
import { supabase } from "./supabase";

export default function App() {
  const [phase, setPhase] = useState("map");
  const [session, setSession] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [answers, setAnswers] = useState({});
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const [coherenceInsights, setCoherenceInsights] = useState([]);

  // Auth listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoadingSession(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load answers from Supabase when session is ready
  useEffect(() => {
    if (!session) return;

    const loadAnswers = async () => {
      const { data, error } = await supabase
        .from("answers")
        .select("*")
        .eq("user_id", session.user.id);

      if (error) { console.error(error); return; }

      const rebuilt = {};
      data.forEach(row => {
        if (!rebuilt[row.node_id]) rebuilt[row.node_id] = {};
        rebuilt[row.node_id][row.question_index] = {
          text: row.answer_text,
          timestamp: row.updated_at
        };
      });
      setAnswers(rebuilt);
    };

    loadAnswers();
  }, [session]);

  const saveAnswer = async (nodeId, questionIndex, answer) => {
    // Update local state
    setAnswers(prev => ({
      ...prev,
      [nodeId]: {
        ...(prev[nodeId] || {}),
        [questionIndex]: {
          text: answer,
          timestamp: new Date().toISOString()
        }
      }
    }));

    // Save to Supabase
    if (session) {
      await supabase.from("answers").upsert({
        user_id: session.user.id,
        node_id: nodeId,
        question_index: questionIndex,
        answer_text: answer,
        updated_at: new Date().toISOString()
      }, { onConflict: "user_id,node_id,question_index" });
    }
  };

  const completedNodes = Object.keys(answers).filter(nodeId => {
    const node = FRAMEWORK_NODES.find(n => n.id === nodeId);
    if (!node) return false;
    const nodeAnswers = answers[nodeId];
    return node.questions.every((_, i) => nodeAnswers[i]?.text?.trim());
  });

  const progress = completedNodes.length / FRAMEWORK_NODES.length;

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setAnswers({});
    setPhase("map");
  };

  if (loadingSession) {
    return (
      <div style={{
        minHeight: "100vh", background: "#0A0A08",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <div style={{ color: "#4A4440", fontFamily: "monospace", fontSize: 12, letterSpacing: "0.2em" }}>
          ...
        </div>
      </div>
    );
  }

  if (!session) {
    return <Auth />;
  }

  return (
    <div className="app">
      {/* Sign out button */}
      <div style={{
        position: "fixed", top: 16, right: 16, zIndex: 100
      }}>
        <button
          onClick={handleSignOut}
          style={{
            background: "none", border: "none", color: "#3A3430",
            cursor: "pointer", fontSize: 10, letterSpacing: "0.15em",
            textTransform: "uppercase", fontFamily: "monospace"
          }}
        >
          Sign out
        </button>
      </div>

      {phase === "map" && (
        <FrameworkMap
          answers={answers}
          completedNodes={completedNodes}
          onStartJourney={() => { setCurrentNodeIndex(0); setPhase("questions"); }}
          onNodeSelect={(idx) => { setCurrentNodeIndex(idx); setPhase("questions"); }}
          onViewSynthesis={() => setPhase("synthesis")}
          progress={progress}
        />
      )}
      {phase === "questions" && (
        <QuestionFlow
          nodes={FRAMEWORK_NODES}
          currentNodeIndex={currentNodeIndex}
          answers={answers}
          onSaveAnswer={saveAnswer}
          onNodeChange={setCurrentNodeIndex}
          onBackToMap={() => setPhase("map")}
          onComplete={() => setPhase("synthesis")}
          coherenceInsights={coherenceInsights}
          onCoherenceUpdate={setCoherenceInsights}
        />
      )}
      {phase === "synthesis" && (
        <Synthesis
          answers={answers}
          nodes={FRAMEWORK_NODES}
          onBack={() => setPhase("map")}
        />
      )}
    </div>
  );
}
