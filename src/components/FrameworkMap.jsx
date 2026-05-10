import { FRAMEWORK_NODES, AXIS_META } from "../data/framework";

const axes = ["present", "methods", "will"];

function NodeDot({ node, completed, onSelect }) {
  const depthSymbol = node.depth === "union" ? "◯" : node.depth === "order" ? "◻" : node.depth === "essence" ? "△" : "·";
  return (
    <button
      onClick={onSelect}
      title={node.label}
      style={{
        width: 10,
        height: 10,
        borderRadius: node.depth === "union" ? "50%" : node.depth === "order" ? 0 : "2px",
        background: completed ? node.accentColor : "transparent",
        border: `1.5px solid ${completed ? node.accentColor : node.color}`,
        cursor: "pointer",
        transition: "all 0.2s",
        display: "inline-block"
      }}
    />
  );
}

export default function FrameworkMap({ answers, completedNodes, onStartJourney, onNodeSelect, onViewSynthesis, progress }) {
  const nodesByAxis = axes.map(axis => ({
    axis,
    meta: AXIS_META[axis],
    nodes: FRAMEWORK_NODES.filter(n => n.axis === axis)
  }));

  const totalCompleted = completedNodes.length;
  const total = FRAMEWORK_NODES.length;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0A08",
      color: "#E8E0D0",
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px"
    }}>
      {/* Grain overlay */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
        opacity: 0.6
      }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 680 }}>

        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{
            fontSize: 11, letterSpacing: "0.3em", color: "#6B6458", textTransform: "uppercase",
            marginBottom: 16, fontFamily: "'DM Mono', monospace"
          }}>
            Seed of Nature — v0.1
          </div>
          <h1 style={{
            fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 300, margin: 0,
            letterSpacing: "-0.02em", lineHeight: 1.1,
            background: "linear-gradient(135deg, #E8E0D0 0%, #C8A96E 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>
            The Framework
          </h1>
          <p style={{ color: "#6B6458", fontSize: 15, marginTop: 12, fontStyle: "italic" }}>
            Shape conditions where human agency and flourishing emerge.
          </p>
        </div>

        {/* Progress */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 11, letterSpacing: "0.2em", color: "#6B6458", textTransform: "uppercase", fontFamily: "monospace" }}>
              Journey progress
            </span>
            <span style={{ fontSize: 11, fontFamily: "monospace", color: "#C8A96E" }}>
              {totalCompleted}/{total}
            </span>
          </div>
          <div style={{ height: 1, background: "#1A1A16", position: "relative" }}>
            <div style={{
              height: "100%", background: "linear-gradient(90deg, #C8A96E, #E8C98E)",
              width: `${progress * 100}%`, transition: "width 0.6s ease"
            }} />
          </div>
        </div>

        {/* Axis grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32, marginBottom: 64 }}>
          {nodesByAxis.map(({ axis, meta, nodes }) => (
            <div key={axis} style={{
              border: "1px solid #1A1A16",
              borderLeft: `2px solid ${meta.color}`,
              padding: "20px 24px",
              background: "#0D0D0A"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: meta.color, fontFamily: "monospace" }}>
                    {meta.label}
                  </div>
                  <div style={{ fontSize: 13, color: "#4A4440", marginTop: 2, fontStyle: "italic" }}>
                    {meta.subtitle}
                  </div>
                </div>
                <div style={{ fontSize: 11, color: "#3A3430", fontFamily: "monospace" }}>
                  {nodes.filter(n => completedNodes.includes(n.id)).length}/{nodes.length}
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {nodes.map((node, i) => {
                  const completed = completedNodes.includes(node.id);
                  const nodeIdx = FRAMEWORK_NODES.indexOf(node);
                  return (
                    <button
                      key={node.id}
                      onClick={() => onNodeSelect(nodeIdx)}
                      style={{
                        padding: "6px 12px",
                        fontSize: 12,
                        letterSpacing: "0.05em",
                        background: completed ? `${node.color}22` : "transparent",
                        border: `1px solid ${completed ? node.color : "#2A2A24"}`,
                        color: completed ? node.accentColor : "#4A4440",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        fontFamily: "inherit"
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = node.color;
                        e.currentTarget.style.color = node.accentColor;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = completed ? node.color : "#2A2A24";
                        e.currentTarget.style.color = completed ? node.accentColor : "#4A4440";
                      }}
                    >
                      {node.label}
                      {completed && " ✓"}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <button
            onClick={onStartJourney}
            style={{
              padding: "14px 36px",
              fontSize: 13,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              background: "transparent",
              border: "1px solid #C8A96E",
              color: "#C8A96E",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#C8A96E22";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            {totalCompleted === 0 ? "Begin the Journey" : "Continue"}
          </button>

          {totalCompleted > 0 && (
            <button
              onClick={onViewSynthesis}
              style={{
                padding: "14px 36px",
                fontSize: 13,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                background: "#C8A96E",
                border: "1px solid #C8A96E",
                color: "#0A0A08",
                cursor: "pointer",
                fontFamily: "inherit"
              }}
            >
              View Synthesis
            </button>
          )}
        </div>

        {/* Footer legend */}
        <div style={{
          marginTop: 48, display: "flex", gap: 24, justifyContent: "center",
          fontSize: 10, letterSpacing: "0.15em", color: "#3A3430",
          textTransform: "uppercase", fontFamily: "monospace"
        }}>
          <span>◯ Union — coherence</span>
          <span>◻ Order — structure</span>
          <span>△ Essence — root</span>
        </div>
      </div>
    </div>
  );
}
