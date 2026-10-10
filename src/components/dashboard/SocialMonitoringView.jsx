import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { RiskBadge, StatusBadge } from "../common/RiskBadge";
import { SimilarityBar } from "../common/SimilarityBar";
import { Search, ExternalLink, Play, X } from "lucide-react";

export const SocialMonitoringView = () => {
  const {
    socialFindings,
    updateSocialReviewStatus,
    selectedSocialFinding,
    setSelectedSocialFinding,
    setDashboardTab,
    brands,
    selectedBrandId,
    setSelectedBrandId,
    triggerScan,
    isScanning,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [reviewerNotesInput, setReviewerNotesInput] = useState("");

  const filteredFindings = socialFindings.filter((item) => {
    const matchesSearch =
      item.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = !selectedBrandId || item.brandId === selectedBrandId;
    const matchesPlatform =
      platformFilter === "all" || item.platform === platformFilter;
    const matchesRisk = riskFilter === "all" || item.riskLevel === riskFilter;
    const matchesStatus =
      statusFilter === "all" || item.reviewStatus === statusFilter;
    return (
      matchesSearch &&
      matchesBrand &&
      matchesPlatform &&
      matchesRisk &&
      matchesStatus
    );
  });

  const profilesChecked = socialFindings.length > 0 ? socialFindings.length * 15 : 0;
  const potentialImpersonations = socialFindings.filter(
    (s) => s.threatCategory === "Potential Impersonation",
  ).length;
  const highRiskProfiles = socialFindings.filter(
    (s) => s.riskLevel === "critical" || s.riskLevel === "high",
  ).length;
  const awaitingReview = socialFindings.filter(
    (s) => s.reviewStatus === "pending",
  ).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Page Title & Scan Action */}
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
            Social Media Monitoring
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
            Identify profiles and company pages that may be imitating a
            protected brand identity.
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
          <span>
            {isScanning ? "Scanning Feeds..." : "Scan Social Sources"}
          </span>
        </button>
      </div>

      {/* Summary KPI Cards */}
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
            Profiles Checked
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
            {profilesChecked.toLocaleString()}
          </div>
          <div
            className="dark-text-slate-400"
            style={{ fontSize: "10px", color: "#64748b" }}
          >
            Continuous sampling
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
            Potential Impersonations
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
            {potentialImpersonations}
          </div>
          <div style={{ fontSize: "10px", color: "#f43f5e" }}>
            Trademark resemblance
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
            High-Risk Profiles
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
            {highRiskProfiles}
          </div>
          <div style={{ fontSize: "10px", color: "#f59e0b" }}>
            Phishing & fake support
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
            Awaiting Review
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
            {awaitingReview}
          </div>
          <div
            className="dark-text-indigo-400"
            style={{ fontSize: "10px", color: "#818cf8" }}
          >
            Pending analyst triage
          </div>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
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
              placeholder="Search by handle, profile name or bio keyword..."
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

          {/* Brand Selector */}
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

          {/* Platform Filter */}
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="dark-bg-slate-800 dark-border-slate-700 dark-text-slate-300"
            style={{
              padding: 6,
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: 8,
              color: "#334155",
            }}
          >
            <option value="all">All Platforms</option>
            <option value="instagram">Instagram</option>
            <option value="x">X / Twitter</option>
            <option value="linkedin">LinkedIn</option>
            <option value="facebook">Facebook</option>
          </select>

          {/* Risk Level Filter */}
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

        {/* Review Status Filter */}
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

      {/* Social Findings Table */}
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
                <th style={{ padding: "12px 16px" }}>Candidate Profile</th>
                <th style={{ padding: "12px 16px" }}>Platform</th>
                <th style={{ padding: "12px 16px" }}>Protected Brand</th>
                <th style={{ padding: "12px 16px" }}>Name Match</th>
                <th style={{ padding: "12px 16px" }}>Logo Match</th>
                <th style={{ padding: "12px 16px" }}>Risk Assessment</th>
                <th style={{ padding: "12px 16px" }}>Category</th>
                <th style={{ padding: "12px 16px" }}>Review Status</th>
                <th style={{ padding: "12px 16px", textAlign: "right" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="dark-divide-slate-800 divide-slate-100">
              {filteredFindings.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    style={{
                      padding: "32px 0",
                      textAlign: "center",
                      color: "#94a3b8",
                    }}
                  >
                    No social profiles match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredFindings.map((finding) => (
                  <tr
                    key={finding.id}
                    className="hover-bg-slate-50-80 dark-hover-bg-slate-800-40 transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedSocialFinding(finding);
                      setReviewerNotesInput(finding.reviewerNotes || "");
                      setDashboardTab("graph");
                    }}
                    style={{ borderBottom: "1px solid #f1f5f9" }}
                  >
                    <td style={{ padding: "14px 16px" }}>
                      <div>
                        <div
                          className="dark-text-white"
                          style={{
                            fontWeight: 600,
                            color: "#0f172a",
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <span>{finding.handle}</span>
                        </div>
                        <div
                          className="dark-text-slate-400 truncate"
                          style={{
                            fontSize: "11px",
                            color: "#64748b",
                            maxWidth: 320,
                          }}
                        >
                          {finding.displayName}
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
                        textTransform: "uppercase",
                      }}
                    >
                      {finding.platform}
                    </td>

                    <td
                      className="dark-text-slate-300"
                      style={{ padding: "14px 16px", color: "#334155" }}
                    >
                      {finding.brandName}
                    </td>

                    <td
                      className="dark-text-slate-200 tabular-nums"
                      style={{
                        padding: "14px 16px",
                        fontFamily: "'JetBrains Mono', monospace",
                        color: "#1e293b",
                      }}
                    >
                      {finding.nameSimilarity}%
                    </td>

                    <td
                      className="dark-text-slate-200 tabular-nums"
                      style={{
                        padding: "14px 16px",
                        fontFamily: "'JetBrains Mono', monospace",
                        color: "#1e293b",
                      }}
                    >
                      {finding.logoSimilarity}%
                    </td>

                    <td style={{ padding: "14px 16px" }}>
                      <RiskBadge
                        level={finding.riskLevel}
                        score={finding.riskScore}
                      />
                    </td>

                    <td
                      className="dark-text-slate-400"
                      style={{
                        padding: "14px 16px",
                        color: "#475569",
                        fontSize: "11px",
                      }}
                    >
                      {finding.threatCategory}
                    </td>

                    <td style={{ padding: "14px 16px" }}>
                      <StatusBadge status={finding.reviewStatus} />
                    </td>

                    <td style={{ padding: "14px 16px", textAlign: "right" }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSocialFinding(finding);
                          setReviewerNotesInput(finding.reviewerNotes || "");
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
                        Inspect Dossier
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Drawer / Inspection Modal for Selected Social Finding */}
      {selectedSocialFinding && (
        <div
          className="fade-in dark-bg-slate-900-60"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            className="dark-bg-slate-900 dark-border-slate-800 dark-text-white"
            style={{
              width: "100%",
              maxWidth: "36rem",
              height: "100%",
              backgroundColor: "#ffffff",
              borderLeft: "1px solid #e2e8f0",
              boxShadow: "-25px 0 50px -12px rgba(0, 0, 0, 0.25)",
              padding: 24,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 24,
              color: "#0f172a",
            }}
          >
            {/* Header */}
            <div
              className="dark-border-slate-800"
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                paddingBottom: 16,
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    className="dark-bg-indigo-950-60 dark-text-indigo-400"
                    style={{
                      fontSize: "0.75rem",
                      fontFamily: "'JetBrains Mono', monospace",
                      textTransform: "uppercase",
                      backgroundColor: "#eef2ff",
                      color: "#4f46e5",
                      padding: "2px 8px",
                      borderRadius: 4,
                    }}
                  >
                    {selectedSocialFinding.platform}
                  </span>
                  <RiskBadge
                    level={selectedSocialFinding.riskLevel}
                    score={selectedSocialFinding.riskScore}
                  />
                </div>
                <h3
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    marginTop: 6,
                    margin: 0,
                  }}
                >
                  {selectedSocialFinding.handle}
                </h3>
                <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                  {selectedSocialFinding.displayName}
                </div>
              </div>

              <button
                onClick={() => setSelectedSocialFinding(null)}
                className="dark-hover-text-slate-200 cursor-pointer"
                style={{
                  padding: 4,
                  color: "#94a3b8",
                  background: "none",
                  border: "none",
                }}
              >
                <X style={{ width: 20, height: 20 }} />
              </button>
            </div>

            {/* Profile URL & Target Brand */}
            <div
              className="dark-bg-slate-800-60"
              style={{
                padding: 12,
                backgroundColor: "#f8fafc",
                borderRadius: 12,
                display: "flex",
                flexDirection: "column",
                gap: 8,
                fontSize: "0.75rem",
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
                  style={{ color: "#94a3b8" }}
                >
                  Target Protected Brand:
                </span>
                <span
                  className="dark-text-indigo-400"
                  style={{ fontWeight: 600, color: "#4f46e5" }}
                >
                  {selectedSocialFinding.brandName}
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
                  style={{ color: "#94a3b8" }}
                >
                  Live Profile Link:
                </span>
                <a
                  href={selectedSocialFinding.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="dark-text-indigo-400 hover-underline"
                  style={{
                    color: "#4f46e5",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                    textDecoration: "none",
                  }}
                >
                  <span>Open Platform Profile</span>
                  <ExternalLink style={{ width: 12, height: 12 }} />
                </a>
              </div>
            </div>

            {/* Bio Content & Suspicious Links */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                fontSize: "0.75rem",
              }}
            >
              <div
                className="dark-text-slate-200"
                style={{ fontWeight: 600, color: "#1e293b" }}
              >
                Public Bio Text
              </div>
              <p
                className="dark-bg-slate-800-40 dark-border-slate-800 dark-text-slate-300"
                style={{
                  padding: 12,
                  backgroundColor: "#f8fafc",
                  border: "1px solid #f1f5f9",
                  borderRadius: 8,
                  color: "#334155",
                  fontStyle: "italic",
                  margin: 0,
                }}
              >
                "{selectedSocialFinding.bio}"
              </p>

              {selectedSocialFinding.externalLinks.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    paddingTop: 4,
                  }}
                >
                  <span
                    className="dark-text-rose-400"
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#e11d48",
                    }}
                  >
                    Flagged External Endpoints Detected:
                  </span>
                  {selectedSocialFinding.externalLinks.map((link) => (
                    <div
                      key={link}
                      className="dark-bg-rose-950-30 dark-border-rose-900-40 dark-text-rose-300"
                      style={{
                        padding: 8,
                        backgroundColor: "#fff1f2",
                        border: "1px solid #fecdd3",
                        borderRadius: 4,
                        color: "#881337",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "11px",
                        wordBreak: "break-all",
                      }}
                    >
                      {link}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Similarity Signal Meters */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                paddingTop: 8,
              }}
            >
              <div
                className="dark-text-slate-200"
                style={{
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  color: "#1e293b",
                }}
              >
                Bi-Directional Identity Comparison
              </div>
              <SimilarityBar
                label="Name Similarity to Verified Brand"
                percentage={selectedSocialFinding.nameSimilarity}
              />
              <SimilarityBar
                label="Logo Perceptual Hash Alignment"
                percentage={selectedSocialFinding.logoSimilarity}
              />
            </div>

            {/* Detection Reason & Supporting Evidence */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                fontSize: "0.75rem",
              }}
            >
              <div
                className="dark-text-slate-200"
                style={{ fontWeight: 600, color: "#1e293b" }}
              >
                Explainable Assessment
              </div>
              <p
                className="dark-text-slate-300"
                style={{ color: "#475569", lineHeight: 1.625, margin: 0 }}
              >
                {selectedSocialFinding.detectionReason}
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  paddingTop: 8,
                }}
              >
                <span
                  className="dark-text-slate-400"
                  style={{
                    fontSize: "11px",
                    fontWeight: 500,
                    color: "#94a3b8",
                  }}
                >
                  Forensic Indicators:
                </span>
                <ul
                  className="dark-text-slate-400"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    color: "#475569",
                    listStyleType: "none",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {selectedSocialFinding.supportingEvidence.map((ev, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 8,
                      }}
                    >
                      <span style={{ color: "#6366f1", fontWeight: 700 }}>
                        ·
                      </span>
                      <span>{ev}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Review Status & Analyst Notes */}
            <div
              className="dark-border-slate-800"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                paddingTop: 16,
                borderTop: "1px solid #f1f5f9",
                fontSize: "0.75rem",
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
                  className="dark-text-slate-200"
                  style={{ fontWeight: 600, color: "#1e293b" }}
                >
                  Current Review Decision:
                </span>
                <StatusBadge status={selectedSocialFinding.reviewStatus} />
              </div>

              <div>
                <label
                  className="dark-text-slate-400"
                  style={{
                    display: "block",
                    fontSize: "11px",
                    color: "#94a3b8",
                    marginBottom: 4,
                  }}
                >
                  Analyst Investigation Notes:
                </label>
                <textarea
                  rows={2}
                  value={reviewerNotesInput}
                  onChange={(e) => setReviewerNotesInput(e.target.value)}
                  placeholder="Record case notes, escalation tickets, or DMCA submission IDs..."
                  className="dark-bg-slate-800 dark-border-slate-700 dark-text-slate-100"
                  style={{
                    width: "100%",
                    padding: 8,
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: 8,
                    color: "#0f172a",
                    resize: "vertical",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Review Decision Buttons */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: 8,
                  paddingTop: 8,
                }}
              >
                <button
                  onClick={() =>
                    updateSocialReviewStatus(
                      selectedSocialFinding.id,
                      "confirmed_threat",
                      reviewerNotesInput,
                    )
                  }
                  className="hover-bg-rose-500 cursor-pointer"
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#e11d48",
                    color: "#ffffff",
                    fontWeight: 600,
                    borderRadius: 8,
                    fontSize: "0.75rem",
                    border: "none",
                  }}
                >
                  Confirm Threat
                </button>
                <button
                  onClick={() =>
                    updateSocialReviewStatus(
                      selectedSocialFinding.id,
                      "legitimate",
                      reviewerNotesInput,
                    )
                  }
                  className="hover-bg-emerald-500 cursor-pointer"
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#059669",
                    color: "#ffffff",
                    fontWeight: 600,
                    borderRadius: 8,
                    fontSize: "0.75rem",
                    border: "none",
                  }}
                >
                  Mark as Legitimate
                </button>
                <button
                  onClick={() =>
                    updateSocialReviewStatus(
                      selectedSocialFinding.id,
                      "investigating",
                      reviewerNotesInput,
                    )
                  }
                  className="dark-bg-slate-800 dark-hover-bg-slate-700 dark-text-slate-200 hover-bg-slate-200 cursor-pointer"
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#f1f5f9",
                    color: "#1e293b",
                    fontWeight: 500,
                    borderRadius: 8,
                    fontSize: "0.75rem",
                    border: "none",
                  }}
                >
                  Escalate for Review
                </button>
                <button
                  onClick={() =>
                    updateSocialReviewStatus(
                      selectedSocialFinding.id,
                      "dismissed",
                      reviewerNotesInput,
                    )
                  }
                  className="dark-bg-slate-800 dark-hover-bg-slate-700 hover-bg-slate-200 cursor-pointer"
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#f1f5f9",
                    color: "#64748b",
                    borderRadius: 8,
                    fontSize: "0.75rem",
                    border: "none",
                  }}
                >
                  Dismiss Finding
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
