import { createContext, useContext, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

/* ─────────────────────────────────────────────────────────
   Build the Supabase client once at module load time.
   Returns null (guest-only mode) if env vars are missing
   so the rest of the app still renders.
───────────────────────────────────────────────────────── */
function buildClient(): SupabaseClient | null {
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

  if (!url || !key) {
    console.warn(
      "[AuthContext] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY.\n" +
      "Add them to a .env file in your project root and restart the dev server.\n" +
      "The app will run in guest-only mode until they are provided."
    );
    return null;
  }

  return createClient(url, key);
}

const supabase: SupabaseClient | null = buildClient();

/* ─────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────── */
interface AuthContextType {
  user:    User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

/* ─────────────────────────────────────────────────────────
   Context — safe defaults mean useAuth() never throws
   even when consumed outside a Provider
───────────────────────────────────────────────────────── */
const AuthContext = createContext<AuthContextType>({
  user:    null,
  session: null,
  loading: false,
  signOut: async () => {},
});

/* ─────────────────────────────────────────────────────────
   Provider
───────────────────────────────────────────────────────── */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user,    setUser]    = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(supabase !== null);

  useEffect(() => {
    if (!supabase) return;

    // Restore any existing session from localStorage on mount
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
      })
      .catch((err) => {
        console.warn("[AuthContext] getSession error:", err);
      })
      .finally(() => setLoading(false));

    // Stay in sync with login / logout / token refresh events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

/* ─────────────────────────────────────────────────────────
   Hook
───────────────────────────────────────────────────────── */
export function useAuth(): AuthContextType {
  return useContext(AuthContext);
}