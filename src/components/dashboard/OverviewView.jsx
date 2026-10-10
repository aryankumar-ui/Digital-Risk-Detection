import React from "react";
import { useApp } from "../../context/AppContext";
import { RiskBadge } from "../common/RiskBadge";
import { Play, CheckCircle2, ChevronRight } from "lucide-react";

export const OverviewView = () => {
  const {
    brands,
    socialFindings,
    appFindings,
    scanRuns,
    triggerScan,
    isScanning,
    setDashboardTab,
    setSelectedAppFinding,
    setSelectedSocialFinding,
    updateAppReviewStatus,
    updateSocialReviewStatus,
  } = useApp();

  const monitoredBrandsCount = brands.length;
  const socialCheckedCount = socialFindings.length > 0 ? socialFindings.length * 15 : 0;
  const appsScannedCount = appFindings.length > 0 ? appFindings.length * 12 : 0;
  const highRiskCount =
    socialFindings.filter(
      (s) => s.riskLevel === "critical" || s.riskLevel === "high",
    ).length +
    appFindings.filter(
      (a) =>
        (a.riskLevel === "critical" || a.riskLevel === "high") &&
        !a.isOfficialExcluded,
    ).length;
  const pendingReviewsCount =
    socialFindings.filter((s) => s.reviewStatus === "pending").length +
    appFindings.filter(
      (a) => a.reviewStatus === "pending" && !a.isOfficialExcluded,
    ).length;

  
  const allFindings = [...appFindings, ...socialFindings].filter(f => !f.isOfficialExcluded);
  const criticalCount = allFindings.filter(f => f.riskScore >= 85).length;
  const highCount = allFindings.filter(f => f.riskScore >= 70 && f.riskScore < 85).length;
  const mediumCount = allFindings.filter(f => f.riskScore >= 50 && f.riskScore < 70).length;
  const lowCount = allFindings.filter(f => f.riskScore < 50).length;
  const totalF = allFindings.length || 1;

  // Urgent threats requiring review (top 4)
  const urgentThreats = [
    ...appFindings
      .filter((a) => !a.isOfficialExcluded && a.reviewStatus === "pending")
      .map((a) => ({
        id: a.id,
        name: a.appName,
        brand: a.brandName,
        sourceType:
          a.store === "google_play" ? "Google Play" : "Apple App Store",
        riskScore: a.riskScore,
        riskLevel: a.riskLevel,
        reason: a.detectionReason,
        detected: a.firstDetectedAt,
        status: a.reviewStatus,
        type: "app",
        raw: a,
      })),
    ...socialFindings
      .filter((s) => s.reviewStatus === "pending")
      .map((s) => ({
        id: s.id,
        name: s.handle,
        brand: s.brandName,
        sourceType: s.platform.toUpperCase(),
        riskScore: s.riskScore,
        riskLevel: s.riskLevel,
        reason: s.detectionReason,
        detected: s.firstDetectedAt,
        status: s.reviewStatus,
        type: "social",
        raw: s,
      })),
  ]
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 4);

  return (
    <div
      className="fade-in"
      style={{ display: "flex", flexDirection: "column", gap: 32 }}
    >
      {/* Top Header & Actions */}
      <div
        className="sm-flex-row sm-items-center"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 16,
          paddingBottom: 8,
        }}
      >
        <div>
          <h1
            className="sm-text-2xl dark-text-white"
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "#0f172a",
              letterSpacing: "-0.025em",
              margin: 0,
            }}
          >
            Security Overview
          </h1>
          <p
            className="dark-text-slate-400"
            style={{
              fontSize: "0.75rem",
              color: "#64748b",
              marginTop: 4,
              margin: 0,
            }}
          >
            Continuous threat detection across registered brand assets, app
            marketplaces, and social channels.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => triggerScan()}
            disabled={isScanning}
            className="hover-bg-indigo-500 cursor-pointer disabled-opacity-60 transition-colors hover-shadow"
            style={{
              padding: "8px 16px",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#ffffff",
              backgroundColor: "#4f46e5",
              borderRadius: 8,
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              display: "flex",
              alignItems: "center",
              gap: 6,
              border: "none",
              opacity: isScanning ? 0.6 : 1,
            }}
          >
            <Play style={{ width: 14, height: 14, fill: "currentColor" }} />
            <span>{isScanning ? "Running Scan..." : "Scan Now"}</span>
          </button>
        </div>
      </div>

      {/* 5 Clean KPI Metric Cards */}
      <div
        className="sm-grid-cols-3 lg-grid-cols-5"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 16,
        }}
      >
        <div
          className="dark-bg-slate-900 dark-border-slate-800"
          style={{
            padding: 16,
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <div
            className="dark-text-slate-400"
            style={{ fontSize: "11px", fontWeight: 500, color: "#64748b" }}
          >
            Monitored Brands
          </div>
          <div
            className="dark-text-white"
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              fontFamily: "'JetBrains Mono', monospace",
              color: "#0f172a",
            }}
          >
            {monitoredBrandsCount}
          </div>
          <div style={{ fontSize: "10px", color: "#94a3b8" }}>
            Active telemetry
          </div>
        </div>

        <div
          className="dark-bg-slate-900 dark-border-slate-800"
          style={{
            padding: 16,
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <div
            className="dark-text-slate-400"
            style={{ fontSize: "11px", fontWeight: 500, color: "#64748b" }}
          >
            Social Profiles Checked
          </div>
          <div
            className="dark-text-white"
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              fontFamily: "'JetBrains Mono', monospace",
              color: "#0f172a",
            }}
          >
            {socialCheckedCount.toLocaleString()}
          </div>
          <div style={{ fontSize: "10px", color: "#94a3b8" }}>
            Meta & X stream
          </div>
        </div>

        <div
          className="dark-bg-slate-900 dark-border-slate-800"
          style={{
            padding: 16,
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <div
            className="dark-text-slate-400"
            style={{ fontSize: "11px", fontWeight: 500, color: "#64748b" }}
          >
            Apps Scanned
          </div>
          <div
            className="dark-text-white"
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              fontFamily: "'JetBrains Mono', monospace",
              color: "#0f172a",
            }}
          >
            {appsScannedCount.toLocaleString()}
          </div>
          <div style={{ fontSize: "10px", color: "#94a3b8" }}>
            Play & App Store
          </div>
        </div>

        <div
          className="dark-bg-slate-900 dark-border-slate-800"
          style={{
            padding: 16,
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <div
            className="dark-text-slate-400"
            style={{ fontSize: "11px", fontWeight: 500, color: "#64748b" }}
          >
            High-Risk Findings
          </div>
          <div
            className="dark-text-rose-400"
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              fontFamily: "'JetBrains Mono', monospace",
              color: "#e11d48",
            }}
          >
            {highRiskCount}
          </div>
          <div style={{ fontSize: "10px", color: "#f43f5e" }}>
            Requires triage
          </div>
        </div>

        <div
          className="sm-col-span-1 dark-bg-slate-900 dark-border-slate-800"
          style={{
            gridColumn: "span 2 / span 2",
            padding: 16,
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <div
            className="dark-text-slate-400"
            style={{ fontSize: "11px", fontWeight: 500, color: "#64748b" }}
          >
            Pending Reviews
          </div>
          <div
            className="dark-text-amber-400"
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              fontFamily: "'JetBrains Mono', monospace",
              color: "#d97706",
            }}
          >
            {pendingReviewsCount}
          </div>
          <div style={{ fontSize: "10px", color: "#f59e0b" }}>
            Awaiting decision
          </div>
        </div>
      </div>

      {/* Middle Row: Risk Distribution & Connector Coverage */}
      <div
        className="lg-grid-cols-12"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
          gap: 24,
        }}
      >
        {/* Risk Distribution Breakdown */}
        <div
          className="lg-col-span-6 dark-bg-slate-900 dark-border-slate-800"
          style={{
            padding: 20,
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h3
              className="dark-text-white"
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#0f172a",
                margin: 0,
              }}
            >
              Risk Level Distribution
            </h3>
            <span style={{ fontSize: "11px", color: "#94a3b8" }}>
              All Detected Candidates
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              paddingTop: 8,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "0.75rem",
                  marginBottom: 4,
                }}
              >
                <span
                  className="dark-text-rose-400"
                  style={{
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    color: "#e11d48",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "#f43f5e",
                    }}
                  />
                  <span>Critical Risk (85 - 100)</span>
                </span>
                <span
                  className="dark-text-slate-300"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "#334155",
                  }}
                >{criticalCount} findings</span>
              </div>
              <div
                className="dark-bg-slate-800"
                style={{
                  height: 8,
                  width: "100%",
                  backgroundColor: "#f1f5f9",
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    backgroundColor: "#f43f5e",
                    borderRadius: 4,
                    width: `${(criticalCount / totalF) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "0.75rem",
                  marginBottom: 4,
                }}
              >
                <span
                  className="dark-text-amber-400"
                  style={{
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    color: "#d97706",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "#f59e0b",
                    }}
                  />
                  <span>High Risk (70 - 84)</span>
                </span>
                <span
                  className="dark-text-slate-300"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "#334155",
                  }}
                >{highCount} findings</span>
              </div>
              <div
                className="dark-bg-slate-800"
                style={{
                  height: 8,
                  width: "100%",
                  backgroundColor: "#f1f5f9",
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    backgroundColor: "#f59e0b",
                    borderRadius: 4,
                    width: `${(highCount / totalF) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "0.75rem",
                  marginBottom: 4,
                }}
              >
                <span
                  className="dark-text-yellow-400"
                  style={{
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    color: "#ca8a04",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "#eab308",
                    }}
                  />
                  <span>Medium Risk (50 - 69)</span>
                </span>
                <span
                  className="dark-text-slate-300"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "#334155",
                  }}
                >{mediumCount} finding(s)</span>
              </div>
              <div
                className="dark-bg-slate-800"
                style={{
                  height: 8,
                  width: "100%",
                  backgroundColor: "#f1f5f9",
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    backgroundColor: "#eab308",
                    borderRadius: 4,
                    width: "20%",
                  }}
                />
              </div>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "0.75rem",
                  marginBottom: 4,
                }}
              >
                <span
                  className="dark-text-emerald-400"
                  style={{
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    color: "#059669",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "#10b981",
                    }}
                  />
                  <span>Low / Official Excluded (0 - 49)</span>
                </span>
                <span
                  className="dark-text-slate-300"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "#334155",
                  }}
                >{lowCount} verified</span>
              </div>
              <div
                className="dark-bg-slate-800"
                style={{
                  height: 8,
                  width: "100%",
                  backgroundColor: "#f1f5f9",
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    backgroundColor: "#10b981",
                    borderRadius: 4,
                    width: `${(criticalCount / totalF) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Monitoring Coverage Connector Status */}
        <div
          className="lg-col-span-6 dark-bg-slate-900 dark-border-slate-800"
          style={{
            padding: 20,
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h3
              className="dark-text-white"
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#0f172a",
                margin: 0,
              }}
            >
              Monitoring Coverage & Connectors
            </h3>
            <span style={{ fontSize: "10px", color: "#94a3b8" }}>
              Health Status
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              paddingTop: 4,
            }}
          >
            <div
              className="dark-bg-slate-800-60 dark-border-slate-800"
              style={{
                padding: 12,
                backgroundColor: "#f8fafc",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "0.75rem",
                border: "1px solid #f1f5f9",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "#10b981",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div
                    className="dark-text-white"
                    style={{ fontWeight: 600, color: "#0f172a" }}
                  >
                    Google Play Store Connector
                  </div>
                  <div
                    className="dark-text-slate-500"
                    style={{ fontSize: "11px", color: "#64748b" }}
                  >
                    Package namespace & developer registry inspection
                  </div>
                </div>
              </div>
              <span
                className="dark-text-emerald-400"
                style={{
                  fontSize: "11px",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 500,
                  color: "#059669",
                }}
              >
                Connected
              </span>
            </div>

            <div
              className="dark-bg-slate-800-60 dark-border-slate-800"
              style={{
                padding: 12,
                backgroundColor: "#f8fafc",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "0.75rem",
                border: "1px solid #f1f5f9",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "#10b981",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div
                    className="dark-text-white"
                    style={{ fontWeight: 600, color: "#0f172a" }}
                  >
                    Apple App Store Connector
                  </div>
                  <div
                    className="dark-text-slate-500"
                    style={{ fontSize: "11px", color: "#64748b" }}
                  >
                    iOS bundle ID & team identifier matching
                  </div>
                </div>
              </div>
              <span
                className="dark-text-emerald-400"
                style={{
                  fontSize: "11px",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 500,
                  color: "#059669",
                }}
              >
                Connected
              </span>
            </div>

            <div
              className="dark-bg-slate-800-60 dark-border-slate-800"
              style={{
                padding: 12,
                backgroundColor: "#f8fafc",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "0.75rem",
                border: "1px solid #f1f5f9",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "#6366f1",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div
                    className="dark-text-white"
                    style={{ fontWeight: 600, color: "#0f172a" }}
                  >
                    Social Platform Stream (Meta & X)
                  </div>
                  <div
                    className="dark-text-slate-500"
                    style={{ fontSize: "11px", color: "#64748b" }}
                  >
                    Fuzzy handle matching & logo perceptual hashing
                  </div>
                </div>
              </div>
              <span
                className="dark-text-indigo-400"
                style={{
                  fontSize: "11px",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 500,
                  color: "#4f46e5",
                }}
              >
                Demo Active
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Urgent Threats Requiring Review Table */}
      <div
        className="dark-bg-slate-900 dark-border-slate-800"
        style={{
          padding: 20,
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: 12,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3
              className="dark-text-white"
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#0f172a",
                margin: 0,
              }}
            >
              New Threats Requiring Review
            </h3>
            <p
              className="dark-text-slate-500"
              style={{ fontSize: "0.75rem", color: "#64748b", margin: 0 }}
            >
              High-priority findings with elevated risk indicators awaiting
              analyst determination
            </p>
          </div>
          <button
            onClick={() => setDashboardTab("findings")}
            className="dark-text-indigo-400 hover-underline cursor-pointer"
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#4f46e5",
              display: "flex",
              alignItems: "center",
              gap: 4,
              background: "none",
              border: "none",
            }}
          >
            <span>View All Threat Findings</span>
            <ChevronRight style={{ width: 14, height: 14 }} />
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              textAlign: "left",
              fontSize: "0.75rem",
              borderCollapse: "collapse",
            }}
          >
            <thead
              className="dark-bg-slate-800-90 dark-border-slate-700"
              style={{
                backgroundColor: "#f1f5f9",
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              <tr
                className="dark-text-slate-100"
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#1e293b",
                }}
              >
                <th style={{ padding: "12px 12px" }}>Entity Name</th>
                <th style={{ padding: "12px 12px" }}>Brand</th>
                <th style={{ padding: "12px 12px" }}>Source Channel</th>
                <th style={{ padding: "12px 12px" }}>Risk Assessment</th>
                <th style={{ padding: "12px 12px" }}>
                  Primary Detection Reason
                </th>
                <th style={{ padding: "12px 12px" }}>First Seen</th>
                <th style={{ padding: "12px 12px", textAlign: "right" }}>
                  Quick Action
                </th>
              </tr>
            </thead>
            <tbody className="dark-divide-slate-800 divide-slate-100">
              {urgentThreats.map((t) => (
                <tr
                  key={t.id}
                  className="hover-bg-slate-50-80 dark-hover-bg-slate-800-40 transition-colors"
                  style={{ borderBottom: "1px solid #f1f5f9" }}
                >
                  <td
                    className="dark-text-white"
                    style={{
                      padding: "12px 12px",
                      fontWeight: 600,
                      color: "#0f172a",
                      maxWidth: 180,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {t.name}
                  </td>
                  <td
                    className="dark-text-slate-200"
                    style={{
                      padding: "12px 12px",
                      color: "#334155",
                      fontWeight: 500,
                    }}
                  >
                    {t.brand}
                  </td>
                  <td
                    className="dark-text-slate-300"
                    style={{
                      padding: "12px 12px",
                      color: "#334155",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "11px",
                    }}
                  >
                    {t.sourceType}
                  </td>
                  <td style={{ padding: "12px 12px" }}>
                    <RiskBadge level={t.riskLevel} score={t.riskScore} />
                  </td>
                  <td
                    className="dark-text-slate-300 truncate"
                    title={t.reason}
                    style={{
                      padding: "12px 12px",
                      color: "#334155",
                      maxWidth: "20rem",
                    }}
                  >
                    {t.reason}
                  </td>
                  <td
                    className="dark-text-slate-400"
                    style={{
                      padding: "12px 12px",
                      color: "#64748b",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "11px",
                    }}
                  >
                    {t.detected}
                  </td>
                  <td style={{ padding: "12px 12px", textAlign: "right" }}>
                    <div
                      style={{
                        display: "flex",
                        gap: 4,
                        justifyContent: "flex-end",
                      }}
                    >
                      <button
                        onClick={() => {
                          if (t.type === "app") {
                            setSelectedAppFinding(t.raw);
                            setDashboardTab("apps");
                          } else {
                            setSelectedSocialFinding(t.raw);
                            setDashboardTab("social");
                          }
                        }}
                        className="dark-text-indigo-400 hover-bg-indigo-50 dark-hover-bg-indigo-950-40 transition-colors cursor-pointer"
                        style={{
                          padding: "4px 10px",
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "#4f46e5",
                          backgroundColor: "transparent",
                          borderRadius: 4,
                          border: "none",
                        }}
                      >
                        Inspect
                      </button>
                      <button
                        onClick={() => {
                          if (t.type === "app") {
                            updateAppReviewStatus(t.id, "confirmed_threat");
                          } else {
                            updateSocialReviewStatus(t.id, "confirmed_threat");
                          }
                        }}
                        className="dark-text-rose-400 hover-bg-rose-50 dark-hover-bg-rose-950-40 transition-colors cursor-pointer"
                        style={{
                          padding: "4px 10px",
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "#e11d48",
                          backgroundColor: "transparent",
                          borderRadius: 4,
                          border: "none",
                        }}
                      >
                        Confirm Threat
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


    </div>
  );
};
