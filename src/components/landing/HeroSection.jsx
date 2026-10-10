import React from "react";
import { useApp } from "../../context/AppContext";
import {
  Shield,
  ArrowRight,
  Smartphone,
  Share2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export const HeroSection = () => {
  const { setView, loginAsDemoUser } = useApp();

  return (
    <section
      className="dark-border-slate-800 md-pt-18 md-pb-28"
      style={{
        position: "relative",
        overflow: "hidden",
        paddingTop: "3rem",
        paddingBottom: "5rem",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      {/* Background ambient gradient glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          width: "100%",
          height: "24rem",
          backgroundImage:
            "linear-gradient(to bottom, rgba(99, 102, 241, 0.1), transparent, transparent)",
          pointerEvents: "none",
          filter: "blur(24px)",
          zIndex: -10,
        }}
      />

      <div
        className="sm-px-6 lg-px-8"
        style={{ padding: "0 32px" }}
      >
        <div
          className="lg-grid-cols-12 lg-gap-8"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
            gap: "3rem",
            alignItems: "center",
          }}
        >
          {/* Left Column: Headline and CTAs */}
          <div
            className="lg-col-span-7"
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <div
              className="dark-text-indigo-400 dark-bg-indigo-950-50 dark-border-indigo-900-50"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: "0.75rem",
                fontWeight: 500,
                color: "#4f46e5",
                backgroundColor: "#eef2ff",
                border: "1px solid #e0e7ff",
                padding: "4px 12px",
                borderRadius: 6,
                width: "fit-content",
              }}
            >
              <Shield style={{ width: 14, height: 14 }} />
              <span>Digital Risk & Brand Protection Intelligence</span>
            </div>

            <h1
              className="sm-text-4xl md-text-5xl dark-text-white text-balance"
              style={{
                fontSize: "1.875rem",
                fontWeight: 800,
                letterSpacing: "-0.025em",
                color: "#0f172a",
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              Protect Your Brand From Digital Impersonation.
            </h1>

            <p
              className="sm-text-lg dark-text-slate-300"
              style={{
                fontSize: "1rem",
                color: "#475569",
                lineHeight: 1.625,
                maxWidth: "42rem",
                margin: 0,
              }}
            >
              Discover fake social profiles, scam accounts and suspicious mobile
              applications that imitate your brand. RiskShield AI helps teams
              identify potential threats, understand the evidence and prioritize
              what needs attention.
            </p>

            {/* CTAs */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 12,
                paddingTop: 8,
              }}
            >
              <button
                onClick={() => setView("login")}
                className="hover-bg-indigo-500 transition-all cursor-pointer hover-shadow"
                style={{
                  padding: "12px 24px",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#ffffff",
                  backgroundColor: "#4f46e5",
                  borderRadius: 8,
                  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  border: "none",
                }}
              >
                <span>Start Protecting Your Brand</span>
                <ArrowRight style={{ width: 16, height: 16 }} />
              </button>

              <button
                onClick={loginAsDemoUser}
                className="dark-text-slate-200 dark-bg-slate-900 dark-border-slate-700 hover-bg-slate-50 dark-hover-bg-slate-800 transition-colors cursor-pointer"
                style={{
                  padding: "12px 24px",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#1e293b",
                  backgroundColor: "#ffffff",
                  border: "1px solid #cbd5e1",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span>Explore Live Demo</span>
              </button>
            </div>

            {/* Trust statement */}
            <div
              className="dark-text-slate-400"
              style={{
                paddingTop: 8,
                fontSize: "0.75rem",
                color: "#64748b",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <CheckCircle2
                style={{
                  width: 16,
                  height: 16,
                  color: "#10b981",
                  flexShrink: 0,
                }}
              />
              <span>
                One workspace. Brand intelligence. Social and app protection.
              </span>
            </div>
          </div>

          {/* Right Column: Custom Cybersecurity Visualization */}
          <div className="lg-col-span-5" style={{ position: "relative" }}>
            <div
              className="sm-p-8 dark-bg-slate-900 dark-border-slate-800"
              style={{
                position: "relative",
                padding: "1.5rem",
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: 16,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                overflow: "hidden",
              }}
            >
              {/* Subtle radar scan grid effect */}
              <div
                className="bg-radial-grid"
                style={{ position: "absolute", inset: 0 }}
              />

              <div
                style={{
                  position: "relative",
                  zIndex: 10,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* Central Verified Brand Node */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 20,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: 16,
                    backgroundColor: "#0f172a",
                    color: "#ffffff",
                    borderRadius: 12,
                    border: "1px solid rgba(99, 102, 241, 0.4)",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                    maxWidth: 200,
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      backgroundColor: "#4f46e5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 8,
                      boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
                    }}
                  >
                    <Shield
                      style={{ width: 20, height: 20, color: "#ffffff" }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "-0.025em",
                    }}
                  >
                    NovaPay Global
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#a5b4fc",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      marginTop: 2,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: "#34d399",
                      }}
                    />
                    <span>Verified Official Asset</span>
                  </div>
                </div>

                {/* Connecting lines & Discovered Nodes */}
                <div
                  style={{
                    width: "100%",
                    marginTop: 24,
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: 16,
                  }}
                >
                  {/* Suspicious Mobile App Node */}
                  <div
                    className="dark-bg-slate-800-80 dark-border-rose-900-60"
                    style={{
                      padding: 12,
                      backgroundColor: "#f8fafc",
                      border: "1px solid #fecdd3",
                      borderRadius: 12,
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        className="dark-bg-rose-950-60 dark-text-rose-400"
                        style={{
                          padding: 4,
                          borderRadius: 4,
                          backgroundColor: "#ffe4e6",
                          color: "#e11d48",
                        }}
                      >
                        <Smartphone style={{ width: 14, height: 14 }} />
                      </div>
                      <span
                        className="tabular-nums dark-text-rose-400"
                        style={{
                          fontSize: "10px",
                          color: "#e11d48",
                          fontWeight: 700,
                        }}
                      >
                        91/100 RISK
                      </span>
                    </div>
                    <div>
                      <div
                        className="dark-text-white truncate"
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: "#0f172a",
                        }}
                      >
                        NovaPay Support
                      </div>
                      <div
                        className="truncate"
                        style={{ fontSize: "10px", color: "#64748b" }}
                      >
                        com.novapay.walletsupport
                      </div>
                    </div>
                    <div
                      className="dark-text-rose-400"
                      style={{
                        fontSize: "10px",
                        color: "#e11d48",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <AlertTriangle style={{ width: 10, height: 10 }} />
                      <span>Publisher Mismatch</span>
                    </div>
                  </div>

                  {/* Suspicious Social Profile Node */}
                  <div
                    className="dark-bg-slate-800-80 dark-border-amber-900-60"
                    style={{
                      padding: 12,
                      backgroundColor: "#f8fafc",
                      border: "1px solid #fde68a",
                      borderRadius: 12,
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        className="dark-bg-amber-950-60 dark-text-amber-400"
                        style={{
                          padding: 4,
                          borderRadius: 4,
                          backgroundColor: "#fef3c7",
                          color: "#d97706",
                        }}
                      >
                        <Share2 style={{ width: 14, height: 14 }} />
                      </div>
                      <span
                        className="tabular-nums dark-text-amber-400"
                        style={{
                          fontSize: "10px",
                          color: "#d97706",
                          fontWeight: 700,
                        }}
                      >
                        89/100 RISK
                      </span>
                    </div>
                    <div>
                      <div
                        className="dark-text-white truncate"
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: "#0f172a",
                        }}
                      >
                        @novapay_customer_help
                      </div>
                      <div
                        className="truncate"
                        style={{ fontSize: "10px", color: "#64748b" }}
                      >
                        Instagram · Unverified
                      </div>
                    </div>
                    <div
                      className="dark-text-amber-400"
                      style={{
                        fontSize: "10px",
                        color: "#d97706",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <AlertTriangle style={{ width: 10, height: 10 }} />
                      <span>92% Name Similarity</span>
                    </div>
                  </div>
                </div>

                {/* Excluded Legitimate App Indicator */}
                <div
                  className="dark-bg-emerald-950-30 dark-border-emerald-800-60"
                  style={{
                    width: "100%",
                    marginTop: 12,
                    padding: 10,
                    backgroundColor: "#ecfdf5",
                    border: "1px solid #a7f3d0",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "11px",
                  }}
                >
                  <div
                    className="dark-text-emerald-300"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      color: "#065f46",
                    }}
                  >
                    <CheckCircle2
                      style={{ width: 14, height: 14, flexShrink: 0 }}
                    />
                    <span>Official: com.novapay.wallet</span>
                  </div>
                  <span
                    className="dark-text-emerald-400"
                    style={{ fontWeight: 600, color: "#047857" }}
                  >
                    Auto-Excluded
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Compact Capability Highlights */}
        <div
          className="dark-border-slate-800 md-grid-cols-3"
          style={{
            marginTop: 56,
            paddingTop: 32,
            borderTop: "1px solid #e2e8f0",
            display: "grid",
            gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
            gap: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <div
              className="dark-bg-indigo-950-60 dark-text-indigo-400"
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                backgroundColor: "#eef2ff",
                color: "#4f46e5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Shield style={{ width: 16, height: 16 }} />
            </div>
            <div>
              <h3
                className="dark-text-white"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                Brand Identity Protection
              </h3>
              <p
                className="dark-text-slate-400"
                style={{
                  fontSize: "0.75rem",
                  color: "#64748b",
                  marginTop: 4,
                  margin: 0,
                }}
              >
                Centralized registry for trademarks, logos, verified domains and
                authorized entities.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <div
              className="dark-bg-indigo-950-60 dark-text-indigo-400"
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                backgroundColor: "#eef2ff",
                color: "#4f46e5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Share2 style={{ width: 16, height: 16 }} />
            </div>
            <div>
              <h3
                className="dark-text-white"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                Social Profile Monitoring
              </h3>
              <p
                className="dark-text-slate-400"
                style={{
                  fontSize: "0.75rem",
                  color: "#64748b",
                  marginTop: 4,
                  margin: 0,
                }}
              >
                Detect fake customer service handles, scam giveaways and
                phishing lures.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <div
              className="dark-bg-indigo-950-60 dark-text-indigo-400"
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                backgroundColor: "#eef2ff",
                color: "#4f46e5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Smartphone style={{ width: 16, height: 16 }} />
            </div>
            <div>
              <h3
                className="dark-text-white"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                Mobile App Monitoring
              </h3>
              <p
                className="dark-text-slate-400"
                style={{
                  fontSize: "0.75rem",
                  color: "#64748b",
                  marginTop: 4,
                  margin: 0,
                }}
              >
                Flag package identifier differences, look-alike names and rogue
                publishers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
