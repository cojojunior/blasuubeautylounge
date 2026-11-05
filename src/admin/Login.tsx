import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Button } from "../components/ui/Button";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white-soft px-4">
      <div className="max-w-md w-full bg-white-pure p-8 rounded-3xl border border-elephant/10 shadow-lg">
        <h2 className="text-2xl font-serif text-center mb-6">Admin Access</h2>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-elephant-muted mb-1">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full p-3 border border-elephant/20 rounded-lg bg-white-soft"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-elephant-muted mb-1">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full p-3 border border-elephant/20 rounded-lg bg-white-soft"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full mt-2" disabled={loading}>
            {loading ? "Authenticating..." : "Log In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
