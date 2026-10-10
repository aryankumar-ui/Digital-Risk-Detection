import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { RiskBadge, StatusBadge } from "../common/RiskBadge";
import { Search, Smartphone, Share2, ChevronRight } from "lucide-react";

export const ThreatFindingsView = () => {
  const {
    unifiedThreats,
    updateAppReviewStatus,
    updateSocialReviewStatus,
    setSelectedAppFinding,
    setSelectedSocialFinding,
    appFindings,
    socialFindings,
    setDashboardTab,
    brands,
    selectedBrandId,
    setSelectedBrandId,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [entityTypeFilter, setEntityTypeFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredThreats = unifiedThreats.filter((t) => {
    const matchesSearch =
      t.entityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.primaryReason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.platformOrStore.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = !selectedBrandId || t.brandId === selectedBrandId;
    const matchesType =
      entityTypeFilter === "all" || t.entityType === entityTypeFilter;
    const matchesRisk = riskFilter === "all" || t.riskLevel === riskFilter;
    const matchesStatus =
      statusFilter === "all" || t.reviewStatus === statusFilter;
    return (
      matchesSearch &&
      matchesBrand &&
      matchesType &&
      matchesRisk &&
      matchesStatus
    );
  });

  const criticalCount = unifiedThreats.filter(
    (t) => t.riskLevel === "critical",
  ).length;
  const highCount = unifiedThreats.filter((t) => t.riskLevel === "high").length;
  const pendingCount = unifiedThreats.filter(
    (t) => t.reviewStatus === "pending",
  ).length;
  const confirmedCount = unifiedThreats.filter(
    (t) => t.reviewStatus === "confirmed_threat",
  ).length;

  const handleInspect = (threat) => {
    if (threat.entityType === "mobile_app") {
      const app = appFindings.find((a) => a.id === threat.sourceFindingId);
      if (app) setSelectedAppFinding(app);
      setDashboardTab("apps");
    } else {
      const soc = socialFindings.find((s) => s.id === threat.sourceFindingId);
      if (soc) setSelectedSocialFinding(soc);
      setDashboardTab("social");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Top Header */}
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
          Unified Threat Findings
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
          Consolidated incident queue spanning detected mobile applications,
          counterfeit packages, and fraudulent social profiles.
        </p>
      </div>

      {/* Summary KPI Strip */}
      <div
        className="sm-grid-cols-4"
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
            Total Active Findings
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
            {unifiedThreats.length}
          </div>
          <div
            className="dark-text-slate-400"
            style={{ fontSize: "10px", color: "#64748b" }}
          >
            Aggregated queue
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
            Critical & High Threats
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
            {criticalCount + highCount}
          </div>
          <div style={{ fontSize: "10px", color: "#f43f5e" }}>
            Urgent severity
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
            Pending Review
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
            {pendingCount}
          </div>
          <div style={{ fontSize: "10px", color: "#f59e0b" }}>
            Awaiting determination
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
            Confirmed Threats
          </div>
          <div
            className="dark-text-indigo-400"
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
              color: "#4f46e5",
            }}
          >
            {confirmedCount}
          </div>
          <div
            className="dark-text-indigo-400"
            style={{ fontSize: "10px", color: "#818cf8" }}
          >
            Flagged for takedown
          </div>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
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
              placeholder="Search threat queue by entity name or reason..."
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
            value={entityTypeFilter}
            onChange={(e) => setEntityTypeFilter(e.target.value)}
            className="dark-bg-slate-800 dark-border-slate-700 dark-text-slate-300"
            style={{
              padding: 6,
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: 8,
              color: "#334155",
            }}
          >
            <option value="all">All Entity Types</option>
            <option value="mobile_app">Mobile Applications</option>
            <option value="social_profile">Social Profiles</option>
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
            <option value="legitimate">Legitimate</option>
            <option value="dismissed">Dismissed</option>
          </select>
        </div>
      </div>

      {/* Unified Table */}
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
                <th style={{ padding: "12px 16px" }}>Entity Identifier</th>
                <th style={{ padding: "12px 16px" }}>Entity Category</th>
                <th style={{ padding: "12px 16px" }}>Channel / Store</th>
                <th style={{ padding: "12px 16px" }}>Protected Brand</th>
                <th style={{ padding: "12px 16px" }}>Risk Level</th>
                <th style={{ padding: "12px 16px" }}>
                  Primary Forensic Reason
                </th>
                <th style={{ padding: "12px 16px" }}>Discovered</th>
                <th style={{ padding: "12px 16px" }}>Review Status</th>
                <th style={{ padding: "12px 16px", textAlign: "right" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="dark-divide-slate-800 divide-slate-100">
              {filteredThreats.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    style={{
                      padding: "32px 0",
                      textAlign: "center",
                      color: "#94a3b8",
                    }}
                  >
                    No threat findings match your filter settings.
                  </td>
                </tr>
              ) : (
                filteredThreats.map((threat) => (
                  <tr
                    key={threat.id}
                    className="hover-bg-slate-50-80 dark-hover-bg-slate-800-40 transition-colors cursor-pointer"
                    onClick={() => handleInspect(threat)}
                    style={{ borderBottom: "1px solid #f1f5f9" }}
                  >
                    <td
                      className="dark-text-white"
                      style={{
                        padding: "14px 16px",
                        fontWeight: 700,
                        color: "#0f172a",
                        maxWidth: 200,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {threat.entityName}
                    </td>

                    <td
                      className="dark-text-slate-300"
                      style={{ padding: "14px 16px", color: "#475569" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        {threat.entityType === "mobile_app" ? (
                          <>
                            <Smartphone
                              style={{
                                width: 14,
                                height: 14,
                                color: "#6366f1",
                              }}
                            />
                            <span>Mobile App</span>
                          </>
                        ) : (
                          <>
                            <Share2
                              style={{
                                width: 14,
                                height: 14,
                                color: "#6366f1",
                              }}
                            />
                            <span>Social Account</span>
                          </>
                        )}
                      </div>
                    </td>

                    <td
                      className="dark-text-slate-400"
                      style={{
                        padding: "14px 16px",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "11px",
                        color: "#64748b",
                      }}
                    >
                      {threat.platformOrStore}
                    </td>

                    <td
                      className="dark-text-slate-300"
                      style={{ padding: "14px 16px", color: "#334155" }}
                    >
                      {threat.brandName}
                    </td>

                    <td style={{ padding: "14px 16px" }}>
                      <RiskBadge
                        level={threat.riskLevel}
                        score={threat.riskScore}
                      />
                    </td>

                    <td
                      className="dark-text-slate-400"
                      style={{
                        padding: "14px 16px",
                        color: "#475569",
                        maxWidth: 320,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      title={threat.primaryReason}
                    >
                      {threat.primaryReason}
                    </td>

                    <td
                      className="dark-text-slate-400"
                      style={{
                        padding: "14px 16px",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "11px",
                        color: "#94a3b8",
                      }}
                    >
                      {threat.firstDetectedAt}
                    </td>

                    <td style={{ padding: "14px 16px" }}>
                      <StatusBadge status={threat.reviewStatus} />
                    </td>

                    <td style={{ padding: "14px 16px", textAlign: "right" }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInspect(threat);
                        }}
                        className="dark-text-indigo-400 hover-bg-indigo-50 dark-hover-bg-indigo-950-40 transition-colors cursor-pointer"
                        style={{
                          padding: "4px 10px",
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "#4f46e5",
                          backgroundColor: "transparent",
                          borderRadius: 4,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          border: "none",
                        }}
                      >
                        <span>Examine</span>
                        <ChevronRight style={{ width: 12, height: 12 }} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
