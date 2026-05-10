import { useState, useEffect } from "react";
import FrameworkMap from "./components/FrameworkMap";
import QuestionFlow from "./components/QuestionFlow";
import Synthesis from "./components/Synthesis";
import { FRAMEWORK_NODES } from "./data/framework";

const PHASES = ["map", "questions", "synthesis"];

export default function App() {
  const [phase, setPhase] = useState("map");
  const [answers, setAnswers] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("son_answers") || "{}");
    } catch { return {}; }
  });
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const [coherenceInsights, setCoherenceInsights] = useState([]);

  useEffect(() => {
    localStorage.setItem("son_answers", JSON.stringify(answers));
  }, [answers]);

  const saveAnswer = (nodeId, questionIndex, answer) => {
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
  };

  const completedNodes = Object.keys(answers).filter(
    nodeId => {
      const node = FRAMEWORK_NODES.find(n => n.id === nodeId);
      if (!node) return false;
      const nodeAnswers = answers[nodeId];
      return node.questions.every((_, i) => nodeAnswers[i]?.text?.trim());
    }
  );

  const progress = completedNodes.length / FRAMEWORK_NODES.length;

  return (
    <div className="app">
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
