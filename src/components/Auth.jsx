import { useState } from "react";
import { supabase } from "../supabase";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState("login"); // "login", "signup", "forgot"

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else setError("Account created — you can now sign in.");
    } else if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    } else if (mode === "forgot") {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://seed-of-nature.vercel.app"
      });
      if (error) setError(error.message);
      else setError("Reset link sent — check your email.");
    }

    setLoading(false);
  };

  const inputStyle = {
    width: "100%", padding: "12px 16px",
    background: "#0D0D0A", border: "1px solid #2A2A24",
    color: "#E8E0D0", fontSize: 15,
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    outline: "none", boxSizing: "border-box", marginBottom: 12
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#0A0A08", color: "#E8E0D0",
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{ textAlign: "center", maxWidth: 400, width: "100%", padding: "0 32px" }}>
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

        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={inputStyle}
        />

        {mode !== "forgot" && (
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            style={inputStyle}
          />
        )}

        <button
          onClick={handleSubmit}
          disabled={loading || !email || (mode !== "forgot" && !password)}
          style={{
            width: "100%", padding: "12px 24px",
            fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase",
            background: "transparent", border: "1px solid #C8A96E",
            color: "#C8A96E", cursor: "pointer", fontFamily: "monospace",
            marginBottom: 16
          }}
        >
          {loading ? "..." : mode === "login" ? "Sign in" : mode === "signup" ? "Create account" : "Send reset link"}
        </button>

        {error && (
          <p style={{ color: "#C8A96E", fontSize: 13, marginBottom: 16 }}>
            {error}
          </p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {mode === "login" && (
            <>
              <button
                onClick={() => { setMode("signup"); setError(null); }}
                style={{
                  background: "none", border: "none", color: "#4A4440",
                  cursor: "pointer", fontSize: 12, letterSpacing: "0.1em",
                  fontFamily: "monospace", textDecoration: "underline"
                }}
              >
                No account? Create one
              </button>
              <button
                onClick={() => { setMode("forgot"); setError(null); }}
                style={{
                  background: "none", border: "none", color: "#3A3430",
                  cursor: "pointer", fontSize: 12, letterSpacing: "0.1em",
                  fontFamily: "monospace", textDecoration: "underline"
                }}
              >
                Forgot password?
              </button>
            </>
          )}
          {mode !== "login" && (
            <button
              onClick={() => { setMode("login"); setError(null); }}
              style={{
                background: "none", border: "none", color: "#4A4440",
                cursor: "pointer", fontSize: 12, letterSpacing: "0.1em",
                fontFamily: "monospace", textDecoration: "underline"
              }}
            >
              Back to sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
