import React from "react";

export const SimilarityBar = ({ label, percentage, showNumeric = true }) => {
  const getBarColor = (pct) => {
    if (pct >= 85) return "#f43f5e";
    if (pct >= 70) return "#f59e0b";
    if (pct >= 50) return "#eab308";
    return "#10b981";
  };

  return (
    <div style={{ width: "100%" }}>
      <div
        className="dark-text-slate-400"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "0.75rem",
          color: "#475569",
          marginBottom: 4,
        }}
      >
        <span>{label}</span>
        {showNumeric && (
          <span
            className="dark-text-slate-200"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontVariantNumeric: "tabular-nums",
              fontWeight: 600,
              color: "#1e293b",
            }}
          >
            {percentage}%
          </span>
        )}
      </div>
      <div
        className="dark-bg-slate-800"
        style={{
          height: 6,
          width: "100%",
          backgroundColor: "#e2e8f0",
          borderRadius: 9999,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            transition: "all 0.3s",
            borderRadius: 9999,
            backgroundColor: getBarColor(percentage),
            width: `${Math.min(100, Math.max(0, percentage))}%`,
          }}
        />
      </div>
    </div>
  );
};
