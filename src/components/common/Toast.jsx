import React from "react";
import { useApp } from "../../context/AppContext";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

export const Toast = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: (
      <CheckCircle2
        style={{ width: 16, height: 16, color: "#10b981", flexShrink: 0 }}
      />
    ),
    warning: (
      <AlertCircle
        style={{ width: 16, height: 16, color: "#f59e0b", flexShrink: 0 }}
      />
    ),
    info: (
      <Info
        style={{ width: 16, height: 16, color: "#6366f1", flexShrink: 0 }}
      />
    ),
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 50,
        maxWidth: "24rem",
        width: "100%",
        transition: "all 0.2s",
      }}
    >
      <div
        className="dark-bg-slate-900 dark-border-slate-800 dark-text-slate-200"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: 12,
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: 8,
          boxShadow:
            "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
          fontSize: "0.875rem",
          color: "#1e293b",
        }}
      >
        {icons[toast.type]}
        <div style={{ flex: 1, fontSize: "0.75rem" }}>{toast.message}</div>
      </div>
    </div>
  );
};
