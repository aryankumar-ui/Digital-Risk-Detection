import React from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { HeroSection } from "./components/landing/HeroSection";
import { OverviewSection } from "./components/landing/OverviewSection";
import { HowItWorksSection } from "./components/landing/HowItWorksSection";
import { SocialMonitoringSection } from "./components/landing/SocialMonitoringSection";
import { AppStoreSection } from "./components/landing/AppStoreSection";
import { ExplainableDetectionSection } from "./components/landing/ExplainableDetectionSection";
import { BenefitsSection } from "./components/landing/BenefitsSection";
import { CTASection } from "./components/landing/CTASection";
import { Footer } from "./components/landing/Footer";
import { AuthPage } from "./components/auth/AuthPage";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import { OverviewView } from "./components/dashboard/OverviewView";
import { BrandsView } from "./components/dashboard/BrandsView";
import { SocialMonitoringView } from "./components/dashboard/SocialMonitoringView";
import { AppMonitoringView } from "./components/dashboard/AppMonitoringView";
import { ThreatFindingsView } from "./components/dashboard/ThreatFindingsView";
import { ThreatGraphView } from "./components/dashboard/ThreatGraphView";

import { SettingsView } from "./components/dashboard/SettingsView";
import { Toast } from "./components/common/Toast";
import { AcceptInvitePage } from "./components/auth/AcceptInvitePage";
import { AdminManagementView } from "./components/dashboard/AdminManagementView";
import { Shield, Sun, Moon } from "lucide-react";

const AppContent = () => {
  const { view, dashboardTab, setView, theme, toggleTheme, authLoading } = useApp();

  // Prevent flash of landing page while checking auth
  // But if we know they are logged in via localStorage, render the dashboard instantly!
  if (authLoading && localStorage.getItem("isLoggedIn") !== "true") {
    return (
      <div 
        style={{ 
          height: "100vh", 
          display: "flex", 
          flexDirection: "column",
          alignItems: "center", 
          justifyContent: "center", 
          backgroundColor: "#020617",
          color: "#f8fafc",
          fontFamily: "'Plus Jakarta Sans', sans-serif"
        }}
      >
        <div 
          className="animate-spin"
          style={{
            width: 32,
            height: 32,
            border: "3px solid rgba(255,255,255,0.1)",
            borderTopColor: "#3b82f6",
            borderRadius: "50%",
            marginBottom: 16
          }}
        />
        <div style={{ fontSize: "14px", fontWeight: 500, letterSpacing: "1px", color: "#94a3b8" }}>
          INITIALIZING SECURE SESSION
        </div>
      </div>
    );
  }

  // Route override for invite accept
  if (window.location.pathname === "/invite/accept") {
    return (
      <>
        <AcceptInvitePage />
        <Toast />
      </>
    );
  }


  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinkStyle = {
    background: "none",
    border: "none",
    outline: "none",
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

  // 1. Dedicated Authentication View
  if (view === "login") {
    return (
      <>
        <AuthPage />
        <Toast />
      </>
    );
  }

  // 2. Authenticated Dashboard View
  if (view === "dashboard") {
    return (
      <DashboardLayout>
        {dashboardTab === "overview" && <OverviewView />}
        {(dashboardTab === "brands" || dashboardTab === "brand-detail") && (
          <BrandsView />
        )}
        {dashboardTab === "social" && <SocialMonitoringView />}
        {dashboardTab === "apps" && <AppMonitoringView />}
        {dashboardTab === "findings" && <ThreatFindingsView />}
        {dashboardTab === "graph" && <ThreatGraphView />}

                {dashboardTab === "settings" && <SettingsView />}
        {dashboardTab === "admin" && <AdminManagementView />}
        <Toast />
      </DashboardLayout>
    );
  }

  // 3. Public Landing Page
  return (
    <div
      className="dark-bg-slate-950 dark-text-slate-100 transition-colors"
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        color: "#0f172a",
      }}
    >
      {/* 1. UNIFIED DARK NAVBAR */}
      <header
        className="dark-bg-black dark-border-slate-800 transition-colors"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          width: "100%",
          backgroundColor: "#020617",
          color: "#ffffff",
          padding: "16px 24px",
          borderBottom: "1px solid #1e293b",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          {/* Logo Section */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: "#2563eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                flexShrink: 0,
              }}
            >
              <Shield style={{ width: 18, height: 18 }} />
            </div>
            <h1
              className="sm-text-xl"
              style={{
                fontWeight: 800,
                fontSize: "1.25rem",
                letterSpacing: "-0.025em",
                color: "#ffffff",
                lineHeight: 1,
                margin: 0,
              }}
            >
              RiskShield <span style={{ color: "#60a5fa" }}>AI</span>
            </h1>
          </div>

          {/* Navigation Links in Center */}
          <div
            className="flex-hidden-below-md"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              fontSize: "0.875rem",
              fontWeight: 600,
            }}
          >
            {/* The links will be moved down */}
          </div>

          {/* Right Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={toggleTheme}
              className="hover-bg-slate-800 transition-colors cursor-pointer"
              style={{
                padding: 8,
                borderRadius: 8,
                color: "#94a3b8",
                background: "none",
                border: "none",
              }}
            >
              {theme === "dark" ? (
                <Sun style={{ width: 18, height: 18, color: "#fbbf24" }} />
              ) : (
                <Moon style={{ width: 18, height: 18 }} />
              )}
            </button>

            <button
              onClick={() => setView("login")}
              className="hover-bg-blue-500 transition-all cursor-pointer"
              style={{
                padding: "8px 16px",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#ffffff",
                backgroundColor: "#2563eb",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                gap: 6,
                border: "none",
              }}
            >
              <span>Sign In</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Navigation Links Row (Bottom Row) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            fontSize: "0.875rem",
            fontWeight: 600,
            marginTop: "16px",
            paddingTop: "16px",
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="hover-text-blue-400 transition-colors cursor-pointer"
              style={{ ...navLinkStyle, color: "#94a3b8" }}
            >
              {link.label}
            </button>
          ))}
        </div>
      </header>

      <main>
        <HeroSection />
        <OverviewSection />
        <HowItWorksSection />
        <AppStoreSection />
        <SocialMonitoringSection />
        <ExplainableDetectionSection />
        <BenefitsSection />
        <CTASection />
      </main>

      <Footer />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
