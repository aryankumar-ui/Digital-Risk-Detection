import os

component_code = """import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { db } from "../../lib/firebase";
import { collection, addDoc, query, orderBy, onSnapshot, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { Mail, CheckCircle2, Clock, XCircle, RefreshCcw, ShieldCheck, UserX } from "lucide-react";

export const AdminManagementView = () => {
  const { user, userRole, showToast } = useApp();
  const [email, setEmail] = useState("");
  const [invitations, setInvitations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userRole !== "admin") return;
    const q = query(collection(db, "adminInvitations"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setInvitations(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [userRole]);

  if (userRole !== "admin") {
    return (
      <div style={{ padding: 32, textAlign: "center" }}>
        <ShieldCheck style={{ width: 48, height: 48, margin: "0 auto", color: "#ef4444" }} />
        <h2 style={{ marginTop: 16 }}>Access Denied</h2>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  const handleInvite = async (e) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);

    try {
      const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
      
      const inviteData = {
        email: email.toLowerCase().trim(),
        token: token, // Note: storing raw token here for simplicity, typically hash it
        invitedBy: user.uid,
        status: "pending",
        createdAt: serverTimestamp(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      };

      const inviteRef = await addDoc(collection(db, "adminInvitations"), inviteData);

      // Trigger Email Extension writes to 'mail' collection
      await addDoc(collection(db, "mail"), {
        to: email,
        message: {
          subject: "You're Invited to Join RiskShield AI as an Administrator",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
              <h2>You've Been Invited!</h2>
              <p>You have been invited to join RiskShield AI as an Administrator.</p>
              <p>As an administrator, you will be able to access the authorized administration tools and manage admin invitations.</p>
              <a href="${window.location.origin}/invite/accept?id=${inviteRef.id}&token=${token}" style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 24px 0;">Accept Admin Invitation</a>
              <p>This invitation expires in 24 hours.</p>
              <p>If you weren't expecting this invitation, you can safely ignore this email.</p>
            </div>
          `
        }
      });

      showToast("Invitation queued for delivery", "success");
      setEmail("");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRevoke = async (id) => {
    try {
      await updateDoc(doc(db, "adminInvitations", id), { status: "revoked" });
      showToast("Invitation revoked", "success");
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  return (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto", width: "100%" }}>
      <h1 className="dark-text-white" style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 8 }}>Admin Management</h1>
      <p className="dark-text-slate-400" style={{ color: "#64748b", marginBottom: 32 }}>Invite and manage administrators for RiskShield AI.</p>

      <div className="dark-bg-slate-900 dark-border-slate-800" style={{ padding: 24, borderRadius: 12, border: "1px solid #e2e8f0", backgroundColor: "#ffffff", marginBottom: 32 }}>
        <h2 className="dark-text-white" style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 16 }}>Send Invitation</h2>
        <form onSubmit={handleInvite} style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ flex: 1, position: "relative" }}>
            <Mail style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", width: 16 }} />
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Administrator Email Address"
              className="dark-bg-slate-950 dark-border-slate-700 dark-text-white"
              style={{ width: "100%", padding: "10px 10px 10px 36px", borderRadius: 8, border: "1px solid #cbd5e1" }}
            />
          </div>
          <button 
            type="submit"
            disabled={isLoading}
            className="hover-bg-blue-600"
            style={{ padding: "10px 20px", backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer", opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? "Sending..." : "Send Admin Invitation"}
          </button>
        </form>
      </div>

      <div className="dark-bg-slate-900 dark-border-slate-800" style={{ padding: 24, borderRadius: 12, border: "1px solid #e2e8f0", backgroundColor: "#ffffff" }}>
        <h2 className="dark-text-white" style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 16 }}>Recent Invitations</h2>
        {invitations.length === 0 ? (
          <p style={{ color: "#94a3b8" }}>No invitations found.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {invitations.map(inv => (
              <div key={inv.id} className="dark-border-slate-800" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 16, border: "1px solid #f1f5f9", borderRadius: 8 }}>
                <div>
                  <div className="dark-text-white" style={{ fontWeight: 600 }}>{inv.email}</div>
                  <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: 4 }}>
                    Status: <span style={{ 
                      color: inv.status === "accepted" ? "#10b981" : 
                             inv.status === "revoked" ? "#ef4444" : "#f59e0b",
                      textTransform: "capitalize", fontWeight: 600
                    }}>{inv.status}</span>
                  </div>
                </div>
                {inv.status === "pending" && (
                  <button 
                    onClick={() => handleRevoke(inv.id)}
                    style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem", fontWeight: 600 }}
                  >
                    <UserX style={{ width: 14 }} /> Revoke
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
"""

os.makedirs(r"c:\Users\Aryan\OneDrive\Desktop\hack\src\components\dashboard", exist_ok=True)
with open(r"c:\Users\Aryan\OneDrive\Desktop\hack\src\components\dashboard\AdminManagementView.jsx", "w", encoding="utf-8") as f:
    f.write(component_code)
    
print("Created AdminManagementView.jsx")
