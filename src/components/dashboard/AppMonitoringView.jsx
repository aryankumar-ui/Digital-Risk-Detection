import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { RiskBadge, StatusBadge } from "../common/RiskBadge";
import { SimilarityBar } from "../common/SimilarityBar";
import {
  Search,
  ExternalLink,
  Play,
  X,
  XCircle,
  AlertTriangle,
  ShieldCheck,
  Download,
  Info,
} from "lucide-react";

export const AppMonitoringView = () => {
  const {
    appFindings,
    updateAppReviewStatus,
    selectedAppFinding,
    setSelectedAppFinding,
    setDashboardTab,
    brands,
    selectedBrandId,
    setSelectedBrandId,
    triggerScan,
    isScanning,
    showToast,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [storeFilter, setStoreFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [analystNotes, setAnalystNotes] = useState("");

  const filteredApps = appFindings.filter((app) => {
    const matchesSearch =
      app.appName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.packageId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.developerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = !selectedBrandId || app.brandId === selectedBrandId;
    const matchesStore = storeFilter === "all" || app.store === storeFilter;
    const matchesRisk = riskFilter === "all" || app.riskLevel === riskFilter;
    const matchesStatus =
      statusFilter === "all" || app.reviewStatus === statusFilter;
    return (
      matchesSearch &&
      matchesBrand &&
      matchesStore &&
      matchesRisk &&
      matchesStatus
    );
  });

  const appListingsChecked = appFindings.length > 0 ? appFindings.length * 12 : 0;
  const suspiciousApps = appFindings.filter(
    (a) => !a.isOfficialExcluded,
  ).length;
  const highRiskApps = appFindings.filter(
    (a) =>
      (a.riskLevel === "critical" || a.riskLevel === "high") &&
      !a.isOfficialExcluded,
  ).length;
  const officialExcluded = appFindings.filter(
    (a) => a.isOfficialExcluded,
  ).length;
  const pendingReviews = appFindings.filter(
    (a) => a.reviewStatus === "pending" && !a.isOfficialExcluded,
  ).length;

  // Retrieve official app reference for side-by-side comparison
  const selectedBrand =
    brands.find(
      (b) => b.id === (selectedAppFinding?.brandId || selectedBrandId),
    ) || brands[0];
  const officialReferenceApp = selectedBrand?.mobileApps[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Top Header */}
      <div
        className="sm-flex-row sm-items-center"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 16,
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
            App Store Monitoring
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
            Discover mobile applications that may be impersonating your official
            apps or misusing your brand identity.
          </p>
        </div>

        <button
          onClick={() => triggerScan()}
          disabled={isScanning}
          className="hover-bg-indigo-500 cursor-pointer disabled-opacity-60 transition-colors sm-self-auto hover-shadow"
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
            alignSelf: "flex-start",
            opacity: isScanning ? 0.6 : 1,
          }}
        >
          <Play style={{ width: 14, height: 14, fill: "currentColor" }} />
          <span>{isScanning ? "Scanning Stores..." : "Scan App Stores"}</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div
        className="sm-grid-cols-5"
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
            style={{ fontSize: "11px", color: "#64748b" }}
          >
            Listings Checked
          </div>
          <div
            className="dark-text-white"
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
              color: "#0f172a",
            }}
          >
            {appListingsChecked}
          </div>
          <div
            className="dark-text-slate-400"
            style={{ fontSize: "10px", color: "#64748b" }}
          >
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
            style={{ fontSize: "11px", color: "#64748b" }}
          >
            Potentially Suspicious
          </div>
          <div
            className="dark-text-white"
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
              color: "#0f172a",
            }}
          >
            {suspiciousApps}
          </div>
          <div
            className="dark-text-slate-400"
            style={{ fontSize: "10px", color: "#64748b" }}
          >
            Candidates flagged
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
            style={{ fontSize: "11px", color: "#64748b" }}
          >
            High-Risk Listings
          </div>
          <div
            className="dark-text-rose-400"
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
              color: "#e11d48",
            }}
          >
            {highRiskApps}
          </div>
          <div style={{ fontSize: "10px", color: "#f43f5e" }}>
            Deceptive packages
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
            style={{ fontSize: "11px", color: "#64748b" }}
          >
            Official Excluded
          </div>
          <div
            className="dark-text-emerald-400"
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
              color: "#059669",
            }}
          >
            {officialExcluded}
          </div>
          <div style={{ fontSize: "10px", color: "#10b981" }}>
            Whitelisted releases
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
            style={{ fontSize: "11px", color: "#64748b" }}
          >
            Pending Reviews
          </div>
          <div
            className="dark-text-amber-400"
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
              color: "#d97706",
            }}
          >
            {pendingReviews}
          </div>
          <div style={{ fontSize: "10px", color: "#f59e0b" }}>
            Awaiting action
          </div>
        </div>
      </div>

      {/* Source Coverage Status Cards */}
      <div
        className="md-grid-cols-2"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
          gap: 16,
        }}
      >
        <div
          className="dark-bg-slate-900 dark-border-slate-800"
          style={{
            padding: 14,
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "0.75rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              className="dark-bg-emerald-950-50 dark-text-emerald-400"
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                backgroundColor: "#ecfdf5",
                color: "#059669",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
              }}
            >
              GP
            </div>
            <div>
              <div
                className="dark-text-white"
                style={{ fontWeight: 600, color: "#0f172a" }}
              >
                Google Play Store Connector
              </div>
              <div
                className="dark-text-slate-400"
                style={{ fontSize: "11px", color: "#94a3b8" }}
              >
                Package inspection & manifest telemetry · Last scan 12m ago
              </div>
            </div>
          </div>
          <span
            className="dark-text-emerald-400 dark-bg-emerald-950-40"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              fontWeight: 600,
              color: "#059669",
              backgroundColor: "#ecfdf5",
              padding: "2px 8px",
              borderRadius: 4,
            }}
          >
            Connected
          </span>
        </div>

        <div
          className="dark-bg-slate-900 dark-border-slate-800"
          style={{
            padding: 14,
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "0.75rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              className="dark-bg-indigo-950-50 dark-text-indigo-400"
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                backgroundColor: "#eef2ff",
                color: "#4f46e5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
              }}
            >
              AS
            </div>
            <div>
              <div
                className="dark-text-white"
                style={{ fontWeight: 600, color: "#0f172a" }}
              >
                Apple App Store Connector
              </div>
              <div
                className="dark-text-slate-400"
                style={{ fontSize: "11px", color: "#94a3b8" }}
              >
                iOS bundle namespace & developer team scan · Last scan 2h ago
              </div>
            </div>
          </div>
          <span
            className="dark-text-emerald-400 dark-bg-emerald-950-40"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              fontWeight: 600,
              color: "#059669",
              backgroundColor: "#ecfdf5",
              padding: "2px 8px",
              borderRadius: 4,
            }}
          >
            Connected
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="dark-bg-slate-900 dark-border-slate-800"
        style={{
          padding: 12,
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: 12,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          fontSize: "0.75rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 10,
            flex: 1,
            minWidth: 280,
          }}
        >
          <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
            <Search
              style={{
                width: 14,
                height: 14,
                color: "#94a3b8",
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
            <input
              type="text"
              placeholder="Search by app name, package ID (com.xxx), or developer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="dark-bg-slate-800 dark-border-slate-700 dark-text-slate-100 placeholder-text-slate-400 focus-ring-indigo-500"
              style={{
                width: "100%",
                padding: "6px 12px 6px 36px",
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                color: "#0f172a",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <select
            value={selectedBrandId}
            onChange={(e) => setSelectedBrandId(e.target.value)}
            className="dark-bg-slate-800 dark-border-slate-700 dark-text-slate-300"
            style={{
              padding: 6,
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: 8,
              color: "#334155",
            }}
          >
            <option value="">All Brands</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>

          <select
            value={storeFilter}
            onChange={(e) => setStoreFilter(e.target.value)}
            className="dark-bg-slate-800 dark-border-slate-700 dark-text-slate-300"
            style={{
              padding: 6,
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: 8,
              color: "#334155",
            }}
          >
            <option value="all">All Stores</option>
            <option value="google_play">Google Play Store</option>
            <option value="apple_app_store">Apple App Store</option>
          </select>

          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="dark-bg-slate-800 dark-border-slate-700 dark-text-slate-300"
            style={{
              padding: 6,
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: 8,
              color: "#334155",
            }}
          >
            <option value="all">All Risk Levels</option>
            <option value="critical">Critical</option>
            <option value="high">High Risk</option>
            <option value="medium">Medium</option>
            <option value="low">Low Risk</option>
          </select>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            className="dark-text-slate-400"
            style={{ fontSize: "11px", color: "#94a3b8" }}
          >
            Status:
          </span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="dark-bg-slate-800 dark-border-slate-700 dark-text-slate-300"
            style={{
              padding: 6,
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: 8,
              color: "#334155",
            }}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Requires Review</option>
            <option value="investigating">Investigating</option>
            <option value="confirmed_threat">Confirmed Threat</option>
            <option value="legitimate">Official / Legitimate</option>
          </select>
        </div>
      </div>

      {/* App Findings Table */}
      <div
        className="dark-bg-slate-900 dark-border-slate-800"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        }}
      >
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
                <th style={{ padding: "12px 16px" }}>Application Listing</th>
                <th style={{ padding: "12px 16px" }}>Store</th>
                <th style={{ padding: "12px 16px" }}>
                  Package / Bundle Identifier
                </th>
                <th style={{ padding: "12px 16px" }}>Developer / Publisher</th>
                <th style={{ padding: "12px 16px" }}>Name Similarity</th>
                <th style={{ padding: "12px 16px" }}>Icon Similarity</th>
                <th style={{ padding: "12px 16px" }}>Risk Score</th>
                <th style={{ padding: "12px 16px" }}>Classification</th>
                <th style={{ padding: "12px 16px" }}>Review Status</th>
                <th style={{ padding: "12px 16px", textAlign: "right" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="dark-divide-slate-800 divide-slate-100">
              {filteredApps.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    style={{
                      padding: "32px 0",
                      textAlign: "center",
                      color: "#94a3b8",
                    }}
                  >
                    No application listings match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr
                    key={app.id}
                    onClick={() => {
                      setSelectedAppFinding(app);
                      setAnalystNotes(app.reviewerNotes || "");
                      setDashboardTab("graph");
                    }}
                    className={`hover-bg-slate-50-80 dark-hover-bg-slate-800-40 transition-colors cursor-pointer ${
                      app.isOfficialExcluded
                        ? "dark-bg-emerald-950-10 bg-emerald-50-30"
                        : ""
                    }`}
                    style={{
                      borderBottom: "1px solid #f1f5f9",
                      backgroundColor: app.isOfficialExcluded
                        ? "rgba(236, 253, 245, 0.5)"
                        : "transparent",
                    }}
                  >
                    <td style={{ padding: "14px 16px" }}>
                      <div>
                        <div
                          className="dark-text-white"
                          style={{
                            fontWeight: 700,
                            color: "#0f172a",
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <span>{app.appName}</span>
                          {app.isOfficialExcluded && (
                            <span
                              className="dark-text-emerald-400"
                              style={{
                                fontSize: "10px",
                                color: "#059669",
                                fontFamily: "'JetBrains Mono', monospace",
                              }}
                            >
                              (Official)
                            </span>
                          )}
                        </div>
                        <div
                          className="dark-text-slate-400"
                          style={{ fontSize: "11px", color: "#94a3b8" }}
                        >
                          Compared to: {app.comparedToOfficialAppName}
                        </div>
                      </div>
                    </td>

                    <td
                      className="dark-text-slate-300"
                      style={{
                        padding: "14px 16px",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "11px",
                        color: "#475569",
                      }}
                    >
                      {app.store === "google_play"
                        ? "Google Play"
                        : "Apple App Store"}
                    </td>

                    <td
                      style={{
                        padding: "14px 16px",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "11px",
                      }}
                    >
                      <span
                        className={
                          app.packageDifference
                            ? "dark-text-rose-400 text-rose-600"
                            : "dark-text-emerald-400 text-emerald-600 font-semibold"
                        }
                        style={{
                          color: app.packageDifference ? "#e11d48" : "#059669",
                        }}
                      >
                        {app.packageId}
                      </span>
                    </td>

                    <td
                      className="dark-text-slate-300 truncate"
                      style={{
                        padding: "14px 16px",
                        color: "#334155",
                        maxWidth: 150,
                      }}
                    >
                      {app.developerName}
                    </td>

                    <td
                      className="dark-text-slate-200 tabular-nums"
                      style={{
                        padding: "14px 16px",
                        fontFamily: "'JetBrains Mono', monospace",
                        color: "#1e293b",
                      }}
                    >
                      {app.nameSimilarity}%
                    </td>

                    <td
                      className="dark-text-slate-200 tabular-nums"
                      style={{
                        padding: "14px 16px",
                        fontFamily: "'JetBrains Mono', monospace",
                        color: "#1e293b",
                      }}
                    >
                      {app.iconSimilarity}%
                    </td>

                    <td style={{ padding: "14px 16px" }}>
                      {app.isOfficialExcluded ? (
                        <span
                          className="dark-text-emerald-400"
                          style={{
                            color: "#059669",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                          }}
                        >
                          0 · Excluded
                        </span>
                      ) : (
                        <RiskBadge
                          level={app.riskLevel}
                          score={app.riskScore}
                        />
                      )}
                    </td>

                    <td
                      className="dark-text-slate-400"
                      style={{
                        padding: "14px 16px",
                        color: "#475569",
                        fontSize: "11px",
                      }}
                    >
                      {app.threatCategory}
                    </td>

                    <td style={{ padding: "14px 16px" }}>
                      <StatusBadge status={app.reviewStatus} />
                    </td>

                    <td style={{ padding: "14px 16px", textAlign: "right" }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAppFinding(app);
                          setAnalystNotes(app.reviewerNotes || "");
                          setDashboardTab("graph");
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
                        Inspect Evidence
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Side-by-Side Detailed Forensic Comparison Modal/Drawer */}
          </div>
  );
};
