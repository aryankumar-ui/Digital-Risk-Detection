import React from "react";
import { useApp } from "../../context/AppContext";
import { SimilarityBar } from "../common/SimilarityBar";
import { RiskBadge } from "../common/RiskBadge";
import {
  Smartphone,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Building2,
  FileCode2,
} from "lucide-react";

export const AppStoreSection = () => {
  const { loginAsDemoUser, setDashboardTab } = useApp();

  const openAppMonitoringDemo = () => {
    loginAsDemoUser();
    setDashboardTab("apps");
  };

  return (
    <section
      id="app-monitoring"
      className="dark-bg-slate-950 dark-border-slate-800 transition-colors"
      style={{
        padding: "5rem 0",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      <div
        className="sm-px-6 lg-px-8"
        style={{ padding: "0 32px" }}
      >
        {/* Header */}
        <div style={{ maxWidth: "48rem", marginBottom: "4rem" }}>
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
              marginBottom: 8,
            }}
          >
            <Smartphone style={{ width: 14, height: 14 }} />
            <span>App Store Monitoring</span>
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
            Detect Fake Apps Before They Damage Your Brand.
          </h2>
          <p
            className="sm-text-base dark-text-slate-300"
            style={{
              marginTop: 16,
              fontSize: "0.875rem",
              color: "#475569",
              lineHeight: 1.625,
              margin: "16px 0 0 0",
            }}
          >
            Compare available app-store listings with your official mobile
            applications to identify potentially unauthorized apps, look-alike
            branding, rogue package namespaces and suspicious publisher
            differences.
          </p>
        </div>

        {/* Feature Capabilities Pills/List */}
        <div
          className="md-grid-cols-4"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 16,
            marginBottom: "3rem",
          }}
        >
          <div
            className="dark-bg-slate-900-60 dark-border-slate-800"
            style={{
              padding: 16,
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: 12,
            }}
          >
            <div
              className="dark-text-white"
              style={{ fontWeight: 600, fontSize: "0.75rem", color: "#0f172a" }}
            >
              App & Alias Similarity
            </div>
            <div
              className="dark-text-slate-400"
              style={{ fontSize: "11px", color: "#64748b", marginTop: 4 }}
            >
              Phonetic distance & title substring matching
            </div>
          </div>
          <div
            className="dark-bg-slate-900-60 dark-border-slate-800"
            style={{
              padding: 16,
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: 12,
            }}
          >
            <div
              className="dark-text-white"
              style={{ fontWeight: 600, fontSize: "0.75rem", color: "#0f172a" }}
            >
              Package ID Analysis
            </div>
            <div
              className="dark-text-slate-400"
              style={{ fontSize: "11px", color: "#64748b", marginTop: 4 }}
            >
              com.novapay.wallet vs rogue namespaces
            </div>
          </div>
          <div
            className="dark-bg-slate-900-60 dark-border-slate-800"
            style={{
              padding: 16,
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: 12,
            }}
          >
            <div
              className="dark-text-white"
              style={{ fontWeight: 600, fontSize: "0.75rem", color: "#0f172a" }}
            >
              Publisher Verification
            </div>
            <div
              className="dark-text-slate-400"
              style={{ fontSize: "11px", color: "#64748b", marginTop: 4 }}
            >
              Cross-check against authorized company whitelist
            </div>
          </div>
          <div
            className="dark-bg-slate-900-60 dark-border-slate-800"
            style={{
              padding: 16,
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: 12,
            }}
          >
            <div
              className="dark-text-white"
              style={{ fontWeight: 600, fontSize: "0.75rem", color: "#0f172a" }}
            >
              Official App Exclusion
            </div>
            <div
              className="dark-text-slate-400"
              style={{ fontSize: "11px", color: "#64748b", marginTop: 4 }}
            >
              Zero false positives for registered releases
            </div>
          </div>
        </div>

        {/* The Flagship Side-by-Side Comparison Matrix */}
        <div
          className="sm-p-8 dark-bg-slate-900-40 dark-border-slate-800"
          style={{
            padding: 24,
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: 16,
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          }}
        >
          <div
            className="sm-flex-row sm-items-center dark-border-slate-800"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              paddingBottom: 24,
              marginBottom: 24,
              borderBottom: "1px solid #e2e8f0",
              gap: 8,
            }}
          >
            <div>
              <span
                className="dark-text-white"
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#0f172a",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Comparative Evidence Engine
              </span>
              <p
                className="dark-text-slate-400"
                style={{ fontSize: "0.75rem", color: "#64748b", margin: 0 }}
              >
                Direct side-by-side inspection of legitimate registered app vs
                suspicious discovered candidate
              </p>
            </div>
            <span
              className="dark-text-indigo-400 dark-bg-indigo-950-50 dark-border-indigo-900-40"
              style={{
                fontSize: "0.75rem",
                fontFamily: "'JetBrains Mono', monospace",
                color: "#4f46e5",
                backgroundColor: "#eef2ff",
                padding: "4px 10px",
                borderRadius: 4,
                border: "1px solid #c7d2fe",
              }}
            >
              Google Play Registry Telemetry
            </span>
          </div>

          <div
            className="md-grid-cols-2"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
              gap: 32,
            }}
          >
            {/* Card 1: Official App */}
            <div
              className="dark-bg-slate-900 dark-border-emerald-800-60"
              style={{
                padding: 24,
                backgroundColor: "#ffffff",
                border: "1px solid #6ee7b7",
                borderRadius: 12,
                display: "flex",
                flexDirection: "column",
                gap: 20,
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
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    className="dark-bg-emerald-950-60 dark-text-emerald-400"
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      backgroundColor: "#d1fae5",
                      color: "#059669",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                    }}
                  >
                    NP
                  </div>
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
                      NovaPay Wallet
                    </h4>
                    <span
                      className="dark-text-slate-400"
                      style={{ fontSize: "11px", color: "#64748b" }}
                    >
                      Google Play Store
                    </span>
                  </div>
                </div>
                <span
                  className="dark-text-emerald-400"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#059669",
                  }}
                >
                  <ShieldCheck style={{ width: 16, height: 16 }} />
                  <span>Official / Verified</span>
                </span>
              </div>

              <div
                className="dark-border-slate-800"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  fontSize: "0.75rem",
                  borderTop: "1px solid #f1f5f9",
                  borderBottom: "1px solid #f1f5f9",
                  padding: "16px 0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    className="dark-text-slate-400"
                    style={{
                      color: "#64748b",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <FileCode2
                      style={{ width: 14, height: 14, color: "#94a3b8" }}
                    />
                    <span>Package Identifier:</span>
                  </span>
                  <span
                    className="dark-text-emerald-400"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: "#047857",
                      fontWeight: 600,
                    }}
                  >
                    com.novapay.wallet
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    className="dark-text-slate-400"
                    style={{
                      color: "#64748b",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <Building2
                      style={{ width: 14, height: 14, color: "#94a3b8" }}
                    />
                    <span>Publisher / Developer:</span>
                  </span>
                  <span
                    className="dark-text-white"
                    style={{ color: "#0f172a", fontWeight: 500 }}
                  >
                    NovaPay Technologies Ltd
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    className="dark-text-slate-400"
                    style={{ color: "#64748b" }}
                  >
                    Verification Registry:
                  </span>
                  <span
                    className="dark-text-emerald-400"
                    style={{ color: "#059669", fontWeight: 500 }}
                  >
                    Whitelisted Official Asset
                  </span>
                </div>
              </div>

              <div
                className="dark-text-slate-400"
                style={{ fontSize: "0.75rem", color: "#475569" }}
              >
                <span
                  className="dark-text-white"
                  style={{ fontWeight: 600, color: "#0f172a" }}
                >
                  Official Description:
                </span>
                <p className="line-clamp-2" style={{ margin: "4px 0 0 0" }}>
                  "Instant contactless payments, peer transfers, and
                  multi-currency accounts backed by NovaPay Technologies Ltd."
                </p>
              </div>

              <div
                className="dark-text-emerald-400"
                style={{
                  paddingTop: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: "0.75rem",
                  color: "#059669",
                }}
              >
                <CheckCircle style={{ width: 16, height: 16 }} />
                <span>Auto-excluded from threat findings</span>
              </div>
            </div>

            {/* Card 2: Candidate Rogue App */}
            <div
              className="dark-bg-slate-900 dark-border-rose-900-80"
              style={{
                padding: 24,
                backgroundColor: "#ffffff",
                border: "1px solid #fda4af",
                borderRadius: 12,
                display: "flex",
                flexDirection: "column",
                gap: 20,
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
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    className="dark-bg-rose-950-60 dark-text-rose-400"
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      backgroundColor: "#ffe4e6",
                      color: "#e11d48",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                    }}
                  >
                    NP
                  </div>
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
                      NovaPay Wallet Support
                    </h4>
                    <span
                      className="dark-text-slate-400"
                      style={{ fontSize: "11px", color: "#64748b" }}
                    >
                      Google Play Store
                    </span>
                  </div>
                </div>
                <RiskBadge level="critical" score={91} />
              </div>

              <div
                className="dark-border-slate-800"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  fontSize: "0.75rem",
                  borderTop: "1px solid #f1f5f9",
                  borderBottom: "1px solid #f1f5f9",
                  padding: "16px 0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    className="dark-text-slate-400"
                    style={{
                      color: "#64748b",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <FileCode2
                      style={{ width: 14, height: 14, color: "#94a3b8" }}
                    />
                    <span>Package Identifier:</span>
                  </span>
                  <span
                    className="dark-text-rose-400"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: "#e11d48",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <XCircle style={{ width: 14, height: 14 }} />
                    <span>com.novapay.walletsupport</span>
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    className="dark-text-slate-400"
                    style={{
                      color: "#64748b",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <Building2
                      style={{ width: 14, height: 14, color: "#94a3b8" }}
                    />
                    <span>Publisher / Developer:</span>
                  </span>
                  <span
                    className="dark-text-rose-400"
                    style={{
                      color: "#e11d48",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <AlertTriangle style={{ width: 14, height: 14 }} />
                    <span>QuickSupport Global LLC</span>
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    className="dark-text-slate-400"
                    style={{ color: "#64748b" }}
                  >
                    Publisher Status:
                  </span>
                  <span
                    className="dark-text-rose-400"
                    style={{ color: "#e11d48", fontWeight: 500 }}
                  >
                    Unrecognized Developer
                  </span>
                </div>
              </div>

              {/* Similarity bars */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <SimilarityBar label="Name Similarity" percentage={94} />
                <SimilarityBar label="Icon Visual Match" percentage={88} />
              </div>

              <div
                className="dark-bg-rose-950-30 dark-text-rose-300"
                style={{
                  padding: 10,
                  backgroundColor: "#fff1f2",
                  borderRadius: 8,
                  fontSize: "0.75rem",
                  color: "#881337",
                }}
              >
                <span style={{ fontWeight: 700 }}>Investigation Flag:</span>{" "}
                Requests master seed phrase and private security credentials.
              </div>
            </div>
          </div>

          {/* Action button */}
          <div style={{ marginTop: 32, textAlign: "center" }}>
            <button
              onClick={openAppMonitoringDemo}
              className="hover-bg-indigo-500 transition-colors cursor-pointer"
              style={{
                padding: "12px 24px",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#ffffff",
                backgroundColor: "#4f46e5",
                borderRadius: 8,
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                border: "none",
              }}
            >
              <span>Explore App Monitoring Dashboard</span>
              <ArrowRight style={{ width: 16, height: 16 }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
