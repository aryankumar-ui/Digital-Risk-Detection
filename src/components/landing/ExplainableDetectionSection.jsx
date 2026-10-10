import React from "react";
import { SimilarityBar } from "../common/SimilarityBar";
import { ShieldAlert, Info, Layers } from "lucide-react";

export const ExplainableDetectionSection = () => {
  return (
    <section
      id="explainable-detection"
      className="dark-bg-slate-900-30 dark-border-slate-800 transition-colors"
      style={{
        padding: "5rem 0",
        backgroundColor: "#f8fafc",
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
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#4f46e5",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: 8,
            }}
          >
            <Layers style={{ width: 14, height: 14 }} />
            <span>Forensic Transparency</span>
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
            Every Alert Comes With Evidence
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
            No black-box threat scores. Every finding decomposes into
            transparent, auditable indicators calibrated against your brand's
            authorized baseline.
          </p>
        </div>

        {/* Evidence Signals Visual Matrix */}
        <div
          className="sm-p-8 dark-bg-slate-900 dark-border-slate-800"
          style={{
            maxWidth: "48rem",
            margin: "0 auto",
            padding: 24,
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 16,
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            className="dark-border-slate-800"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: 16,
              borderBottom: "1px solid #f1f5f9",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                className="dark-bg-indigo-950-60 dark-text-indigo-400"
                style={{
                  padding: 4,
                  borderRadius: 4,
                  backgroundColor: "#eef2ff",
                  color: "#4f46e5",
                }}
              >
                <ShieldAlert style={{ width: 16, height: 16 }} />
              </div>
              <span
                className="dark-text-white"
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#0f172a",
                }}
              >
                Multi-Vector Risk Decomposition
              </span>
            </div>
            <span
              className="dark-text-rose-400"
              style={{
                fontSize: "0.75rem",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 600,
                color: "#e11d48",
              }}
            >
              Aggregated Risk Score: 91 / 100
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <SimilarityBar
                label="Name Similarity (Fuzzy String & Phonetics)"
                percentage={94}
              />
              <p
                className="dark-text-slate-500"
                style={{
                  fontSize: "11px",
                  color: "#64748b",
                  marginTop: 2,
                  margin: 0,
                }}
              >
                Target contains official brand mark "NovaPay" with deceptive
                support suffix.
              </p>
            </div>

            <div>
              <SimilarityBar
                label="Logo Visual Resemblance (Perceptual Hash)"
                percentage={88}
              />
              <p
                className="dark-text-slate-500"
                style={{
                  fontSize: "11px",
                  color: "#64748b",
                  marginTop: 2,
                  margin: 0,
                }}
              >
                Vector icon matches official trademark crest at 88% visual
                congruence.
              </p>
            </div>

            <div>
              <SimilarityBar
                label="Publisher & Namespace Discrepancy"
                percentage={95}
              />
              <p
                className="dark-text-slate-500"
                style={{
                  fontSize: "11px",
                  color: "#64748b",
                  marginTop: 2,
                  margin: 0,
                }}
              >
                Developer "QuickSupport Global" is not in the authorized
                corporate whitelist.
              </p>
            </div>

            <div>
              <SimilarityBar
                label="Description Deception & Credential Signals"
                percentage={85}
              />
              <p
                className="dark-text-slate-500"
                style={{
                  fontSize: "11px",
                  color: "#64748b",
                  marginTop: 2,
                  margin: 0,
                }}
              >
                Text prompts user for "master recovery seed phrase" and bank
                credentials.
              </p>
            </div>

            <div>
              <SimilarityBar
                label="Suspicious External Infrastructure"
                percentage={90}
              />
              <p
                className="dark-text-slate-500"
                style={{
                  fontSize: "11px",
                  color: "#64748b",
                  marginTop: 2,
                  margin: 0,
                }}
              >
                Endpoint redirects to anonymous disposable hosting not in
                trusted domains.
              </p>
            </div>
          </div>

          <div
            className="dark-bg-slate-800-60 dark-border-slate-700-60"
            style={{
              padding: 16,
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
            }}
          >
            <Info
              className="dark-text-indigo-400"
              style={{
                width: 16,
                height: 16,
                color: "#4f46e5",
                flexShrink: 0,
                marginTop: 2,
              }}
            />
            <div
              className="dark-text-slate-300"
              style={{
                fontSize: "0.75rem",
                color: "#475569",
                lineHeight: 1.625,
              }}
            >
              <strong style={{ fontWeight: 600 }}>
                Zero False Accusations:
              </strong>{" "}
              A name match alone does not prove an app or account is malicious.
              Independent guides, fans and commentary accounts are evaluated
              with separate intent thresholds to minimize investigation noise.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
