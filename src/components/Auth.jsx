import { useState } from "react";
import { supabase } from "../supabase";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (!error) setSent(true);
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#0A0A08", color: "#E8E0D0",
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{ textAlign: "center", maxWidth: 400, padding: "0 32px" }}>
        <h1 style={{
          fontSize: 40, fontWeight: 300, marginBottom: 12,
          background: "linear-gradient(135deg, #E8E0D0 0%, #C8A96E 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
        }}>
          Seed of Nature
        </h1>
        <p style={{ color: "#4A4440", fontSize: 15, fontStyle: "italic", marginBottom: 48 }}>
          A personal operating system.
        </p>

        {sent ? (
          <p style={{ color: "#C8A96E", fontSize: 15 }}>
            Check your email — a magic link has been sent.
          </p>
        ) : (
          <>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              style={{
                width: "100%", padding: "12px 16px",
                background: "#0D0D0A", border: "1px solid #2A2A24",
                color: "#E8E0D0", fontSize: 15,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                outline: "none", boxSizing: "border-box", marginBottom: 16
              }}
            />
            <button
              onClick={handleLogin}
              disabled={loading || !email}
              style={{
                width: "100%", padding: "12px 24px",
                fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase",
                background: "transparent", border: "1px solid #C8A96E",
                color: "#C8A96E", cursor: "pointer", fontFamily: "monospace"
              }}
            >
              {loading ? "Sending..." : "Enter"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}