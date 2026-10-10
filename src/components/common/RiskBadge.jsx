import React from "react";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  ShieldCheck,
  HelpCircle,
  XCircle,
} from "lucide-react";

const badgeBase = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  fontWeight: 500,
  fontSize: "0.75rem",
};

const iconStyle = { width: 14, height: 14, flexShrink: 0 };
const smallIcon = { width: 12, height: 12 };

export const RiskBadge = ({ level, score, showScore = true }) => {
  const colors = {
    critical: "#e11d48",
    high: "#d97706",
    medium: "#ca8a04",
    low: "#059669",
  };

  const darkColors = {
    critical: "dark-text-rose-400",
    high: "dark-text-amber-400",
    medium: "dark-text-yellow-400",
    low: "dark-text-emerald-400",
  };

  const labels = {
    critical: "Critical",
    high: "High Risk",
    medium: "Medium",
    low: "Low Risk",
  };

  const icons = {
    critical: (
      <AlertCircle
        style={{ ...iconStyle, color: colors.critical }}
        aria-hidden="true"
      />
    ),
    high: (
      <AlertTriangle
        style={{ ...iconStyle, color: colors.high }}
        aria-hidden="true"
      />
    ),
    medium: (
      <AlertTriangle
        style={{ ...iconStyle, color: colors.medium }}
        aria-hidden="true"
      />
    ),
    low: (
      <CheckCircle
        style={{ ...iconStyle, color: colors.low }}
        aria-hidden="true"
      />
    ),
  };

  return (
    <span
      className={darkColors[level]}
      style={{ ...badgeBase, color: colors[level] }}
    >
      {icons[level]}
      <span>
        {labels[level]}
        {showScore && score !== undefined ? ` · ${score}/100` : ""}
      </span>
    </span>
  );
};

export const StatusBadge = ({ status }) => {
  switch (status) {
    case "pending":
      return (
        <span
          className="dark-text-amber-400"
          style={{ ...badgeBase, color: "#d97706" }}
        >
          <HelpCircle style={smallIcon} />
          <span>Requires Review</span>
        </span>
      );
    case "investigating":
      return (
        <span
          className="dark-text-indigo-400"
          style={{ ...badgeBase, color: "#4f46e5" }}
        >
          <AlertTriangle style={smallIcon} />
          <span>Under Investigation</span>
        </span>
      );
    case "confirmed_threat":
      return (
        <span
          className="dark-text-rose-400"
          style={{ ...badgeBase, color: "#e11d48", fontWeight: 500 }}
        >
          <XCircle style={smallIcon} />
          <span>Confirmed Threat</span>
        </span>
      );
    case "legitimate":
      return (
        <span
          className="dark-text-emerald-400"
          style={{ ...badgeBase, color: "#059669", fontWeight: 500 }}
        >
          <ShieldCheck style={smallIcon} />
          <span>Official / Legitimate</span>
        </span>
      );
    case "dismissed":
      return (
        <span
          className="dark-text-slate-400"
          style={{ ...badgeBase, color: "#64748b" }}
        >
          <span>Dismissed</span>
        </span>
      );
  }
};
