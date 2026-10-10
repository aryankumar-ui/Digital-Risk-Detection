import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Activity, Play, CheckCircle2, AlertTriangle } from "lucide-react";

export const ScanActivityView = () => {
  const {
    scanRuns,
    isScanning,
    scanProgress,
    scanStepText,
    triggerScan,
    selectedBrandId,
    brands,
  } = useApp();
  const [selectedScan, setSelectedScan] = useState(scanRuns[0]);

  const selectedBrand =
    brands.find((b) => b.id === selectedBrandId) || brands[0];

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
            Scan Activity & Engine Telemetry
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
            Historical connector execution runs, candidate harvesting yields,
            and whitelisted asset exclusions.
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
            {isScanning ? "Scan in Progress..." : "Launch On-Demand Scan"}
          </span>
        </button>
      </div>

      {/* Live Scan Execution Simulator Panel */}
      {isScanning && (
        <div
          className="fade-in dark-bg-indigo-950-40 dark-border-indigo-900-60"
          style={{
            padding: 20,
            backgroundColor: "rgba(238, 242, 255, 0.7)",
            border: "1px solid #c7d2fe",
            borderRadius: 12,
            display: "flex",
            flexDirection: "column",
            gap: 12,
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
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: "#4f46e5",
                  animation: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
                }}
              />
              <span
                className="dark-text-indigo-200"
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#1e1b4b",
                }}
              >
                Active Connector Pipeline Execution
              </span>
            </div>
            <span
              className="dark-text-indigo-400"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#4f46e5",
              }}
            >
              {scanProgress}%
            </span>
          </div>

          <div
            className="dark-bg-indigo-900-50"
            style={{
              height: 8,
              width: "100%",
              backgroundColor: "rgba(199, 210, 254, 0.5)",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                backgroundColor: "#4f46e5",
                borderRadius: 4,
                transition: "all 300ms ease-in-out",
                width: `${scanProgress}%`,
              }}
            />
          </div>

          <div
            className="dark-text-indigo-300"
            style={{
              fontSize: "0.75rem",
              fontFamily: "'JetBrains Mono', monospace",
              color: "#312e81",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Activity
              style={{
                width: 14,
                height: 14,
                animation: "spin 1s linear infinite",
              }}
            />
            <span>{scanStepText}</span>
          </div>
        </div>
      )}

      {/* Main Grid: Scan History Table + Inspector */}
      <div
        className="lg-grid-cols-12"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
          gap: 24,
        }}
      >
        {/* Left: Scan Runs Table */}
        <div
          className="lg-col-span-7 dark-bg-slate-900 dark-border-slate-800"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          }}
        >
          <div
            className="dark-border-slate-800 dark-text-white"
            style={{
              padding: 16,
              borderBottom: "1px solid #f1f5f9",
              fontWeight: 600,
              fontSize: "0.75rem",
              color: "#0f172a",
            }}
          >
            Execution History ({scanRuns.length} Runs Logged)
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
                  <th style={{ padding: "12px 12px" }}>Scan Run ID</th>
                  <th style={{ padding: "12px 12px" }}>Type</th>
                  <th style={{ padding: "12px 12px" }}>Brand</th>
                  <th style={{ padding: "12px 12px" }}>Candidates</th>
                  <th style={{ padding: "12px 12px" }}>Findings</th>
                  <th style={{ padding: "12px 12px" }}>Status</th>
                </tr>
              </thead>
              <tbody className="dark-divide-slate-800 divide-slate-100">
                {scanRuns.map((run) => (
                  <tr
                    key={run.id}
                    onClick={() => setSelectedScan(run)}
                    className={`hover-bg-slate-50-80 dark-hover-bg-slate-800-40 cursor-pointer transition-colors ${
                      selectedScan?.id === run.id
                        ? "dark-bg-indigo-950-20 bg-indigo-50-40"
                        : ""
                    }`}
                    style={{
                      borderBottom: "1px solid #f1f5f9",
                      backgroundColor:
                        selectedScan?.id === run.id
                          ? "rgba(238, 242, 255, 0.4)"
                          : "transparent",
                    }}
                  >
                    <td
                      className="dark-text-white"
                      style={{
                        padding: "12px 12px",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontWeight: 600,
                        color: "#0f172a",
                      }}
                    >
                      {run.id}
                    </td>
                    <td
                      className="dark-text-slate-300"
                      style={{ padding: "12px 12px", color: "#334155" }}
                    >
                      {run.scanType}
                    </td>
                    <td style={{ padding: "12px 12px", color: "#64748b" }}>
                      {run.brandName}
                    </td>
                    <td
                      className="dark-text-slate-300 tabular-nums"
                      style={{
                        padding: "12px 12px",
                        fontFamily: "'JetBrains Mono', monospace",
                        color: "#334155",
                      }}
                    >
                      {run.candidatesProcessed}
                    </td>
                    <td
                      className="dark-text-rose-400 tabular-nums"
                      style={{
                        padding: "12px 12px",
                        fontFamily: "'JetBrains Mono', monospace",
                        color: "#e11d48",
                        fontWeight: 700,
                      }}
                    >
                      {run.findingsCreated}
                    </td>
                    <td style={{ padding: "12px 12px" }}>
                      <span
                        className="dark-text-emerald-400"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          fontSize: "11px",
                          fontWeight: 500,
                          color: "#059669",
                        }}
                      >
                        <CheckCircle2 style={{ width: 12, height: 12 }} />
                        <span>Completed</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Selected Scan Inspector */}
        <div
          className="lg-col-span-5 dark-bg-slate-900 dark-border-slate-800"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 20,
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            fontSize: "0.75rem",
          }}
        >
          {selectedScan ? (
            <>
              <div
                className="dark-border-slate-800"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: 12,
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                <div>
                  <span
                    className="dark-text-indigo-400"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "10px",
                      color: "#4f46e5",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    Scan Telemetry Inspector
                  </span>
                  <h3
                    className="dark-text-white"
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "#0f172a",
                      marginTop: 2,
                      margin: 0,
                    }}
                  >
                    {selectedScan.id}
                  </h3>
                </div>
                <span
                  className="dark-bg-emerald-950-50 dark-text-emerald-400"
                  style={{
                    fontSize: "11px",
                    backgroundColor: "#ecfdf5",
                    color: "#059669",
                    padding: "2px 8px",
                    borderRadius: 4,
                    fontWeight: 500,
                  }}
                >
                  {selectedScan.status.toUpperCase()}
                </span>
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
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
                    className="dark-text-white"
                    style={{ fontWeight: 600, color: "#0f172a" }}
                  >
                    {selectedScan.brandName}
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
                    Execution Mode:
                  </span>
                  <span
                    className="dark-text-slate-200"
                    style={{ fontWeight: 500, color: "#1e293b" }}
                  >
                    {selectedScan.scanType}
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
                    Execution Duration:
                  </span>
                  <span
                    className="dark-text-slate-200"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: "#1e293b",
                    }}
                  >
                    {selectedScan.durationSeconds || 45} seconds
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
                    Candidates Inspected:
                  </span>
                  <span
                    className="dark-text-white"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 700,
                      color: "#0f172a",
                    }}
                  >
                    {selectedScan.candidatesProcessed} listings
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
                    Official Assets Auto-Excluded:
                  </span>
                  <span
                    className="dark-text-emerald-400"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: "#059669",
                      fontWeight: 600,
                    }}
                  >
                    {selectedScan.officialAssetsExcluded} packages
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
                    Suspicious Signals Created:
                  </span>
                  <span
                    className="dark-text-rose-400"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: "#e11d48",
                      fontWeight: 700,
                    }}
                  >
                    {selectedScan.findingsCreated} items
                  </span>
                </div>
              </div>

              {/* Data Sources Responded */}
              <div
                className="dark-border-slate-800"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  paddingTop: 8,
                  borderTop: "1px solid #f1f5f9",
                }}
              >
                <span
                  className="dark-text-slate-400"
                  style={{
                    color: "#94a3b8",
                    fontSize: "11px",
                    fontWeight: 600,
                    display: "block",
                  }}
                >
                  Active Connector Feeds Responded:
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {selectedScan.dataSources.map((ds) => (
                    <span
                      key={ds}
                      className="dark-bg-slate-800 dark-text-slate-300"
                      style={{
                        padding: "2px 8px",
                        borderRadius: 4,
                        backgroundColor: "#f1f5f9",
                        fontSize: "11px",
                        color: "#334155",
                      }}
                    >
                      {ds}
                    </span>
                  ))}
                </div>
              </div>

              {/* Search Patterns */}
              <div
                className="dark-border-slate-800"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  paddingTop: 8,
                  borderTop: "1px solid #f1f5f9",
                }}
              >
                <span
                  className="dark-text-slate-400"
                  style={{
                    color: "#94a3b8",
                    fontSize: "11px",
                    fontWeight: 600,
                    display: "block",
                  }}
                >
                  Search Query Patterns Ingested:
                </span>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 4 }}
                >
                  {selectedScan.searchQueries.map((q, i) => (
                    <div
                      key={i}
                      className="dark-bg-slate-800 dark-text-slate-400"
                      style={{
                        padding: 6,
                        backgroundColor: "#f8fafc",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "11px",
                        borderRadius: 4,
                        color: "#475569",
                      }}
                    >
                      {q}
                    </div>
                  ))}
                </div>
              </div>

              {/* Errors or Notices if any */}
              {selectedScan.errorsReported && (
                <div
                  className="dark-bg-amber-950-40 dark-border-amber-900-60 dark-text-amber-300"
                  style={{
                    padding: 12,
                    backgroundColor: "#fffbeb",
                    border: "1px solid #fde68a",
                    borderRadius: 8,
                    color: "#92400e",
                    fontSize: "11px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 8,
                  }}
                >
                  <AlertTriangle
                    style={{
                      width: 16,
                      height: 16,
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  />
                  <span>{selectedScan.errorsReported[0]}</span>
                </div>
              )}
            </>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "40px 0",
                color: "#94a3b8",
              }}
            >
              Select a scan run to view deep telemetry.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
