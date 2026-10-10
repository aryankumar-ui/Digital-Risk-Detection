import React from "react";
import { useApp } from "../../context/AppContext";
import { Shield, ArrowRight } from "lucide-react";

export const CTASection = () => {
  const { setView, loginAsDemoUser } = useApp();

  return (
    <section
      className="dark-bg-slate-950"
      style={{
        padding: "5rem 0",
        backgroundColor: "#0f172a",
        color: "#ffffff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(49, 46, 129, 0.4), transparent, rgba(49, 46, 129, 0.3))",
          pointerEvents: "none",
        }}
      />

      <div
        className="sm-px-6 lg-px-8"
        style={{
          maxWidth: "64rem",
          margin: "0 auto",
          padding: "0 1rem",
          textAlign: "center",
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            backgroundColor: "rgba(79, 70, 229, 0.3)",
            border: "1px solid rgba(129, 140, 248, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            color: "#818cf8",
          }}
        >
          <Shield style={{ width: 24, height: 24 }} />
        </div>

        <h2
          className="sm-text-4xl md-text-5xl"
          style={{
            fontSize: "1.875rem",
            fontWeight: 800,
            letterSpacing: "-0.025em",
            margin: 0,
          }}
        >
          Know What's Using Your Brand.
        </h2>

        <p
          className="sm-text-base"
          style={{
            fontSize: "0.875rem",
            color: "#cbd5e1",
            maxWidth: "42rem",
            margin: "0 auto",
            lineHeight: 1.625,
          }}
        >
          Build your brand profile, scan available sources and review suspicious
          findings in one place. Defend your customers before fraudulent
          listings inflict financial or reputational damage.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            paddingTop: 16,
          }}
        >
          <button
            onClick={() => setView("login")}
            className="hover-bg-indigo-500 transition-colors cursor-pointer"
            style={{
              padding: "12px 24px",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "#ffffff",
              backgroundColor: "#4f46e5",
              borderRadius: 8,
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              border: "none",
            }}
          >
            <span>Sign In to Console</span>
            <ArrowRight style={{ width: 16, height: 16 }} />
          </button>

          <button
            onClick={loginAsDemoUser}
            className="hover-bg-slate-700 transition-colors cursor-pointer"
            style={{
              padding: "12px 24px",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "#e2e8f0",
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              borderRadius: 8,
            }}
          >
            Explore Demo Workspace
          </button>
        </div>
      </div>
    </section>
  );
};
