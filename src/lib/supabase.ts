import { createClient } from "@supabase/supabase-js";

// Clean the variables (removes accidental quotes or spaces)
const rawUrl = import.meta.env.VITE_SUPABASE_URL || "";
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const supabaseUrl = rawUrl.replace(/['"]/g, "").trim();
const supabaseAnonKey = rawKey.replace(/['"]/g, "").trim();

console.log("Checking Supabase Config:", {
  urlFound: !!supabaseUrl,
  keyFound: !!supabaseAnonKey,
});

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "CRITICAL: Supabase environment variables are missing in Netlify!",
  );
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder",
);
