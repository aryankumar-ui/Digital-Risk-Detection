import os

component_code = """import React, { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";
import { auth, db } from "../../lib/firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import { Shield, AlertTriangle, CheckCircle2 } from "lucide-react";

export const AcceptInvitePage = () => {
  const { user, setView, showToast } = useApp();
  const [status, setStatus] = useState("loading"); // loading, ready, success, error
  const [errorMsg, setErrorMsg] = useState("");

  const urlParams = new URLSearchParams(window.location.search);
  const invitationId = urlParams.get("id");
  const token = urlParams.get("token");

  useEffect(() => {
    if (!invitationId || !token) {
      setStatus("error");
      setErrorMsg("Invalid or missing invitation link parameters.");
      return;
    }

    if (!user) {
      // Must be logged in
      setStatus("auth_required");
      return;
    }

    setStatus("ready");
  }, [user, invitationId, token]);

  const handleAccept = async () => {
    setStatus("loading");
    try {
      const functions = getFunctions();
      const acceptAdminInvitation = httpsCallable(functions, "acceptAdminInvitation");
      
      await acceptAdminInvitation({ invitationId, token });
      
      setStatus("success");
      showToast("Admin privileges granted successfully!", "success");
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        window.location.href = "/"; // Force refresh to update claims
      }, 2000);
      
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg(err.message || "Failed to accept invitation.");
    }
  };

  return (
    <div className="dark-bg-slate-950 transition-colors" style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f8fafc" }}>
      <div className="dark-bg-slate-900 dark-border-slate-800" style={{ maxWidth: 450, width: "100%", padding: 32, borderRadius: 16, backgroundColor: "white", border: "1px solid #e2e8f0", textAlign: "center", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <div className="dark-bg-blue-900-30" style={{ width: 64, height: 64, borderRadius: "50%", backgroundColor: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Shield style={{ width: 32, height: 32, color: "#3b82f6" }} />
          </div>
        </div>

        <h1 className="dark-text-white" style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 12 }}>Administrator Invitation</h1>

        {status === "loading" && (
          <p className="dark-text-slate-400" style={{ color: "#64748b" }}>Verifying invitation...</p>
        )}

        {status === "auth_required" && (
          <div>
            <p className="dark-text-slate-400" style={{ color: "#64748b", marginBottom: 24 }}>You must be signed in to accept this invitation.</p>
            <button 
              onClick={() => setView("login")}
              style={{ width: "100%", padding: 12, backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}
            >
              Sign In to Accept
            </button>
          </div>
        )}

        {status === "ready" && (
          <div>
            <p className="dark-text-slate-400" style={{ color: "#64748b", marginBottom: 24 }}>
              You are signed in as <strong>{user?.email}</strong>. Click below to securely accept your RiskShield AI administrative privileges.
            </p>
            <button 
              onClick={handleAccept}
              style={{ width: "100%", padding: 12, backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}
            >
              Accept Invitation
            </button>
          </div>
        )}

        {status === "success" && (
          <div>
            <CheckCircle2 style={{ width: 48, height: 48, color: "#10b981", margin: "0 auto 16px" }} />
            <p className="dark-text-slate-400" style={{ color: "#64748b" }}>Success! Redirecting you to the dashboard...</p>
          </div>
        )}

        {status === "error" && (
          <div>
            <AlertTriangle style={{ width: 48, height: 48, color: "#ef4444", margin: "0 auto 16px" }} />
            <p style={{ color: "#ef4444", marginBottom: 24 }}>{errorMsg}</p>
            <button 
              onClick={() => setView("landing")}
              style={{ padding: "8px 16px", backgroundColor: "transparent", border: "1px solid #cbd5e1", borderRadius: 6, cursor: "pointer", fontWeight: 500 }}
            >
              Return Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
"""

with open(r"c:\Users\Aryan\OneDrive\Desktop\hack\src\components\auth\AcceptInvitePage.jsx", "w", encoding="utf-8") as f:
    f.write(component_code)
    
print("Created AcceptInvitePage.jsx")
