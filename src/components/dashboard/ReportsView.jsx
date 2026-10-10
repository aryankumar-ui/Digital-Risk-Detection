import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { RiskBadge } from "../common/RiskBadge";
import { Download, Copy, Plus, CheckCircle2 } from "lucide-react";

export const ReportsView = () => {
  const {
    reports,
    selectedReport,
    setSelectedReport,
    generateReport,
    brands,
    selectedBrandId,
    showToast,
    theme,
  } = useApp();

  const [generatingForBrand, setGeneratingForBrand] = useState(
    selectedBrandId || "brand-novapay",
  );
  const [reportType, setReportType] = useState("Brand Comprehensive");

  const handleCreateReport = () => {
    const rep = generateReport(generatingForBrand, reportType);
    setSelectedReport(rep);
  };

  const handleCopySummary = () => {
    if (!selectedReport) return;
    navigator.clipboard.writeText(selectedReport.summary);
    showToast("Executive summary copied to clipboard.", "success");
  };

  const handleDownloadPDF = () => {
    showToast(
      "Generating signed PDF report bundle: " +
        (selectedReport?.id || "Report") +
        ".pdf",
      "success",
    );
  };

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
            Investigation Reports & Forensic Dossiers
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
            Export comprehensive evidence packages for platform abuse desks,
            legal counsel, and security executives.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={handleCopySummary}
            className="dark-bg-slate-800 dark-border-slate-700 dark-text-slate-200 hover-bg-slate-50 cursor-pointer transition-colors"
            style={{
              padding: "8px 12px",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#334155",
              backgroundColor: "#ffffff",
              border: "1px solid #cbd5e1",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Copy style={{ width: 14, height: 14 }} />
            <span>Copy Summary</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            className="hover-bg-indigo-500 cursor-pointer transition-colors hover-shadow"
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
            }}
          >
            <Download style={{ width: 14, height: 14 }} />
            <span>Download PDF Dossier</span>
          </button>
        </div>
      </div>

      {/* Generator Tool Strip */}
      <div
        className="dark-bg-slate-900 dark-border-slate-800"
        style={{
          padding: 16,
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
            gap: 12,
          }}
        >
          <span
            className="dark-text-white"
            style={{ fontWeight: 600, color: "#0f172a" }}
          >
            Generate Dossier:
          </span>

          <select
            value={generatingForBrand}
            onChange={(e) => setGeneratingForBrand(e.target.value)}
            className="dark-bg-slate-800 dark-border-slate-700 dark-text-white"
            style={{
              padding: 6,
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: 8,
              color: "#0f172a",
            }}
          >
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                Brand: {b.name}
              </option>
            ))}
          </select>

          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="dark-bg-slate-800 dark-border-slate-700 dark-text-white"
            style={{
              padding: 6,
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: 8,
              color: "#0f172a",
            }}
          >
            <option value="Brand Comprehensive">
              Brand Comprehensive Dossier
            </option>
            <option value="Mobile App Investigation">
              Mobile App Investigation Dossier
            </option>
            <option value="Social Profile Incident">
              Social Profile Incident Dossier
            </option>
          </select>
        </div>

        <button
          onClick={handleCreateReport}
          className="dark-bg-slate-100 dark-text-slate-900 hover-opacity-90 cursor-pointer transition-opacity"
          style={{
            padding: "6px 14px",
            backgroundColor: "#0f172a",
            color: "#ffffff",
            fontWeight: 600,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            gap: 6,
            border: "none",
          }}
        >
          <Plus style={{ width: 14, height: 14 }} />
          <span>Synthesize New Report</span>
        </button>
      </div>

      {/* Report Layout View */}
      <div
        className="lg-grid-cols-12"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
          gap: 24,
        }}
      >
        {/* Reports Index Column */}
        <div
          className="lg-col-span-4"
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          <div
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#94a3b8",
              marginBottom: 8,
            }}
          >
            Generated Reports ({reports.length})
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {reports.map((rep) => (
              <div
                key={rep.id}
                onClick={() => setSelectedReport(rep)}
                className={`cursor-pointer transition-colors ${
                  selectedReport?.id === rep.id
                    ? "dark-bg-indigo-950-40 dark-border-indigo-800"
                    : "dark-bg-slate-900 dark-border-slate-800 hover-border-slate-300"
                }`}
                style={{
                  padding: 12,
                  borderRadius: 12,
                  border:
                    selectedReport?.id === rep.id
                      ? "1px solid #a5b4fc"
                      : "1px solid #e2e8f0",
                  textAlign: "left",
                  backgroundColor:
                    selectedReport?.id === rep.id
                      ? theme === "dark" ? "#1e1b4b" : "#eef2ff"
                      : theme === "dark" ? "#0f172a" : "#ffffff",
                  boxShadow:
                    selectedReport?.id === rep.id
                      ? "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
                      : "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "10px",
                    color: "#94a3b8",
                  }}
                >
                  <span
                    className="dark-text-slate-200"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 700,
                      color: "#1e293b",
                    }}
                  >
                    {rep.id}
                  </span>
                  <span>{rep.generatedAt}</span>
                </div>
                <div
                  className="dark-text-white line-clamp-1"
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "#0f172a",
                    marginTop: 4,
                  }}
                >
                  {rep.title}
                </div>
                <div
                  className="dark-border-slate-800-80"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 8,
                    paddingTop: 8,
                    borderTop: "1px solid #f1f5f9",
                    fontSize: "11px",
                  }}
                >
                  <span style={{ color: "#64748b" }}>{rep.brandName}</span>
                  <RiskBadge level={rep.severity} score={rep.riskScore} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Report Document Preview (Styled like a formal cybersecurity intelligence briefing) */}
        <div
          className="lg-col-span-8 dark-bg-slate-900 dark-border-slate-800 dark-text-slate-200 sm-p-8"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 16,
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 24,
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            fontSize: "0.75rem",
            color: "#1e293b",
          }}
        >
          {selectedReport ? (
            <>
              {/* Report Header */}
              <div
                className="dark-border-slate-800"
                style={{
                  borderBottom: "1px solid #e2e8f0",
                  paddingBottom: 20,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
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
                    className="dark-text-indigo-400"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "10px",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      color: "#4f46e5",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Digital Risk Incident Dossier · Confidential
                  </span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.75rem",
                      color: "#94a3b8",
                    }}
                  >
                    {selectedReport.id}
                  </span>
                </div>

                <h2
                  className="sm-text-xl dark-text-white"
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    color: "#0f172a",
                    margin: 0,
                  }}
                >
                  {selectedReport.title}
                </h2>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: 16,
                    fontSize: "11px",
                    color: "#64748b",
                    paddingTop: 4,
                  }}
                >
                  <div>
                    <strong style={{ color: "inherit" }}>Target Brand:</strong>{" "}
                    {selectedReport.brandName}
                  </div>
                  <div>
                    <strong style={{ color: "inherit" }}>
                      Classification:
                    </strong>{" "}
                    {selectedReport.entityType}
                  </div>
                  <div>
                    <strong style={{ color: "inherit" }}>Generated:</strong>{" "}
                    {selectedReport.generatedAt}
                  </div>
                </div>
              </div>

              {/* Executive Summary */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <h3
                  className="dark-text-white"
                  style={{
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "#0f172a",
                    margin: 0,
                  }}
                >
                  1. Executive Summary
                </h3>
                <p
                  className="dark-bg-slate-800-50 dark-border-slate-800 dark-text-slate-300"
                  style={{
                    padding: 16,
                    backgroundColor: "#f8fafc",
                    border: "1px solid #f1f5f9",
                    borderRadius: 12,
                    lineHeight: 1.625,
                    color: "#334155",
                    margin: 0,
                  }}
                >
                  {selectedReport.summary}
                </p>
              </div>

              {/* Forensic Evidence Table */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <h3
                  className="dark-text-white"
                  style={{
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "#0f172a",
                    margin: 0,
                  }}
                >
                  2. Forensic Evidence Decomposition
                </h3>
                <div
                  className="dark-border-slate-800"
                  style={{
                    border: "1px solid #e2e8f0",
                    borderRadius: 12,
                    overflow: "hidden",
                  }}
                >
                  <table
                    style={{
                      width: "100%",
                      textAlign: "left",
                      fontSize: "0.75rem",
                      borderCollapse: "collapse",
                    }}
                  >
                    <thead>
                      <tr
                        className="dark-bg-slate-800-90 dark-border-slate-700 dark-text-slate-100"
                        style={{
                          backgroundColor: "#f1f5f9",
                          borderBottom: "1px solid #e2e8f0",
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "#1e293b",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        <th style={{ padding: "10px 12px" }}>Asset Category</th>
                        <th style={{ padding: "10px 12px" }}>
                          Observed Discrepancy Signal
                        </th>
                        <th
                          style={{ padding: "10px 12px", textAlign: "right" }}
                        >
                          Severity
                        </th>
                      </tr>
                    </thead>
                    <tbody className="dark-divide-slate-800 divide-slate-100">
                      {selectedReport.evidenceItems.map((item, i) => (
                        <tr
                          key={i}
                          style={{ borderBottom: "1px solid #f1f5f9" }}
                        >
                          <td
                            className="dark-text-white"
                            style={{
                              padding: "10px 12px",
                              fontWeight: 500,
                              color: "#0f172a",
                            }}
                          >
                            {item.category}
                          </td>
                          <td
                            className="dark-text-slate-300"
                            style={{ padding: "10px 12px", color: "#475569" }}
                          >
                            {item.signal}
                          </td>
                          <td
                            className="dark-text-rose-400"
                            style={{
                              padding: "10px 12px",
                              textAlign: "right",
                              fontWeight: 600,
                              color: "#e11d48",
                            }}
                          >
                            {item.severity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recommended Remediation Steps */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <h3
                  className="dark-text-white"
                  style={{
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "#0f172a",
                    margin: 0,
                  }}
                >
                  3. Recommended Legal & Operational Remediation
                </h3>
                <ul
                  style={{
                    listStyleType: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  {selectedReport.recommendedActions.map((action, i) => (
                    <li
                      key={i}
                      className="dark-bg-slate-800-40 dark-border-slate-800"
                      style={{
                        padding: 12,
                        backgroundColor: "#f8fafc",
                        border: "1px solid #f1f5f9",
                        borderRadius: 8,
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                      }}
                    >
                      <CheckCircle2
                        className="dark-text-indigo-400"
                        style={{
                          width: 16,
                          height: 16,
                          color: "#4f46e5",
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      />
                      <span
                        className="dark-text-slate-300"
                        style={{ color: "#334155", lineHeight: 1.625 }}
                      >
                        {action}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Data Limitations Disclaimer */}
              <div
                className="dark-bg-slate-800-60 dark-border-slate-700-60"
                style={{
                  padding: 14,
                  backgroundColor: "#f8fafc",
                  borderRadius: 12,
                  border: "1px solid rgba(226, 232, 240, 0.6)",
                  fontSize: "11px",
                  color: "#64748b",
                  lineHeight: 1.625,
                }}
              >
                <strong style={{ color: "inherit" }}>
                  Methodology & Evidentiary Standard:
                </strong>{" "}
                Findings in this dossier reflect statistical similarity scoring,
                perceptual hashing, and package namespace comparisons against
                official verified assets. Discrepancy signals warrant
                investigative scrutiny but must be paired with appropriate
                organizational determination prior to formal takedown filing.
              </div>
            </>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "48px 0",
                color: "#94a3b8",
              }}
            >
              Select or generate a report to view evidence briefing.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
