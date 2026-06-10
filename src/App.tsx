import React, { lazy, Suspense, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";

/* ── Eager imports — always needed on first paint ── */
import Navbar from "./components/Navbar1";
import FlagCarousel from "./components/FlagCarousel_1";
import Footer from "./components/Footer";
import CardSection from "./components/CardSection_2";
import { useAuth } from "./context/AuthContext";

/* ── Lazy imports — ALL defined at module level, never inside a function ── */

const DestinationsPage = lazy(() => import("./pages/DestinationsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

/* ─────────────────────────────────────────────────────────
   Loading spinner
───────────────────────────────────────────────────────── */
function PageLoader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 14,
        color: "#aaa",
        letterSpacing: "0.08em",
      }}
    >
      Loading…
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Error boundary — shows readable message instead of
   blank page when anything in the tree crashes
───────────────────────────────────────────────────────── */
interface EBState {
  hasError: boolean;
  message: string;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  EBState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error: Error): EBState {
    return { hasError: true, message: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#eaeaea",
            fontFamily: "'DM Sans', sans-serif",
            padding: 40,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <h2 style={{ fontSize: 20, color: "#333", marginBottom: 12 }}>
            Something went wrong
          </h2>
          <p
            style={{
              fontSize: 13,
              color: "#666",
              maxWidth: 500,
              lineHeight: 1.7,
              marginBottom: 8,
              background: "#fff",
              padding: "12px 20px",
              borderRadius: 10,
              fontFamily: "monospace",
            }}
          >
            {this.state.message || "An unexpected error occurred."}
          </p>
          <p style={{ fontSize: 12, color: "#bbb", marginBottom: 24 }}>
            Open DevTools → Console for the full trace.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.1em",
              color: "#fff",
              background: "#1a1814",
              border: "none",
              borderRadius: 20,
              padding: "10px 24px",
              cursor: "pointer",
            }}
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ─────────────────────────────────────────────────────────
   Protected route
───────────────────────────────────────────────────────── */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <PageLoader />;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

/* ─────────────────────────────────────────────────────────
   Country-filtered destinations
───────────────────────────────────────────────────────── */
function DestinationsCountryRoute({
  isAuthenticated,
  onLoginRequest,
}: {
  isAuthenticated: boolean;
  onLoginRequest: () => void;
}) {
  const { country } = useParams<{ country: string }>();
  const decoded = country
    ? country
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : undefined;

  return (
    <DestinationsPage
      isAuthenticated={isAuthenticated}
      onLoginRequest={onLoginRequest}
      initialCountry={decoded}
    />
  );
}

/* ─────────────────────────────────────────────────────────
   Login page (full-page fallback for /login route)
───────────────────────────────────────────────────────── */
function LoginPage() {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#eaeaea",
      }}
    ></div>
  );
}

/* ─────────────────────────────────────────────────────────
   Profile page placeholder
───────────────────────────────────────────────────────── */
function ProfilePage() {
  const { user } = useAuth();
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#eaeaea",
        fontFamily: "'DM Sans', sans-serif",
        padding: 40,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 48, marginBottom: 16 }}>👤</div>
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 32,
          fontWeight: 400,
          color: "#1a1a1a",
          marginBottom: 8,
        }}
      >
        My Profile
      </h2>
      <p style={{ fontSize: 14, color: "#888" }}>{user?.email}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Root App
───────────────────────────────────────────────────────── */
export default function App() {
  const { user } = useAuth();
  const [, setShowAuth] = useState(false);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Navbar />

        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Home */}
            <Route
              path="/"
              element={
                <>
                  <FlagCarousel />
                  <CardSection />
                </>
              }
            />

            {/* Destinations */}
            <Route
              path="/destinations"
              element={
                <DestinationsPage
                  isAuthenticated={!!user}
                  onLoginRequest={() => setShowAuth(true)}
                />
              }
            />
            <Route
              path="/destinations/:country"
              element={
                <DestinationsCountryRoute
                  isAuthenticated={!!user}
                  onLoginRequest={() => setShowAuth(true)}
                />
              }
            />

            {/* Profile — protected */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Login */}
            <Route
              path="/login"
              element={user ? <Navigate to="/" replace /> : <LoginPage />}
            />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>

        <Footer />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
