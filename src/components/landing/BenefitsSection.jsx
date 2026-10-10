import React from "react";
import { Clock, Briefcase, ShieldCheck, FileSpreadsheet } from "lucide-react";

export const BenefitsSection = () => {
  const benefits = [
    {
      title: "Earlier Discovery",
      description:
        "Identify suspicious candidates from connected data sources before brand reputation or customer trust is compromised.",
      icon: <Clock style={{ width: 20, height: 20 }} />,
    },
    {
      title: "Less Manual Research",
      description:
        "Keep all registered brand trademarks, mobile packages, social handles and threat findings in a single operational workspace.",
      icon: <Briefcase style={{ width: 20, height: 20 }} />,
    },
    {
      title: "Fewer False Positives",
      description:
        "Exclude verified official assets automatically using cryptographic package IDs, official domains and verified publisher identifiers.",
      icon: <ShieldCheck style={{ width: 20, height: 20 }} />,
    },
    {
      title: "Clear Investigation Reports",
      description:
        "Give reviewers, platform abuse desks and legal teams clear evidence-backed summaries ready for immediate takedown filings.",
      icon: <FileSpreadsheet style={{ width: 20, height: 20 }} />,
    },
  ];

  return (
    <section
      className="dark-bg-slate-950 dark-border-slate-800 transition-colors"
      style={{
        padding: "5rem 0",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      <div
        className="sm-px-6 lg-px-8"
        style={{ padding: "0 32px" }}
      >
        <div
          style={{
            textAlign: "center",
            maxWidth: "42rem",
            margin: "0 auto",
            marginBottom: "3.5rem",
          }}
        >
          <div
            className="dark-text-indigo-400"
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#4f46e5",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: 8,
            }}
          >
            Why RiskShield AI
          </div>
          <h2
            className="sm-text-3xl md-text-4xl dark-text-white"
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "#0f172a",
              letterSpacing: "-0.025em",
              margin: 0,
            }}
          >
            Built for Modern Security & Brand Teams
          </h2>
          <p
            className="sm-text-base dark-text-slate-300"
            style={{
              marginTop: 16,
              fontSize: "0.875rem",
              color: "#475569",
              margin: "16px 0 0 0",
            }}
          >
            Engineered to remove friction from digital brand enforcement and
            candidate triage.
          </p>
        </div>

        <div
          className="sm-grid-cols-2 lg-grid-cols-4"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
            gap: 24,
          }}
        >
          {benefits.map((b) => (
            <div
              key={b.title}
              className="dark-bg-slate-900-50 dark-border-slate-800 hover-border-slate-300 dark-hover-border-slate-700 transition-colors"
              style={{
                padding: 24,
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div
                className="dark-bg-slate-800 dark-border-slate-700 dark-text-indigo-400"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  color: "#4f46e5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {b.icon}
              </div>
              <h3
                className="dark-text-white"
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                {b.title}
              </h3>
              <p
                className="dark-text-slate-400"
                style={{
                  fontSize: "0.75rem",
                  color: "#475569",
                  lineHeight: 1.625,
                  margin: 0,
                }}
              >
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
