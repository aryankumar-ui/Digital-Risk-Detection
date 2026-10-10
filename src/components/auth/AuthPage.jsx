import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Shield, Eye, EyeOff, ArrowLeft, Sparkles } from "lucide-react";
import { auth, googleProvider, db } from "../../lib/firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  sendEmailVerification,
  sendPasswordResetEmail 
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";


const DecorativeDiamond = ({ opacity, delay }) => (
  <div
    className="diamond-dec transition-colors"
    style={{
      width: "100%",
      height: "100%",
      borderRadius: 28,
      border: "1px solid #cbd5e1",
      opacity: opacity,
      animation: `fadeIn 1s ease-out ${delay}s both`,
    }}
  />
);

const FeatureDiamond = ({ title, description, imageSrc, delay }) => (
  <div
    className="diamond-feature transition-colors hover-scale-105"
    style={{
      width: "100%",
      height: "100%",
      borderRadius: 28,
      boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)",
      border: "1px solid #cbd5e1",
      position: "relative",
      animation: `zoomIn95 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s both`,
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "70%",
        height: "70%",
        transform: "translate(-50%, -50%) rotate(-45deg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div style={{ width: 64, height: 64, marginBottom: 12, borderRadius: 16, overflow: "hidden", border: "2px solid #e2e8f0", flexShrink: 0, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}>
         <img src={imageSrc} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt={title} />
      </div>
      <h3 className="dark-text-white" style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", marginBottom: 6, lineHeight: 1.2 }}>{title}</h3>
      <p className="dark-text-slate-400" style={{ fontSize: "0.75rem", color: "#64748b", margin: 0, lineHeight: 1.4 }}>{description}</p>
    </div>
  </div>
);

export const AuthPage = () => {
  const { setView, loginAsDemoUser, theme, toggleTheme, showToast } = useApp();

  // 'signin' | 'forgot'
  const [activeForm, setActiveForm] = useState("signin");
  const [authMode, setAuthMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }
    setEmailError("");
    setIsLoading(true);

    try {
      if (authMode === "signup") {
        // Validation
        if (password.length < 6) {
          showToast("Password must be at least 6 characters", "error");
          setIsLoading(false);
          return;
        }
        
        // Create account
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Send verification
        // Create profile
        try {
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            role: "user",
            emailVerified: user.emailVerified,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
        } catch (e) {
          console.warn("Could not create user profile doc due to missing permissions.");
        }
        
        showToast("Account created! You are now signed in.", "success");
        setView("dashboard");
        // Removed forceful logout
      } else {
        // Sign In
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
// Removed email verified check for seamless testing
        
        // Load data happens in AppContext via onAuthStateChanged
        showToast("Signed in successfully", "success");
        setView("dashboard");
      }
    } catch (error) {
      console.error(error);
      showToast(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      
      // Check if user document exists
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (!userDoc.exists()) {
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            role: "user",
            emailVerified: user.emailVerified,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });
        }
      } catch (e) {
        console.warn("Could not check/create user profile doc due to missing permissions.");
      }
      showToast("Signed in with Google successfully", "success");
      setView("dashboard");
    } catch (error) {
      console.error(error);
      showToast(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendReset = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }
    setEmailError("");
    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      showToast(`Password recovery link sent to ${email}`, "success");
      setActiveForm("signin");
    } catch (error) {
      console.error(error);
      showToast(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="dark-bg-slate-950 transition-colors"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        overflow: "hidden",
        position: "relative",
      }}
    >
      

      {/* Main Split Layout */}
      <div
        className="lg-grid-cols-12"
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
          height: "100vh",
        }}
      >
        {/* LEFT COLUMN: LARGE DIAMOND MESH & CONTENT */}
        <div
          className="lg-col-span-6 hidden lg-flex dark-bg-slate-950"
          style={{
            position: "relative",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            backgroundColor: "#f8fafc",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) rotate(45deg)",
              display: "grid",
              gridTemplateColumns: "repeat(4, 280px)",
              gridTemplateRows: "repeat(4, 280px)",
              gap: 24,
            }}
          >
            {/* Row 1 */}
            <DecorativeDiamond opacity={0.1} delay={0.1} />
            <DecorativeDiamond opacity={0.3} delay={0.2} />
            <DecorativeDiamond opacity={0.2} delay={0.3} />
            <DecorativeDiamond opacity={0.1} delay={0.4} />

            {/* Row 2 */}
            <DecorativeDiamond opacity={0.4} delay={0.2} />
            <FeatureDiamond 
              title="AI Brand Sensor"
              description="Real-time logo matching and brand intelligence."
              imageSrc="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=200&q=80"
              delay={0.4}
            />
            <FeatureDiamond 
              title="Rogue App Shield"
              description="Detect suspicious apps and publisher mismatches."
              imageSrc="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=200&q=80"
              delay={0.5}
            />
            <DecorativeDiamond opacity={0.4} delay={0.3} />

            {/* Row 3 */}
            <DecorativeDiamond opacity={0.3} delay={0.3} />
            <FeatureDiamond 
              title="Social Radar"
              description="Discover impersonation accounts and fraudulent profiles."
              imageSrc="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=200&q=80"
              delay={0.5}
            />
            <FeatureDiamond 
              title="Official Whitelist"
              description="Recognize trusted assets and reduce false alerts."
              imageSrc="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=200&q=80"
              delay={0.6}
            />
            <DecorativeDiamond opacity={0.5} delay={0.4} />

            {/* Row 4 */}
            <DecorativeDiamond opacity={0.1} delay={0.4} />
            <DecorativeDiamond opacity={0.3} delay={0.5} />
            <DecorativeDiamond opacity={0.4} delay={0.6} />
            <DecorativeDiamond opacity={0.1} delay={0.7} />
          </div>

          {/* Logo overlay floating on top left */}
          <div style={{ position: "absolute", top: 32, left: 32, zIndex: 20, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 32, backgroundColor: "#2563eb", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Shield style={{ width: 16, height: 16, color: "#fff" }} />
            </div>
            <span className="dark-text-white" style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a" }}>
              RiskShield <span style={{ color: "#2563eb" }}>AI</span>
            </span>
          </div>

          <button
            onClick={() => setView("landing")}
            className="hover-bg-slate-100 dark-hover-bg-slate-800 transition-all cursor-pointer dark-text-slate-300 dark-border-slate-700"
            style={{
              position: "absolute",
              bottom: 32,
              left: 32,
              zIndex: 20,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              borderRadius: 8,
              border: "1px solid #cbd5e1",
              backgroundColor: theme === "dark" ? "rgba(30, 41, 59, 0.8)" : "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(4px)",
              color: theme === "dark" ? "#cbd5e1" : "#334155",
              fontWeight: 600,
              fontSize: "0.875rem",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
            }}
          >
            <ArrowLeft style={{ width: 16, height: 16 }} />
            <span>Return to Landing Page</span>
          </button>
        </div>
        {/* RIGHT COLUMN: SLIDING ANIMATION BETWEEN SIGN IN & FORGOT */}
        <div
          className="lg-col-span-6 dark-bg-slate-900 transition-colors"
          style={{
            backgroundColor: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              maxWidth: "28rem",
              width: "100%",
              margin: "0 auto",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Brand Logo Header */}
            <div style={{ textAlign: "center", paddingBottom: 16 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 4,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    backgroundColor: "#1d72e8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    fontWeight: 700,
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  }}
                >
                  <Shield style={{ width: 20, height: 20 }} />
                </div>
                <span
                  className="dark-text-white"
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 900,
                    letterSpacing: "-0.025em",
                    color: "#0f172a",
                  }}
                >
                  RiskShield <span style={{ color: "#1d72e8" }}>AI</span>
                </span>
              </div>
              <p
                className="dark-text-slate-400"
                style={{ fontSize: "0.75rem", color: "#64748b", margin: 0 }}
              >
                Digital Risk Protection & Telemetry
              </p>
            </div>

            {/* 2-Panel Smooth Horizontal Slider Container */}
            <div
              style={{
                display: "flex",
                width: "200%",
                transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
                willChange: "transform",
                transform:
                  activeForm === "forgot"
                    ? "translateX(-50%)"
                    : "translateX(0)",
              }}
            >
              {/* PANEL 1: SIGN IN FORM */}
              <div
                style={{
                  width: "50%",
                  padding: "0 8px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                {/* Sign In / Sign Up Mode Switch */}
                <div
                  className="dark-bg-slate-900 dark-border-slate-800"
                  style={{
                    display: "flex",
                    backgroundColor: "#f1f5f9",
                    padding: 4,
                    borderRadius: 8,
                    border: "1px solid #e2e8f0",
                    marginBottom: 8,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setAuthMode("signin")}
                    className="transition-colors cursor-pointer"
                    style={{
                      flex: 1,
                      padding: "8px 0",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      textAlign: "center",
                      borderRadius: 6,
                      backgroundColor:
                        authMode === "signin"
                          ? theme === "dark"
                            ? "#1e293b"
                            : "#ffffff"
                          : "transparent",
                      color:
                        authMode === "signin"
                          ? theme === "dark"
                            ? "#ffffff"
                            : "#0f172a"
                          : theme === "dark"
                          ? "#94a3b8"
                          : "#64748b",
                      boxShadow:
                        authMode === "signin"
                          ? "0 1px 3px rgba(0,0,0,0.1)"
                          : "none",
                      border: "none",
                      outline: "none",
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMode("signup")}
                    className="transition-colors cursor-pointer"
                    style={{
                      flex: 1,
                      padding: "8px 0",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      textAlign: "center",
                      borderRadius: 6,
                      backgroundColor:
                        authMode === "signup"
                          ? theme === "dark"
                            ? "#1e293b"
                            : "#ffffff"
                          : "transparent",
                      color:
                        authMode === "signup"
                          ? theme === "dark"
                            ? "#ffffff"
                            : "#0f172a"
                          : theme === "dark"
                          ? "#94a3b8"
                          : "#64748b",
                      boxShadow:
                        authMode === "signup"
                          ? "0 1px 3px rgba(0,0,0,0.1)"
                          : "none",
                      border: "none",
                      outline: "none",
                    }}
                  >
                    Sign Up
                  </button>
                </div>

                <form
                  onSubmit={handleSignIn}
                  style={{ display: "flex", flexDirection: "column", gap: 14 }}
                >
                  {/* Email */}
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 4 }}
                  >
                    <label
                      className="dark-text-slate-200"
                      style={{
                        display: "block",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "#1e293b",
                      }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError("");
                      }}
                      className="dark-bg-slate-800 dark-text-slate-100 dark-border-slate-700 transition-colors focus-ring"
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        fontSize: "0.75rem",
                        borderRadius: 8,
                        border: emailError
                          ? "1px solid #f43f5e"
                          : "1px solid #cbd5e1",
                        backgroundColor: "#ffffff",
                        color: "#0f172a",
                        outline: "none",
                      }}
                    />

                    {emailError && (
                      <p
                        style={{
                          fontSize: "11px",
                          color: "#f43f5e",
                          fontWeight: 500,
                          margin: 0,
                        }}
                      >
                        {emailError}
                      </p>
                    )}
                  </div>

                  {/* Password with Eye Icon */}
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 4 }}
                  >
                    <label
                      className="dark-text-slate-200"
                      style={{
                        display: "block",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "#1e293b",
                      }}
                    >
                      Password
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="dark-bg-slate-800 dark-text-slate-100 dark-border-slate-700 transition-colors focus-ring"
                        style={{
                          width: "100%",
                          padding: "10px 40px 10px 14px",
                          fontSize: "0.75rem",
                          borderRadius: 8,
                          border: "1px solid #cbd5e1",
                          backgroundColor: "#ffffff",
                          color: "#0f172a",
                          outline: "none",
                        }}
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="dark-hover-text-slate-200 cursor-pointer"
                        aria-label="Toggle password visibility"
                        style={{
                          position: "absolute",
                          right: 12,
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#94a3b8",
                          background: "none",
                          border: "none",
                        }}
                      >
                        {showPassword ? (
                          <EyeOff style={{ width: 16, height: 16 }} />
                        ) : (
                          <Eye style={{ width: 16, height: 16 }} />
                        )}
                      </button>
                    </div>
                  </div>



                  {/* Primary Blue Sign In Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="hover-bg-blue-600 transition-colors cursor-pointer"
                    style={{
                      width: "100%",
                      padding: "10px 16px",
                      backgroundColor: "#2563eb",
                      color: "#ffffff",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      borderRadius: 8,
                      boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      border: "none",
                      opacity: isLoading ? 0.6 : 1,
                    }}
                  >
                    {isLoading ? (
                      <div
                        className="animate-spin"
                        style={{
                          width: 16,
                          height: 16,
                          border: "2px solid #ffffff",
                          borderTopColor: "transparent",
                          borderRadius: "50%",
                        }}
                      />
                    ) : (
                      <span>
                        {authMode === "signin" ? "Sign In" : "Create Account"}
                      </span>
                    )}
                  </button>
                </form>

                {/* Or continue with */}
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    padding: "4px 0",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="dark-border-slate-800"
                    style={{ flexGrow: 1, borderTop: "1px solid #e2e8f0" }}
                  />
                  <span
                    style={{
                      flexShrink: 0,
                      margin: "0 12px",
                      fontSize: "11px",
                      color: "#94a3b8",
                    }}
                  >
                    Or continue with
                  </span>
                  <div
                    className="dark-border-slate-800"
                    style={{ flexGrow: 1, borderTop: "1px solid #e2e8f0" }}
                  />
                </div>

                {/* Google and Microsoft Buttons */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
                    gap: 12,
                  }}
                >
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="dark-border-slate-700 dark-bg-slate-800 hover-bg-slate-50 dark-hover-bg-slate-700 dark-text-slate-200 transition-colors cursor-pointer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      padding: "8px 12px",
                      border: "1px solid #cbd5e1",
                      borderRadius: 8,
                      backgroundColor: "#ffffff",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      color: "#334155",
                    }}
                  >
                    <svg
                      style={{ width: 16, height: 16, flexShrink: 0 }}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />

                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />

                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />

                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Google</span>
                  </button>

                  
                </div>

                {/* Forgot Password Link */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    fontSize: "0.75rem",
                    color: "#64748b",
                    paddingTop: 4,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setActiveForm("forgot");
                      setEmailError("");
                    }}
                    className="hover-underline cursor-pointer"
                    style={{
                      color: "#2563eb",
                      fontWeight: 600,
                      background: "none",
                      border: "none",
                    }}
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Direct Demo Workspace Login Action */}
                <div style={{ paddingTop: 8 }}>
                  <button
                    type="button"
                    onClick={loginAsDemoUser}
                    className="dark-bg-blue-950-40 dark-border-indigo-800 dark-text-indigo-300 hover-bg-blue-100 transition-colors cursor-pointer"
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: 8,
                      backgroundColor: "#eff6ff",
                      border: "1px solid #bfdbfe",
                      color: "#1d4ed8",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                    }}
                  >
                    <Sparkles style={{ width: 14, height: 14 }} />
                    <span>Quick Demo Login (NovaPay Workspace)</span>
                  </button>
                </div>

                <p
                  style={{
                    fontSize: "11px",
                    color: "#94a3b8",
                    textAlign: "center",
                    paddingTop: 4,
                    margin: 0,
                  }}
                >
                  By signing in, you agree to RiskShield's Terms of Service and
                  Privacy Policy
                </p>
              </div>

              {/* PANEL 2: FORGOT PASSWORD FORM (SLIDES IN SMOOTHLY!) */}
              <div
                style={{
                  width: "50%",
                  padding: "0 8px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  <h3
                    className="dark-text-white"
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: 700,
                      color: "#0f172a",
                      margin: 0,
                    }}
                  >
                    Reset Your Password
                  </h3>
                  <p
                    style={{ fontSize: "0.75rem", color: "#64748b", margin: 0 }}
                  >
                    Enter your email address to receive password recovery
                    instructions.
                  </p>
                </div>

                <form
                  onSubmit={handleSendReset}
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 4 }}
                  >
                    <label
                      className="dark-text-slate-200"
                      style={{
                        display: "block",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "#1e293b",
                      }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError("");
                      }}
                      className="dark-bg-slate-800 dark-text-slate-100 dark-border-slate-700 transition-colors focus-ring"
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        fontSize: "0.75rem",
                        borderRadius: 8,
                        border: emailError
                          ? "1px solid #f43f5e"
                          : "1px solid #cbd5e1",
                        backgroundColor: "#ffffff",
                        color: "#0f172a",
                        outline: "none",
                      }}
                    />

                    {emailError && (
                      <p
                        style={{
                          fontSize: "11px",
                          color: "#f43f5e",
                          fontWeight: 500,
                          margin: 0,
                        }}
                      >
                        {emailError}
                      </p>
                    )}
                  </div>



                  {/* Send Reset Code Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="hover-bg-blue-600 transition-colors cursor-pointer"
                    style={{
                      width: "100%",
                      padding: "10px 16px",
                      backgroundColor: "#2563eb",
                      color: "#ffffff",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      borderRadius: 8,
                      boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      border: "none",
                      opacity: isLoading ? 0.6 : 1,
                    }}
                  >
                    {isLoading ? (
                      <div
                        className="animate-spin"
                        style={{
                          width: 16,
                          height: 16,
                          border: "2px solid #ffffff",
                          borderTopColor: "transparent",
                          borderRadius: "50%",
                        }}
                      />
                    ) : (
                      <span>Send Reset Code</span>
                    )}
                  </button>
                </form>

                {/* Back to Sign In (Slides back smoothly!) */}
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "0.75rem",
                    color: "#64748b",
                    paddingTop: 12,
                  }}
                >
                  <span>Remember your password? </span>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveForm("signin");
                      setEmailError("");
                    }}
                    className="hover-underline cursor-pointer"
                    style={{
                      color: "#2563eb",
                      fontWeight: 600,
                      background: "none",
                      border: "none",
                    }}
                  >
                    Back to Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
