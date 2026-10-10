import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Database, Clock, Sliders, Users, Save } from "lucide-react";

export const SettingsView = () => {
  const { user, showToast } = useApp();

  const [scanCadence, setScanCadence] = useState("24h");
  const [criticalThreshold, setCriticalThreshold] = useState(85);
  const [highThreshold, setHighThreshold] = useState(70);
  const [alertEmail, setAlertEmail] = useState(true);
  const [alertCriticalOnly, setAlertCriticalOnly] = useState(false);
  const [autoExcludeWhitelisted, setAutoExcludeWhitelisted] = useState(true);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    showToast("Workspace settings saved successfully.", "success");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        width: "100%",
        fontSize: "0.75rem",
      }}
    >
      {/* Header */}
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
          Workspace Settings & Integrations
        </h1>
        <p
          className="dark-text-slate-400"
          style={{ color: "#64748b", marginTop: 4, margin: 0 }}
        >
          Configure scanning cadence, connector health, alert thresholds, and
          team authorization.
        </p>
      </div>

      <form
        onSubmit={handleSaveSettings}
        style={{ display: "flex", flexDirection: "column", gap: 24 }}
      >
        {/* Section 1: Connected Data Sources */}
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
            className="dark-text-white"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontWeight: 700,
              color: "#0f172a",
            }}
          >
            <Database
              className="dark-text-indigo-400"
              style={{ width: 16, height: 16, color: "#4f46e5" }}
            />
            <span>Connected Data Sources & Store Connectors</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              className="dark-bg-slate-800-60 dark-border-slate-800"
              style={{
                padding: 12,
                backgroundColor: "#f8fafc",
                border: "1px solid #f1f5f9",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  className="dark-text-white"
                  style={{ fontWeight: 600, color: "#0f172a" }}
                >
                  Google Play Store API Connector
                </div>
                <div
                  className="dark-text-slate-500"
                  style={{ fontSize: "11px", color: "#64748b" }}
                >
                  Official package registry and developer manifest query engine
                </div>
              </div>
              <span
                className="dark-text-emerald-400 dark-bg-emerald-950-40"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600,
                  color: "#059669",
                  backgroundColor: "#ecfdf5",
                  padding: "2px 8px",
                  borderRadius: 4,
                }}
              >
                Operational
              </span>
            </div>

            <div
              className="dark-bg-slate-800-60 dark-border-slate-800"
              style={{
                padding: 12,
                backgroundColor: "#f8fafc",
                border: "1px solid #f1f5f9",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  className="dark-text-white"
                  style={{ fontWeight: 600, color: "#0f172a" }}
                >
                  Apple App Store Search Connector
                </div>
                <div
                  className="dark-text-slate-500"
                  style={{ fontSize: "11px", color: "#64748b" }}
                >
                  iOS bundle namespace & developer team registry feed
                </div>
              </div>
              <span
                className="dark-text-emerald-400 dark-bg-emerald-950-40"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600,
                  color: "#059669",
                  backgroundColor: "#ecfdf5",
                  padding: "2px 8px",
                  borderRadius: 4,
                }}
              >
                Operational
              </span>
            </div>

            <div
              className="dark-bg-slate-800-60 dark-border-slate-800"
              style={{
                padding: 12,
                backgroundColor: "#f8fafc",
                border: "1px solid #f1f5f9",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  className="dark-text-white"
                  style={{ fontWeight: 600, color: "#0f172a" }}
                >
                  Social Platform Graph Stream (X & Instagram)
                </div>
                <div
                  className="dark-text-slate-500"
                  style={{ fontSize: "11px", color: "#64748b" }}
                >
                  Public profile and hashtag inspection stream
                </div>
              </div>
              <span
                className="dark-text-indigo-400 dark-bg-indigo-950-40"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600,
                  color: "#4f46e5",
                  backgroundColor: "#eef2ff",
                  padding: "2px 8px",
                  borderRadius: 4,
                }}
              >
                Demo Active
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Scan Frequency & Scheduling */}
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
            className="dark-text-white"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontWeight: 700,
              color: "#0f172a",
            }}
          >
            <Clock
              className="dark-text-indigo-400"
              style={{ width: 16, height: 16, color: "#4f46e5" }}
            />
            <span>Automated Scan Schedule</span>
          </div>

          <div
            className="sm-grid-cols-3"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
              gap: 12,
            }}
          >
            <button
              type="button"
              onClick={() => setScanCadence("manual")}
              className={`cursor-pointer transition-colors ${
                scanCadence === "manual"
                  ? "dark-bg-indigo-950-40 dark-text-indigo-200"
                  : "dark-border-slate-800 hover-border-slate-300"
              }`}
              style={{
                padding: 12,
                borderRadius: 12,
                textAlign: "left",
                border:
                  scanCadence === "manual"
                    ? "1px solid #4f46e5"
                    : "1px solid #e2e8f0",
                backgroundColor:
                  scanCadence === "manual" ? "#eef2ff" : "transparent",
                color: scanCadence === "manual" ? "#1e1b4b" : "inherit",
                fontWeight: scanCadence === "manual" ? 600 : "normal",
              }}
            >
              <div style={{ fontWeight: 700 }}>Manual On-Demand Only</div>
              <div style={{ fontSize: "11px", color: "#64748b", marginTop: 4 }}>
                Execute scans solely when initiated by team
              </div>
            </button>

            <button
              type="button"
              onClick={() => setScanCadence("24h")}
              className={`cursor-pointer transition-colors ${
                scanCadence === "24h"
                  ? "dark-bg-indigo-950-40 dark-text-indigo-200"
                  : "dark-border-slate-800 hover-border-slate-300"
              }`}
              style={{
                padding: 12,
                borderRadius: 12,
                textAlign: "left",
                border:
                  scanCadence === "24h"
                    ? "1px solid #4f46e5"
                    : "1px solid #e2e8f0",
                backgroundColor:
                  scanCadence === "24h" ? "#eef2ff" : "transparent",
                color: scanCadence === "24h" ? "#1e1b4b" : "inherit",
                fontWeight: scanCadence === "24h" ? 600 : "normal",
              }}
            >
              <div style={{ fontWeight: 700 }}>
                Every 24 Hours (Recommended)
              </div>
              <div style={{ fontSize: "11px", color: "#64748b", marginTop: 4 }}>
                Daily nightly sync of all stores and platforms
              </div>
            </button>

            <button
              type="button"
              onClick={() => setScanCadence("7d")}
              className={`cursor-pointer transition-colors ${
                scanCadence === "7d"
                  ? "dark-bg-indigo-950-40 dark-text-indigo-200"
                  : "dark-border-slate-800 hover-border-slate-300"
              }`}
              style={{
                padding: 12,
                borderRadius: 12,
                textAlign: "left",
                border:
                  scanCadence === "7d"
                    ? "1px solid #4f46e5"
                    : "1px solid #e2e8f0",
                backgroundColor:
                  scanCadence === "7d" ? "#eef2ff" : "transparent",
                color: scanCadence === "7d" ? "#1e1b4b" : "inherit",
                fontWeight: scanCadence === "7d" ? 600 : "normal",
              }}
            >
              <div style={{ fontWeight: 700 }}>Weekly Audit (Every 7 Days)</div>
              <div style={{ fontSize: "11px", color: "#64748b", marginTop: 4 }}>
                Lower cadence batch assessment
              </div>
            </button>
          </div>
        </div>

        {/* Section 3: Risk Thresholds & Whitelist */}
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
            className="dark-text-white"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontWeight: 700,
              color: "#0f172a",
            }}
          >
            <Sliders
              className="dark-text-indigo-400"
              style={{ width: 16, height: 16, color: "#4f46e5" }}
            />
            <span>Detection Sensitivity & Whitelist Policy</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 500,
                  marginBottom: 4,
                }}
              >
                <span>
                  Critical Risk Threshold (Currently: {criticalThreshold}/100)
                </span>
                <span style={{ color: "#94a3b8" }}>
                  Score $\ge$ {criticalThreshold} triggers immediate escalation
                </span>
              </div>
              <input
                type="range"
                min="75"
                max="95"
                value={criticalThreshold}
                onChange={(e) => setCriticalThreshold(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#4f46e5" }}
              />
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 500,
                  marginBottom: 4,
                }}
              >
                <span>
                  High Risk Threshold (Currently: {highThreshold}/100)
                </span>
                <span style={{ color: "#94a3b8" }}>
                  Score $\ge$ {highThreshold} enters priority triage
                </span>
              </div>
              <input
                type="range"
                min="60"
                max="80"
                value={highThreshold}
                onChange={(e) => setHighThreshold(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#4f46e5" }}
              />
            </div>

            <div
              className="dark-border-slate-800"
              style={{ paddingTop: 8, borderTop: "1px solid #f1f5f9" }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={autoExcludeWhitelisted}
                  onChange={(e) => setAutoExcludeWhitelisted(e.target.checked)}
                  style={{ borderRadius: 4, color: "#4f46e5" }}
                />

                <span style={{ fontWeight: 500 }}>
                  Auto-exclude exact package matches and verified domains from
                  threat queues (Recommended)
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Section 4: Authorized Workspace Team */}
        <div
          className="dark-bg-slate-900 dark-border-slate-800"
          style={{
            padding: 20,
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div
            className="dark-text-white"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontWeight: 700,
              color: "#0f172a",
            }}
          >
            <Users
              className="dark-text-indigo-400"
              style={{ width: 16, height: 16, color: "#4f46e5" }}
            />
            <span>Authorized Workspace Operators</span>
          </div>

          <div className="dark-divide-slate-800 divide-slate-100">
            <div
              style={{
                padding: "10px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              <div>
                <div
                  className="dark-text-white"
                  style={{ fontWeight: 600, color: "#0f172a" }}
                >
                  {user?.name}
                </div>
                <div style={{ fontSize: "11px", color: "#94a3b8" }}>
                  {user?.email} · {user?.role}
                </div>
              </div>
              <span
                className="dark-bg-slate-800 dark-text-slate-300"
                style={{
                  fontSize: "10px",
                  backgroundColor: "#f1f5f9",
                  color: "#475569",
                  padding: "2px 8px",
                  borderRadius: 4,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                Primary Lead (Admin)
              </span>
            </div>
            <div
              style={{
                padding: "10px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  className="dark-text-white"
                  style={{ fontWeight: 600, color: "#0f172a" }}
                >
                  Security Triage Bot (System)
                </div>
                <div style={{ fontSize: "11px", color: "#94a3b8" }}>
                  automated-scanner@riskshield.ai
                </div>
              </div>
              <span
                className="dark-bg-slate-800 dark-text-slate-300"
                style={{
                  fontSize: "10px",
                  backgroundColor: "#f1f5f9",
                  color: "#475569",
                  padding: "2px 8px",
                  borderRadius: 4,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                System Agent
              </span>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            type="submit"
            className="hover-bg-indigo-500 cursor-pointer hover-shadow"
            style={{
              padding: "8px 20px",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#ffffff",
              backgroundColor: "#4f46e5",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              gap: 6,
              border: "none",
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            }}
          >
            <Save style={{ width: 14, height: 14 }} />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};
