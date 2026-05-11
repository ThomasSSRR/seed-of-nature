import { useState, useEffect } from "react";
import { AXIS_META } from "../data/framework";

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";

async function generateSynthesis(answers, nodes) {
  const allAnswers = nodes
    .filter(n => answers[n.id])
    .map(n => {
      const nodeAnswers = Object.values(answers[n.id]).map(a => a.text).filter(Boolean).join(" / ");
      return `[${n.subtitle} — ${n.label}]\n${nodeAnswers}`;
    })
    .join("\n\n");

  const prompt = `You are a deep psychological synthesizer working with the "Seed of Nature" framework — a personal operating system with three axes: Present (pattern recognition), Methods (iterative synthesis), and Will (directed action). Each axis explores Truth, Great, and Beautiful dimensions.

Here are all the person's reflections:

${allAnswers}

Generate a synthesis with these exact sections:

1. COHERENCE MAP (3-4 sentences)
What is the dominant pattern across all reflections? What is the thread that connects everything?

2. TENSIONS (3 tensions, each 2 sentences)
Name the three most significant unresolved tensions visible in the answers. Be precise — name what is actually in conflict, not generic observations.

3. ROOTS (2-3 sentences)
What is the deepest root cause or generative condition beneath what they've shared? The thing that, if addressed, would cascade through everything else.

4. STRATEGIC LEVER (3-4 sentences)
Given everything above, what is the single highest-leverage action or shift this person could make? Be concrete and specific to their actual answers.

5. QUESTIONS THAT REMAIN (3 questions)
The three questions this person's reflections have not yet answered — the ones that, if answered, would create the most clarity.

Write in second person ("you"). Be direct. Be precise. No platitudes. No generic advice. Work only from what they actually said.`;

  const response = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
  "Content-Type": "application/json",
  "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
  "anthropic-version": "2023-06-01"
},
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }]
    })
  });
  const data = await response.json();
  return data.content?.[0]?.text || null;
}

async function generateStrategicPlan(answers, nodes) {
  const allAnswers = nodes
    .filter(n => answers[n.id])
    .map(n => {
      const nodeAnswers = Object.values(answers[n.id]).map(a => a.text).filter(Boolean).join(" / ");
      return `[${n.label}]: ${nodeAnswers}`;
    })
    .join("\n");

  const prompt = `Based on these personal framework reflections, generate a precise 90-day strategic plan.

REFLECTIONS:
${allAnswers}

Generate a plan with:

PHASE 1 — WEEKS 1-2: Foundation
What to stop, what to clarify, what single commitment to make irreversible.

PHASE 2 — WEEKS 3-6: Build
The core actions that compound. No more than 3 parallel tracks.

PHASE 3 — WEEKS 7-12: Leverage
Where this leads if phases 1-2 are executed. What becomes possible.

DAILY ARCHITECTURE (suggest a concrete structure)
Morning / Work / Evening blocks.

STOP DOING (3 things)
What to cut immediately based on their reflections.

MEASURE OF SUCCESS
One sentence: how they will know, at day 90, if the plan worked.

Be completely specific to their actual answers. No generic productivity advice.`;

  const response = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
  "Content-Type": "application/json",
  "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
  "anthropic-version": "2023-06-01"
},
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }]
    })
  });
  const data = await response.json();
  return data.content?.[0]?.text || null;
}

function parseSection(text, heading) {
  const regex = new RegExp(`${heading}[^\\n]*\\n([\\s\\S]*?)(?=\\n\\d\\.|$)`, 'i');
  const match = text.match(regex);
  return match ? match[1].trim() : null;
}

export default function Synthesis({ answers, nodes, onBack }) {
  const [synthesis, setSynthesis] = useState(null);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [activeTab, setActiveTab] = useState("synthesis");
  const [error, setError] = useState(null);

  const answeredNodes = nodes.filter(n => answers[n.id]);
  const axisCounts = {
    present: answeredNodes.filter(n => n.axis === "present").length,
    methods: answeredNodes.filter(n => n.axis === "methods").length,
    will: answeredNodes.filter(n => n.axis === "will").length,
  };

  useEffect(() => {
    if (answeredNodes.length < 3) {
      setLoading(false);
      return;
    }
    generateSynthesis(answers, nodes)
      .then(text => { setSynthesis(text); setLoading(false); })
      .catch(() => { setError("Could not generate synthesis."); setLoading(false); });
  }, []);

  const handleGeneratePlan = async () => {
    setLoadingPlan(true);
    const text = await generateStrategicPlan(answers, nodes);
    setPlan(text);
    setLoadingPlan(false);
    setActiveTab("plan");
  };

  const tabs = ["synthesis", "by-axis", ...(answeredNodes.length >= 5 ? ["plan"] : [])];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0A08",
      color: "#E8E0D0",
      fontFamily: "'Cormorant Garamond', Georgia, serif"
    }}>
      {/* Top bar */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "20px 32px", borderBottom: "1px solid #1A1A16"
      }}>
        <button
          onClick={onBack}
          style={{
            background: "none", border: "none", color: "#4A4440",
            cursor: "pointer", fontSize: 12, letterSpacing: "0.15em",
            textTransform: "uppercase", fontFamily: "monospace"
          }}
        >
          ← Map
        </button>
        <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#4A4440", fontFamily: "monospace" }}>
          Synthesis — {answeredNodes.length}/{nodes.length} nodes
        </div>
        <div style={{ width: 60 }} />
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 32px" }}>

        {/* Title */}
        <div style={{ marginBottom: 48, textAlign: "center" }}>
          <h1 style={{
            fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 300,
            margin: "0 0 12px 0", letterSpacing: "-0.02em",
            background: "linear-gradient(135deg, #E8E0D0 0%, #C8A96E 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>
            The Big Picture
          </h1>
          <p style={{ color: "#4A4440", fontSize: 15, fontStyle: "italic" }}>
            {answeredNodes.length < 3
              ? "Complete at least 3 nodes to unlock AI synthesis."
              : "AI-generated synthesis from your reflections."}
          </p>
        </div>

        {/* Axis completion overview */}
        <div style={{ display: "flex", gap: 16, marginBottom: 48 }}>
          {Object.entries(axisCounts).map(([axis, count]) => {
            const meta = AXIS_META[axis];
            const total = nodes.filter(n => n.axis === axis).length;
            return (
              <div key={axis} style={{
                flex: 1, padding: "16px 20px",
                border: "1px solid #1A1A16",
                borderTop: `2px solid ${meta.color}`
              }}>
                <div style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: meta.color, fontFamily: "monospace", marginBottom: 8 }}>
                  {meta.label}
                </div>
                <div style={{ fontSize: 24, fontWeight: 300, color: count === total ? "#C8A96E" : "#4A4440" }}>
                  {count}<span style={{ fontSize: 14, color: "#3A3430" }}>/{total}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, marginBottom: 32, borderBottom: "1px solid #1A1A16" }}>
          {["synthesis", "by-axis"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "10px 20px",
                fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
                background: "none",
                border: "none",
                borderBottom: activeTab === tab ? "2px solid #C8A96E" : "2px solid transparent",
                color: activeTab === tab ? "#C8A96E" : "#4A4440",
                cursor: "pointer", fontFamily: "monospace",
                marginBottom: -1
              }}
            >
              {tab === "synthesis" ? "AI Synthesis" : "By Axis"}
            </button>
          ))}
          {answeredNodes.length >= 5 && (
            <button
              onClick={() => plan ? setActiveTab("plan") : handleGeneratePlan()}
              style={{
                padding: "10px 20px",
                fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
                background: "none",
                border: "none",
                borderBottom: activeTab === "plan" ? "2px solid #C8A96E" : "2px solid transparent",
                color: activeTab === "plan" ? "#C8A96E" : "#4A4440",
                cursor: "pointer", fontFamily: "monospace",
                marginBottom: -1
              }}
            >
              {loadingPlan ? "Generating..." : "Strategic Plan"}
            </button>
          )}
        </div>

        {/* Synthesis tab */}
        {activeTab === "synthesis" && (
          <div>
            {loading ? (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <div style={{ fontSize: 13, color: "#4A4440", fontStyle: "italic", letterSpacing: "0.1em" }}>
                  Reading the pattern across all nodes...
                </div>
              </div>
            ) : answeredNodes.length < 3 ? (
              <div style={{
                padding: "32px", border: "1px solid #1A1A16", textAlign: "center"
              }}>
                <p style={{ color: "#4A4440", fontSize: 15, fontStyle: "italic" }}>
                  Complete at least 3 nodes to generate your synthesis.
                </p>
              </div>
            ) : synthesis ? (
              <div style={{ lineHeight: 1.9, fontSize: 15, color: "#C8C0B0" }}>
                {synthesis.split("\n").map((line, i) => {
                  const isHeading = /^\d\.|^[A-Z ]{4,}:/.test(line.trim());
                  if (!line.trim()) return <div key={i} style={{ height: 12 }} />;
                  if (isHeading) return (
                    <div key={i} style={{
                      fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase",
                      color: "#C8A96E", fontFamily: "monospace", marginTop: 32, marginBottom: 8
                    }}>
                      {line.replace(/^\d+\.\s*/, "")}
                    </div>
                  );
                  return <p key={i} style={{ margin: "0 0 8px 0" }}>{line}</p>;
                })}
              </div>
            ) : (
              <div style={{ color: "#4A4440", fontStyle: "italic" }}>
                Could not generate synthesis. Check your API connection.
              </div>
            )}
          </div>
        )}

        {/* By axis tab */}
        {activeTab === "by-axis" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {["present", "methods", "will"].map(axis => {
              const meta = AXIS_META[axis];
              const axisNodes = answeredNodes.filter(n => n.axis === axis);
              return (
                <div key={axis} style={{ borderLeft: `2px solid ${meta.color}`, paddingLeft: 24 }}>
                  <div style={{
                    fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase",
                    color: meta.color, fontFamily: "monospace", marginBottom: 16
                  }}>
                    {meta.label} — {meta.subtitle}
                  </div>
                  {axisNodes.length === 0 ? (
                    <p style={{ color: "#3A3430", fontStyle: "italic", fontSize: 13 }}>No nodes completed yet.</p>
                  ) : (
                    axisNodes.map(node => {
                      const nodeAnswers = answers[node.id];
                      return (
                        <div key={node.id} style={{ marginBottom: 24 }}>
                          <div style={{ fontSize: 14, color: node.accentColor, marginBottom: 8 }}>
                            {node.label}
                          </div>
                          {Object.entries(nodeAnswers).map(([qi, ans]) => (
                            ans.text ? (
                              <div key={qi} style={{ marginBottom: 8 }}>
                                <div style={{ fontSize: 11, color: "#3A3430", fontFamily: "monospace", marginBottom: 2 }}>
                                  Q{parseInt(qi) + 1}: {node.questions[qi]?.substring(0, 60)}...
                                </div>
                                <p style={{ fontSize: 14, color: "#8A8070", lineHeight: 1.6, margin: 0, paddingLeft: 8, borderLeft: "1px solid #2A2A24" }}>
                                  {ans.text}
                                </p>
                              </div>
                            ) : null
                          ))}
                        </div>
                      );
                    })
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Strategic plan tab */}
        {activeTab === "plan" && (
          <div>
            {loadingPlan ? (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <div style={{ fontSize: 13, color: "#4A4440", fontStyle: "italic" }}>
                  Building your 90-day architecture...
                </div>
              </div>
            ) : plan ? (
              <div style={{ lineHeight: 1.9, fontSize: 15, color: "#C8C0B0" }}>
                {plan.split("\n").map((line, i) => {
                  const isHeading = /^[A-Z ]{4,}[:\-—]|^PHASE|^DAILY|^STOP|^MEASURE/.test(line.trim());
                  if (!line.trim()) return <div key={i} style={{ height: 12 }} />;
                  if (isHeading) return (
                    <div key={i} style={{
                      fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase",
                      color: "#C8A96E", fontFamily: "monospace", marginTop: 32, marginBottom: 8
                    }}>
                      {line}
                    </div>
                  );
                  return <p key={i} style={{ margin: "0 0 8px 0" }}>{line}</p>;
                })}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "32px" }}>
                <button
                  onClick={handleGeneratePlan}
                  style={{
                    padding: "14px 36px", fontSize: 13, letterSpacing: "0.15em",
                    textTransform: "uppercase", background: "transparent",
                    border: "1px solid #C8A96E", color: "#C8A96E",
                    cursor: "pointer", fontFamily: "monospace"
                  }}
                >
                  Generate 90-Day Strategic Plan
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
