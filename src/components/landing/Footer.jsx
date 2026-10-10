import React from "react";
import { useApp } from "../../context/AppContext";
import { Shield } from "lucide-react";

export const Footer = () => {
  const { setView, loginAsDemoUser } = useApp();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="dark-bg-slate-950 dark-border-slate-800 transition-colors"
      style={{
        backgroundColor: "#ffffff",
        borderTop: "1px solid #e2e8f0",
        color: "#475569",
        padding: "3rem 0",
        fontSize: "0.75rem",
      }}
    >
      <div
        className="sm-px-6 lg-px-8"
        style={{ padding: "0 32px" }}
      >
        <div
          className="md-grid-cols-5"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
            gap: 32,
            marginBottom: 40,
          }}
        >
          {/* Brand Info */}
          <div
            className="md-col-span-2"
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            <div
              className="dark-text-white"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "#0f172a",
                fontWeight: 700,
                fontSize: "1rem",
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 4,
                  backgroundColor: "#4f46e5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: "0.75rem",
                }}
              >
                <Shield style={{ width: 14, height: 14 }} />
              </div>
              <span>RiskShield AI</span>
            </div>
            <p
              style={{
                color: "#64748b",
                maxWidth: 384,
                lineHeight: 1.625,
                fontSize: "11px",
                margin: 0,
              }}
            >
              Continuous brand impersonation detection, look-alike social
              tracking, and mobile application store intelligence platform.
            </p>
            <div style={{ fontSize: "10px", color: "#94a3b8" }}>
              Built for security engineering, anti-fraud, and intellectual
              property defense teams.
            </div>
          </div>

          {/* Links */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              className="dark-text-white"
              style={{ fontWeight: 600, color: "#0f172a", fontSize: "0.75rem" }}
            >
              Platform
            </div>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                fontSize: "11px",
                listStyleType: "none",
                margin: 0,
                padding: 0,
              }}
            >
              <li>
                <button
                  onClick={() => scrollTo("overview")}
                  className="hover-text-slate-900 dark-hover-text-white cursor-pointer"
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    color: "inherit",
                    textAlign: "left",
                  }}
                >
                  Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("how-it-works")}
                  className="hover-text-slate-900 dark-hover-text-white cursor-pointer"
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    color: "inherit",
                    textAlign: "left",
                  }}
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("app-monitoring")}
                  className="hover-text-slate-900 dark-hover-text-white cursor-pointer"
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    color: "inherit",
                    textAlign: "left",
                  }}
                >
                  App Store Monitoring
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("social-monitoring")}
                  className="hover-text-slate-900 dark-hover-text-white cursor-pointer"
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    color: "inherit",
                    textAlign: "left",
                  }}
                >
                  Social Monitoring
                </button>
              </li>
            </ul>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              className="dark-text-white"
              style={{ fontWeight: 600, color: "#0f172a", fontSize: "0.75rem" }}
            >
              Resources
            </div>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                fontSize: "11px",
                listStyleType: "none",
                margin: 0,
                padding: 0,
              }}
            >
              <li>
                <button
                  onClick={() => scrollTo("explainable-detection")}
                  className="hover-text-slate-900 dark-hover-text-white cursor-pointer"
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    color: "inherit",
                    textAlign: "left",
                  }}
                >
                  Evidence Decomposition
                </button>
              </li>
              <li>
                <span style={{ color: "#94a3b8", cursor: "default" }}>
                  Platform Documentation
                </span>
              </li>
              <li>
                <span style={{ color: "#94a3b8", cursor: "default" }}>
                  Google Play Abuse Guide
                </span>
              </li>
              <li>
                <span style={{ color: "#94a3b8", cursor: "default" }}>
                  DMCA Notice Templates
                </span>
              </li>
            </ul>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div
              className="dark-text-white"
              style={{ fontWeight: 600, color: "#0f172a", fontSize: "0.75rem" }}
            >
              Access
            </div>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                fontSize: "11px",
                listStyleType: "none",
                margin: 0,
                padding: 0,
              }}
            >
              <li>
                <button
                  onClick={() => setView("login")}
                  className="hover-text-slate-900 dark-hover-text-white cursor-pointer"
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    color: "inherit",
                    textAlign: "left",
                  }}
                >
                  Sign In (Google OAuth)
                </button>
              </li>
              <li>
                <button
                  onClick={loginAsDemoUser}
                  className="dark-text-indigo-400 cursor-pointer"
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    color: "#4f46e5",
                    fontWeight: 500,
                    textAlign: "left",
                  }}
                >
                  Explore Demo Workspace
                </button>
              </li>
              <li>
                <span style={{ color: "#94a3b8", cursor: "default" }}>
                  SOC 2 Type II Compliance
                </span>
              </li>
              <li>
                <span style={{ color: "#94a3b8", cursor: "default" }}>
                  Privacy Policy
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="sm-flex-row sm-items-center dark-border-slate-800"
          style={{
            paddingTop: 32,
            borderTop: "1px solid #f1f5f9",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 16,
            fontSize: "11px",
            color: "#94a3b8",
          }}
        >
          <div>
            © {new Date().getFullYear()} RiskShield AI Technologies Inc. All
            rights reserved.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span>Enterprise Digital Risk Protection</span>
            <span>·</span>
            <span>Single Tenant Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
