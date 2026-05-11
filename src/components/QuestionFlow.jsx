import { useState, useEffect, useRef } from "react";
import { AXIS_META } from "../data/framework";

const ANTHROPIC_API_URL = "/api/claude";

async function getCoherenceInsight(currentNode, currentAnswer, allAnswers, allNodes) {
  const previousAnswers = allNodes
    .filter(n => allAnswers[n.id] && n.id !== currentNode.id)
    .map(n => {
      const nodeAnswers = allAnswers[n.id];
      const answerTexts = Object.values(nodeAnswers).map(a => a.text).filter(Boolean).join(" | ");
      return `[${n.label}]: ${answerTexts}`;
    })
    .join("\n");

  const currentAnswerText = Object.values(currentAnswer || {})
    .map(a => a.text).filter(Boolean).join(" | ");

  if (!currentAnswerText || !previousAnswers) return null;

  const prompt = `You are a psychological mirror for a deep personal framework called "Seed of Nature". 
The framework has three axes: Present (pattern recognition), Methods (iterative synthesis), Will (directed action).
Each axis explores Truth, Great (Union/Order/Essence), and Beautiful.

The person has just completed the node: "${currentNode.label}" (${currentNode.subtitle})
Their answer: "${currentAnswerText}"

Previous reflections from other nodes:
${previousAnswers}

Your task: In 2-3 sentences maximum, surface ONE meaningful connection or tension between this answer and what they've shared elsewhere. Be precise and psychologically sharp. Do not be generic. Do not use the word "interesting". Do not use framework jargon — speak to the human. Start with what you actually see.`;

  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "claude-opus-4-5",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }]
      })
    });
    const data = await response.json();
    return data.content?.[0]?.text || null;
  } catch (e) {
    return null;
  }
}

export default function QuestionFlow({
  nodes, currentNodeIndex, answers, onSaveAnswer,
  onNodeChange, onBackToMap, onComplete, coherenceInsights, onCoherenceUpdate
}) {
  const node = nodes[currentNodeIndex];
  const [localAnswers, setLocalAnswers] = useState({});
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [coherenceText, setCoherenceText] = useState(null);
  const [loadingCoherence, setLoadingCoherence] = useState(false);
  const [nodeComplete, setNodeComplete] = useState(false);
  const textareaRef = useRef(null);

  // Load existing answers when node changes
  useEffect(() => {
    setLocalAnswers(answers[node.id] || {});
    setActiveQuestion(0);
    setCoherenceText(null);
    setNodeComplete(false);
  }, [node.id]);

  useEffect(() => {
    if (textareaRef.current) textareaRef.current.focus();
  }, [activeQuestion]);

  const currentAnswer = localAnswers[activeQuestion]?.text || "";
  const allQuestionsAnswered = node.questions.every((_, i) => localAnswers[i]?.text?.trim());

  const handleSave = (questionIndex, text) => {
    const updated = { ...localAnswers, [questionIndex]: { text, timestamp: new Date().toISOString() } };
    setLocalAnswers(updated);
    onSaveAnswer(node.id, questionIndex, text);
  };

  const handleNodeComplete = async () => {
    setNodeComplete(true);
    // Trigger coherence check
    if (Object.keys(answers).length > 0) {
      setLoadingCoherence(true);
      const insight = await getCoherenceInsight(node, localAnswers, answers, nodes);
      setCoherenceText(insight);
      setLoadingCoherence(false);
    }
  };

  const handleNext = () => {
    if (currentNodeIndex < nodes.length - 1) {
      onNodeChange(currentNodeIndex + 1);
    } else {
      onComplete();
    }
  };

  const axisMeta = AXIS_META[node.axis];
  const depthLabel = node.depth ? node.depth.charAt(0).toUpperCase() + node.depth.slice(1) : null;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0A08",
      color: "#E8E0D0",
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Top bar */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "20px 32px", borderBottom: "1px solid #1A1A16"
      }}>
        <button
          onClick={onBackToMap}
          style={{
            background: "none", border: "none", color: "#4A4440",
            cursor: "pointer", fontSize: 12, letterSpacing: "0.15em",
            textTransform: "uppercase", fontFamily: "monospace"
          }}
        >
          ← Map
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, color: "#3A3430", fontFamily: "monospace" }}>
            {currentNodeIndex + 1} / {nodes.length}
          </span>
          <div style={{ width: 80, height: 1, background: "#1A1A16", position: "relative" }}>
            <div style={{
              position: "absolute", top: 0, left: 0, height: "100%",
              width: `${((currentNodeIndex + 1) / nodes.length) * 100}%`,
              background: axisMeta.color
            }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => onNodeChange(Math.max(0, currentNodeIndex - 1))}
            disabled={currentNodeIndex === 0}
            style={{
              background: "none", border: "1px solid #2A2A24", color: "#4A4440",
              cursor: currentNodeIndex === 0 ? "not-allowed" : "pointer",
              width: 28, height: 28, fontFamily: "monospace", fontSize: 12
            }}
          >‹</button>
          <button
            onClick={() => onNodeChange(Math.min(nodes.length - 1, currentNodeIndex + 1))}
            disabled={currentNodeIndex === nodes.length - 1}
            style={{
              background: "none", border: "1px solid #2A2A24", color: "#4A4440",
              cursor: currentNodeIndex === nodes.length - 1 ? "not-allowed" : "pointer",
              width: 28, height: 28, fontFamily: "monospace", fontSize: 12
            }}
          >›</button>
        </div>
      </div>

      {/* Main content */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        maxWidth: 720, width: "100%", margin: "0 auto", padding: "48px 32px"
      }}>
        {/* Node header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "center" }}>
            <span style={{
              fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase",
              color: axisMeta.color, fontFamily: "monospace"
            }}>
              {axisMeta.label}
            </span>
            {node.value && (
              <>
                <span style={{ color: "#2A2A24" }}>×</span>
                <span style={{
                  fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "#4A4440", fontFamily: "monospace"
                }}>
                  {node.value === "beautiful" ? "Beautiful" : node.value === "truth" ? "Truth" : "Great"}
                </span>
              </>
            )}
            {depthLabel && (
              <>
                <span style={{ color: "#2A2A24" }}>×</span>
                <span style={{
                  fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "#3A3430", fontFamily: "monospace"
                }}>
                  {depthLabel}
                </span>
              </>
            )}
          </div>

          <h2 style={{
            fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 300,
            margin: "0 0 12px 0", letterSpacing: "-0.01em",
            color: node.accentColor
          }}>
            {node.label}
          </h2>
          <p style={{ color: "#4A4440", fontSize: 15, margin: 0, fontStyle: "italic", lineHeight: 1.6 }}>
            {node.description}
          </p>
        </div>

        {/* Exercise prompt */}
        <div style={{
          borderLeft: `2px solid ${node.color}22`,
          paddingLeft: 16, marginBottom: 40,
          fontSize: 13, color: "#5A5450", lineHeight: 1.7, fontStyle: "italic"
        }}>
          {node.exercisePrompt}
        </div>

        {/* Question tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 24, flexWrap: "wrap" }}>
          {node.questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveQuestion(i)}
              style={{
                padding: "4px 10px",
                fontSize: 11,
                fontFamily: "monospace",
                background: activeQuestion === i ? node.color : "transparent",
                border: `1px solid ${localAnswers[i]?.text ? node.color : activeQuestion === i ? node.color : "#2A2A24"}`,
                color: activeQuestion === i ? "#0A0A08" : localAnswers[i]?.text ? node.color : "#4A4440",
                cursor: "pointer"
              }}
            >
              {i + 1}
              {localAnswers[i]?.text && activeQuestion !== i ? " ✓" : ""}
            </button>
          ))}
        </div>

        {/* Active question */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "#C8C0B0", marginBottom: 20, fontWeight: 400 }}>
            {node.questions[activeQuestion]}
          </p>
          <textarea
            ref={textareaRef}
            value={currentAnswer}
            onChange={e => handleSave(activeQuestion, e.target.value)}
            placeholder="Write freely. There is no right answer."
            style={{
              width: "100%",
              minHeight: 140,
              background: "#0D0D0A",
              border: `1px solid ${currentAnswer ? node.color + "44" : "#1A1A16"}`,
              borderRadius: 2,
              color: "#E8E0D0",
              fontSize: 15,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              padding: 16,
              lineHeight: 1.7,
              resize: "vertical",
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 0.2s"
            }}
            onFocus={e => e.target.style.borderColor = node.color + "88"}
            onBlur={e => e.target.style.borderColor = currentAnswer ? node.color + "44" : "#1A1A16"}
          />
        </div>

        {/* Question navigation */}
        <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
          {activeQuestion > 0 && (
            <button
              onClick={() => setActiveQuestion(q => q - 1)}
              style={{
                padding: "8px 16px", fontSize: 12, letterSpacing: "0.1em",
                background: "transparent", border: "1px solid #2A2A24",
                color: "#4A4440", cursor: "pointer", fontFamily: "monospace"
              }}
            >
              ← Previous
            </button>
          )}
          {activeQuestion < node.questions.length - 1 ? (
            <button
              onClick={() => setActiveQuestion(q => q + 1)}
              style={{
                padding: "8px 16px", fontSize: 12, letterSpacing: "0.1em",
                background: "transparent", border: `1px solid ${node.color}`,
                color: node.accentColor, cursor: "pointer", fontFamily: "monospace"
              }}
            >
              Next question →
            </button>
          ) : (
            !nodeComplete && (
              <button
                onClick={handleNodeComplete}
                disabled={!allQuestionsAnswered}
                style={{
                  padding: "10px 24px", fontSize: 12, letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  background: allQuestionsAnswered ? node.color : "transparent",
                  border: `1px solid ${allQuestionsAnswered ? node.color : "#2A2A24"}`,
                  color: allQuestionsAnswered ? "#0A0A08" : "#4A4440",
                  cursor: allQuestionsAnswered ? "pointer" : "not-allowed",
                  fontFamily: "monospace"
                }}
              >
                Complete this node
              </button>
            )
          )}
        </div>

        {/* Coherence insight */}
        {(loadingCoherence || coherenceText) && (
          <div style={{
            padding: "20px 24px",
            background: "#0D0D0A",
            border: "1px solid #2A2A24",
            borderLeft: `2px solid ${node.color}`,
            marginBottom: 32
          }}>
            <div style={{
              fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase",
              color: "#4A4440", fontFamily: "monospace", marginBottom: 12
            }}>
              Coherence — AI Mirror
            </div>
            {loadingCoherence ? (
              <div style={{ color: "#3A3430", fontSize: 13, fontStyle: "italic" }}>
                Reading the connections...
              </div>
            ) : (
              <p style={{ color: "#A09080", fontSize: 15, lineHeight: 1.7, margin: 0 }}>
                {coherenceText}
              </p>
            )}
          </div>
        )}

        {/* Proceed */}
        {nodeComplete && (
          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={handleNext}
              style={{
                padding: "12px 32px", fontSize: 13, letterSpacing: "0.15em",
                textTransform: "uppercase",
                background: "transparent", border: `1px solid #C8A96E`,
                color: "#C8A96E", cursor: "pointer", fontFamily: "monospace"
              }}
            >
              {currentNodeIndex < nodes.length - 1 ? "Next node →" : "View synthesis →"}
            </button>
          </div>
        )}

        {/* Tension reminder */}
        {node.tension && (
          <div style={{ marginTop: "auto", paddingTop: 40 }}>
            <div style={{
              fontSize: 11, color: "#3A3430", letterSpacing: "0.1em",
              fontStyle: "italic", lineHeight: 1.6, textAlign: "right"
            }}>
              Tension: {node.tension}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
