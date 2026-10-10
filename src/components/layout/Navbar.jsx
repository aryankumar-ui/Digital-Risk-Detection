import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Sun, Moon, Menu, X, LogIn } from "lucide-react";

export const Navbar = () => {
  const { theme, toggleTheme, setView } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinkStyle = {
    background: "none",
    border: "none",
    cursor: "pointer",
    transition: "color 0.15s",
  };

  const navLinks = [
    { label: "Overview", id: "overview" },
    { label: "How It Works", id: "how-it-works" },
    { label: "App Monitoring", id: "app-monitoring" },
    { label: "Social Monitoring", id: "social-monitoring" },
    { label: "Evidence Analysis", id: "explainable-detection" },
  ];

  return (
    <nav
      className="dark-bg-slate-900-95 dark-border-slate-800 backdrop-blur-md transition-colors"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        width: "100%",
        backgroundColor: "rgba(255,255,255,0.95)",
        borderBottom: "1px solid #e2e8f0",
        boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          maxWidth: "80rem",
          margin: "0 auto",
          padding: "0 1rem",
          height: "3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
        className="sm-px-6 lg-px-8 sm-h-14"
      >
        {/* Navigation Category Label */}
        <div
          className="dark-text-slate-400"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "#64748b",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          <span
            className="animate-pulse"
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#3b82f6",
            }}
          />
          <span className="hidden-below-sm">Platform Navigation</span>
        </div>

        {/* Center: Navigation Links */}
        <div
          className="flex-hidden-below-md"
          style={{
            alignItems: "center",
            gap: 24,
            fontSize: "0.75rem",
            fontWeight: 600,
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="hover-text-blue-600 dark-hover-text-blue-400 dark-text-slate-200 transition-colors cursor-pointer"
              style={{ ...navLinkStyle, color: "#334155" }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right: Theme Toggle & Log In */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexShrink: 0,
          }}
        >
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle light and dark theme"
            className="hover-text-slate-900 dark-text-slate-300 dark-hover-text-white hover-bg-slate-100 dark-hover-bg-slate-800 dark-border-slate-800 transition-colors cursor-pointer"
            style={{
              padding: 8,
              borderRadius: 8,
              color: "#475569",
              border: "1px solid #e2e8f0",
              background: "none",
            }}
            title={
              theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
          >
            {theme === "dark" ? (
              <Sun style={{ width: 16, height: 16, color: "#fbbf24" }} />
            ) : (
              <Moon style={{ width: 16, height: 16, color: "#334155" }} />
            )}
          </button>

          {/* Log In Button */}
          <button
            onClick={() => setView("login")}
            className="hover-bg-blue-500 transition-colors cursor-pointer"
            style={{
              padding: "8px 16px",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#ffffff",
              backgroundColor: "#2563eb",
              borderRadius: 8,
              boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
              whiteSpace: "nowrap",
            }}
          >
            <LogIn style={{ width: 14, height: 14 }} />
            <span>Log In</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="show-below-md dark-text-slate-300 hover-text-slate-900 dark-hover-text-white cursor-pointer"
            style={{
              padding: 6,
              color: "#475569",
              background: "none",
              border: "none",
              display: "none",
            }}
            aria-label="Open menu"
          >
            {mobileMenuOpen ? (
              <X style={{ width: 20, height: 20 }} />
            ) : (
              <Menu style={{ width: 20, height: 20 }} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="show-below-md dark-border-slate-800 dark-bg-slate-950"
          style={{
            borderTop: "1px solid #e2e8f0",
            backgroundColor: "#ffffff",
            padding: "12px 16px",
            fontSize: "0.75rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="dark-text-slate-200"
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "8px 0",
                  fontWeight: 500,
                  color: "#334155",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {link.label}
              </button>
            ))}
            <div
              className="dark-border-slate-800"
              style={{ paddingTop: 8, borderTop: "1px solid #e2e8f0" }}
            >
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setView("login");
                }}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  textAlign: "center",
                  fontWeight: 600,
                  backgroundColor: "#2563eb",
                  color: "#ffffff",
                  borderRadius: 8,
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  cursor: "pointer",
                }}
              >
                <LogIn style={{ width: 14, height: 14 }} />
                <span>Log In</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
