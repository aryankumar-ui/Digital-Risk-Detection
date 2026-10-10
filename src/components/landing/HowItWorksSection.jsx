import React from "react";
import {
  BookmarkPlus,
  Search,
  Cpu,
  CheckSquare,
  ArrowRight,
} from "lucide-react";

export const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Define Your Brand",
      icon: <BookmarkPlus style={{ width: 20, height: 20 }} />,
      description:
        "Register your brand name, legal entity, visual logos, official social accounts, package IDs (e.g. com.novapay.wallet) and authorized publishers.",
    },
    {
      number: "02",
      title: "Discover Candidates",
      icon: <Search style={{ width: 20, height: 20 }} />,
      description:
        "Connectors query Google Play Store, Apple App Store and social platform channels for look-alike usernames, duplicate titles and related packages.",
    },
    {
      number: "03",
      title: "Analyze Identity Signals",
      icon: <Cpu style={{ width: 20, height: 20 }} />,
      description:
        "Run multi-dimensional heuristics: name phonetic distance, icon perceptual hashing, publisher cryptographic namespace checks, and description text analysis.",
    },
    {
      number: "04",
      title: "Review and Respond",
      icon: <CheckSquare style={{ width: 20, height: 20 }} />,
      description:
        "Evaluate explainable evidence breakdowns, confirm genuine threats, auto-exclude official assets, add notes, and generate takedown dossiers.",
    },
  ];

  return (
    <section
      id="how-it-works"
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
            marginBottom: "4rem",
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
            Engine Architecture
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
            How RiskShield AI Works
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
            A transparent four-phase pipeline turning ambiguous web signals into
            defensible security investigations.
          </p>
        </div>

        {/* 4-Step Grid with visual flow */}
        <div
          className="md-grid-cols-2 lg-grid-cols-4"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
            gap: 24,
            position: "relative",
          }}
        >
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="dark-bg-slate-900-60 dark-border-slate-800 hover-border-indigo-400 dark-hover-border-indigo-600 transition-colors"
              style={{
                padding: 24,
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 16,
                  }}
                >
                  <span
                    className="dark-text-indigo-400"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "#4f46e5",
                    }}
                  >
                    Step {step.number}
                  </span>
                  <div
                    className="dark-bg-slate-800 dark-border-slate-700 dark-text-slate-200"
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      backgroundColor: "#ffffff",
                      border: "1px solid #e2e8f0",
                      color: "#334155",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {step.icon}
                  </div>
                </div>

                <h3
                  className="dark-text-white"
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#0f172a",
                    marginBottom: 8,
                  }}
                >
                  {step.title}
                </h3>

                <p
                  className="dark-text-slate-300"
                  style={{
                    fontSize: "0.75rem",
                    color: "#475569",
                    lineHeight: 1.625,
                    margin: 0,
                  }}
                >
                  {step.description}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div
                  className="hidden-below-lg dark-bg-slate-900 dark-border-slate-800"
                  style={{
                    position: "absolute",
                    right: -12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    padding: 4,
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "50%",
                    color: "#94a3b8",
                  }}
                >
                  <ArrowRight style={{ width: 12, height: 12 }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Note on explainable scoring */}
        <div
          className="dark-bg-indigo-950-30 dark-border-indigo-900-40"
          style={{
            marginTop: 40,
            padding: 16,
            backgroundColor: "rgba(238, 242, 255, 0.7)",
            border: "1px solid rgba(199, 210, 254, 0.6)",
            borderRadius: 12,
            textAlign: "center",
            maxWidth: "48rem",
            margin: "40px auto 0",
          }}
        >
          <p
            className="dark-text-indigo-200"
            style={{
              fontSize: "0.75rem",
              color: "#1e1b4b",
              lineHeight: 1.625,
              margin: 0,
            }}
          >
            <strong style={{ fontWeight: 600 }}>
              Explainable Prioritization:
            </strong>{" "}
            Risk scores represent potential risk indicators rather than
            definitive proof of malicious intent. Every score is backed by
            visible comparative evidence so human analysts make informed
            decisions.
          </p>
        </div>
      </div>
    </section>
  );
};
