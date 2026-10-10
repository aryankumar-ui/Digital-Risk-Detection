import React from "react";
import { Shield, Share2, Smartphone, ArrowRight } from "lucide-react";

export const OverviewSection = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="overview"
      className="dark-bg-slate-900-50 transition-colors"
      style={{ padding: "5rem 0", backgroundColor: "#f8fafc" }}
    >
      <div
        className="sm-px-6 lg-px-8"
        style={{ padding: "0 32px" }}
      >
        {/* Section Header */}
        <div
          style={{
            textAlign: "center",
            maxWidth: "48rem",
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
            System Overview
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
            One Platform for Your Brand's Digital Safety
          </h2>
          <p
            className="dark-text-slate-300"
            style={{
              marginTop: 16,
              fontSize: "1rem",
              color: "#475569",
              lineHeight: 1.625,
              margin: "16px 0 0 0",
            }}
          >
            Traditional threat feeds ignore brand imitation in app stores and
            social platforms. RiskShield AI pairs authorized brand registries
            with cross-platform inspection to pinpoint unauthorized entities
            before your customers are misled.
          </p>
        </div>

        {/* 3 Prominent Feature Cards */}
        <div
          className="md-grid-cols-3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
            gap: 32,
          }}
        >
          {/* Card 1: Brand Profile */}
          <div
            className="hover-shadow-md dark-bg-slate-900 dark-border-slate-800 transition-shadow"
            style={{
              padding: 32,
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div
                className="dark-bg-indigo-950-60 dark-text-indigo-400"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 8,
                  backgroundColor: "#eef2ff",
                  color: "#4f46e5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Shield style={{ width: 24, height: 24 }} />
              </div>
              <h3
                className="dark-text-white"
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                Brand Profile
              </h3>
              <p
                className="dark-text-slate-300"
                style={{
                  fontSize: "0.875rem",
                  color: "#475569",
                  lineHeight: 1.625,
                  margin: 0,
                }}
              >
                Define your legitimate brand identity, verified social profiles,
                official apps, authorized package IDs and accredited developer
                publishers.
              </p>
            </div>
            <div
              className="dark-border-slate-800"
              style={{
                paddingTop: 24,
                marginTop: 24,
                borderTop: "1px solid #f1f5f9",
              }}
            >
              <button
                onClick={() => scrollTo("how-it-works")}
                className="dark-text-indigo-400 hover-text-indigo-700 transition-colors cursor-pointer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#4f46e5",
                  background: "none",
                  border: "none",
                }}
              >
                <span>Learn about Registry Verification</span>
                <ArrowRight style={{ width: 14, height: 14 }} />
              </button>
            </div>
          </div>

          {/* Card 2: Social Media Monitoring */}
          <div
            className="hover-shadow-md dark-bg-slate-900 dark-border-slate-800 transition-shadow"
            style={{
              padding: 32,
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div
                className="dark-bg-indigo-950-60 dark-text-indigo-400"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 8,
                  backgroundColor: "#eef2ff",
                  color: "#4f46e5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Share2 style={{ width: 24, height: 24 }} />
              </div>
              <h3
                className="dark-text-white"
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                Social Media Monitoring
              </h3>
              <p
                className="dark-text-slate-300"
                style={{
                  fontSize: "0.875rem",
                  color: "#475569",
                  lineHeight: 1.625,
                  margin: 0,
                }}
              >
                Identify profiles and company pages that resemble your official
                identity, pose as customer care desks or exhibit possible scam
                indicators.
              </p>
            </div>
            <div
              className="dark-border-slate-800"
              style={{
                paddingTop: 24,
                marginTop: 24,
                borderTop: "1px solid #f1f5f9",
              }}
            >
              <button
                onClick={() => scrollTo("social-monitoring")}
                className="dark-text-indigo-400 hover-text-indigo-700 transition-colors cursor-pointer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#4f46e5",
                  background: "none",
                  border: "none",
                }}
              >
                <span>Explore Social Discovery</span>
                <ArrowRight style={{ width: 14, height: 14 }} />
              </button>
            </div>
          </div>

          {/* Card 3: App Store Monitoring */}
          <div
            className="hover-shadow-md dark-bg-slate-900 dark-border-slate-800 transition-shadow"
            style={{
              padding: 32,
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div
                className="dark-bg-indigo-950-60 dark-text-indigo-400"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 8,
                  backgroundColor: "#eef2ff",
                  color: "#4f46e5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Smartphone style={{ width: 24, height: 24 }} />
              </div>
              <h3
                className="dark-text-white"
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                App Store Monitoring
              </h3>
              <p
                className="dark-text-slate-300"
                style={{
                  fontSize: "0.875rem",
                  color: "#475569",
                  lineHeight: 1.625,
                  margin: 0,
                }}
              >
                Find mobile app listings with suspicious name similarities,
                copied branding, mismatched developers or misleading
                credential-gathering descriptions.
              </p>
            </div>
            <div
              className="dark-border-slate-800"
              style={{
                paddingTop: 24,
                marginTop: 24,
                borderTop: "1px solid #f1f5f9",
              }}
            >
              <button
                onClick={() => scrollTo("app-monitoring")}
                className="dark-text-indigo-400 hover-text-indigo-700 transition-colors cursor-pointer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#4f46e5",
                  background: "none",
                  border: "none",
                }}
              >
                <span>Inspect Store Comparison Engine</span>
                <ArrowRight style={{ width: 14, height: 14 }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
