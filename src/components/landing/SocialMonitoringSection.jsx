import React from "react";
import { useApp } from "../../context/AppContext";
import { SimilarityBar } from "../common/SimilarityBar";
import { RiskBadge, StatusBadge } from "../common/RiskBadge";
import { Share2, AlertTriangle, ShieldAlert, ArrowRight } from "lucide-react";

export const SocialMonitoringSection = () => {
  const { loginAsDemoUser, setDashboardTab } = useApp();

  const openSocialDemo = () => {
    loginAsDemoUser();
    setDashboardTab("social");
  };

  return (
    <section
      id="social-monitoring"
      className="dark-bg-slate-900-40 dark-border-slate-800 transition-colors"
      style={{
        padding: "5rem 0",
        backgroundColor: "#f8fafc",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      <div
        className="sm-px-6 lg-px-8"
        style={{ padding: "0 32px" }}
      >
        <div
          className="lg-grid-cols-12"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
            gap: "3rem",
            alignItems: "center",
          }}
        >
          {/* Left Column: Context and Capability checklist */}
          <div
            className="lg-col-span-6"
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <div
              className="dark-text-indigo-400"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#4f46e5",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              <Share2 style={{ width: 14, height: 14 }} />
              <span>Social Media Monitoring</span>
            </div>

            <h2
              className="sm-text-3xl md-text-4xl dark-text-white"
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "#0f172a",
                letterSpacing: "-0.025em",
                margin: 0,
              }}
            >
              Find Profiles That Shouldn't Be There
            </h2>

            <p
              className="sm-text-base dark-text-slate-300"
              style={{
                fontSize: "0.875rem",
                color: "#475569",
                lineHeight: 1.625,
                margin: 0,
              }}
            >
              Scammers exploit consumer urgency by creating look-alike social
              profiles, posing as "official customer care" and soliciting
              private banking PINs or login credentials. RiskShield AI scans
              public social channels to flag anomalous handles mimicking your
              trademark.
            </p>

            <ul
              className="sm-text-sm dark-text-slate-300"
              style={{
                paddingTop: 8,
                fontSize: "0.75rem",
                color: "#334155",
                listStyleType: "none",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                margin: 0,
                padding: 0,
              }}
            >
              <li
                style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "#6366f1",
                    marginTop: 8,
                    flexShrink: 0,
                  }}
                />
                <span>
                  <strong style={{ fontWeight: 600 }}>
                    Similar Usernames & Display Names:
                  </strong>{" "}
                  Levenshtein distance & fuzzy phonetic matching on brand
                  aliases.
                </span>
              </li>
              <li
                style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "#6366f1",
                    marginTop: 8,
                    flexShrink: 0,
                  }}
                />
                <span>
                  <strong style={{ fontWeight: 600 }}>
                    Perceptual Logo Matching:
                  </strong>{" "}
                  Detects cropped, color-altered, or mirrored versions of your
                  trademarked emblems.
                </span>
              </li>
              <li
                style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "#6366f1",
                    marginTop: 8,
                    flexShrink: 0,
                  }}
                />
                <span>
                  <strong style={{ fontWeight: 600 }}>
                    Deceptive Bio & Phishing Signals:
                  </strong>{" "}
                  Identifies solicitations for passwords, seed phrases, or
                  external unapproved shortlinks.
                </span>
              </li>
              <li
                style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "#6366f1",
                    marginTop: 8,
                    flexShrink: 0,
                  }}
                />
                <span>
                  <strong style={{ fontWeight: 600 }}>
                    Verification Divergence:
                  </strong>{" "}
                  Pinpoints unverified accounts attempting to act as official
                  brand spokespeople.
                </span>
              </li>
            </ul>

            <div style={{ paddingTop: 8 }}>
              <button
                onClick={openSocialDemo}
                className="dark-bg-indigo-600 hover-bg-slate-800 dark-hover-bg-indigo-500 transition-colors cursor-pointer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 16px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#ffffff",
                  backgroundColor: "#0f172a",
                  borderRadius: 8,
                  border: "none",
                }}
              >
                <span>Open Social Monitoring Console</span>
                <ArrowRight style={{ width: 14, height: 14 }} />
              </button>
            </div>
          </div>

          {/* Right Column: Sample Finding Card & Table Preview */}
          <div
            className="lg-col-span-6"
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            <div
              className="dark-bg-slate-900 dark-border-slate-800"
              style={{
                padding: 24,
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: 16,
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                className="dark-border-slate-800"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: 16,
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    className="dark-bg-rose-950-50 dark-text-rose-400"
                    style={{
                      padding: 6,
                      borderRadius: 6,
                      backgroundColor: "#fff1f2",
                      color: "#e11d48",
                    }}
                  >
                    <ShieldAlert style={{ width: 16, height: 16 }} />
                  </div>
                  <div>
                    <span
                      className="dark-text-white"
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "#0f172a",
                        display: "block",
                      }}
                    >
                      Sample Finding Dossier
                    </span>
                    <span
                      className="dark-text-slate-400"
                      style={{
                        fontSize: "10px",
                        color: "#94a3b8",
                        display: "block",
                      }}
                    >
                      Demonstration Dataset
                    </span>
                  </div>
                </div>
                <RiskBadge level="critical" score={89} />
              </div>

              {/* Candidate Info */}
              <div
                style={{
                  padding: "16px 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 16,
                  }}
                >
                  <div>
                    <h4
                      className="dark-text-white"
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        color: "#0f172a",
                        margin: 0,
                      }}
                    >
                      @novapay_customer_help
                    </h4>
                    <p
                      className="dark-text-slate-500"
                      style={{
                        fontSize: "0.75rem",
                        color: "#64748b",
                        margin: "4px 0 0 0",
                      }}
                    >
                      NovaPay Customer Support & Help Desk · Instagram
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <StatusBadge status="pending" />
                  </div>
                </div>

                <div
                  className="dark-bg-slate-800-60 dark-border-slate-800"
                  style={{
                    padding: 12,
                    backgroundColor: "#f8fafc",
                    borderRadius: 8,
                    border: "1px solid #f1f5f9",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    fontSize: "0.75rem",
                  }}
                >
                  <div
                    className="dark-text-slate-400"
                    style={{
                      color: "#64748b",
                      fontSize: "11px",
                      fontWeight: 500,
                    }}
                  >
                    Bio Text Detected:
                  </div>
                  <p
                    className="dark-text-slate-300"
                    style={{ color: "#334155", fontStyle: "italic", margin: 0 }}
                  >
                    "Official NovaPay Support 24/7. Account locked? Pending
                    transaction or charge dispute? Send Direct Message with your
                    phone number for instant unlock."
                  </p>
                  <div
                    className="dark-text-rose-400"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      color: "#e11d48",
                      fontSize: "11px",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    <AlertTriangle
                      style={{ width: 12, height: 12, flexShrink: 0 }}
                    />
                    <span>
                      External Link: https://novapay-support-verify.replit.app
                    </span>
                  </div>
                </div>

                {/* Similarity Breakdown */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: 16,
                    paddingTop: 4,
                  }}
                >
                  <SimilarityBar
                    label="Name Match Similarity"
                    percentage={92}
                  />
                  <SimilarityBar
                    label="Logo Perceptual Match"
                    percentage={86}
                  />
                </div>

                <div
                  className="dark-bg-rose-950-20 dark-border-rose-900-40 dark-text-rose-300"
                  style={{
                    padding: 10,
                    backgroundColor: "rgba(255, 241, 242, 0.5)",
                    border: "1px solid rgba(254, 205, 211, 0.5)",
                    borderRadius: 8,
                    fontSize: "0.75rem",
                    color: "#881337",
                  }}
                >
                  <span style={{ fontWeight: 600 }}>Classification:</span>{" "}
                  Potential brand impersonation soliciting sensitive credentials
                  under pretext of customer assistance.
                </div>
              </div>
            </div>

            {/* Small UI Preview Row */}
            <div
              className="dark-bg-slate-900 dark-border-slate-800 dark-text-slate-400"
              style={{
                padding: 12,
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "0.75rem",
                color: "#475569",
              }}
            >
              <span
                className="truncate"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Active monitoring: 1,420 profile queries indexed across
                Instagram, X, LinkedIn
              </span>
              <span
                className="dark-text-indigo-400"
                style={{ flexShrink: 0, fontWeight: 500, color: "#4f46e5" }}
              >
                Live Telemetry
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
