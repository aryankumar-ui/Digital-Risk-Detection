import React, { useState, useRef, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import {
  Shield,
  LayoutDashboard,
  GraduationCap,
  MessageSquare,
  LayoutGrid,
  ShieldAlert,
  Activity,
  FileText,
  Settings,
  Search,
  Bell,
  Sun,
  Moon,
  LogOut,
  Play,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

export const DashboardLayout = ({ children }) => {
  const {
    userRole,
    dashboardTab,
    setDashboardTab,
    theme,
    toggleTheme,
    user,
    logout,
    notifications,
    unreadNotificationCount,
    markNotificationRead,
    markAllNotificationsRead,
    globalSearch,
    setGlobalSearch,
    triggerScan,
    isScanning,
    selectedBrand,
  } = useApp();

  // Collapsible sidebar state (persisted or defaults to expanded)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [accountContainerOpen, setAccountContainerOpen] = useState(false);

  const notifRef = useRef(null);
  const accountRef = useRef(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountContainerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);


  let navItems = [
    {
      id: "overview",
      label: "Overview",
      icon: <LayoutDashboard style={{ width: 16, height: 16 }} />,
    },
    {
      id: "brands",
      label: "Brand Profiles",
      icon: <GraduationCap style={{ width: 16, height: 16 }} />,
    },
    {
      id: "social",
      label: "Social Monitoring",
      icon: <MessageSquare style={{ width: 16, height: 16 }} />,
    },
    {
      id: "apps",
      label: "App Store Monitoring",
      icon: <LayoutGrid style={{ width: 16, height: 16 }} />,
    },
    {
      id: "findings",
      label: "Threat Findings",
      icon: <ShieldAlert style={{ width: 16, height: 16 }} />,
    },
    {
      id: "graph",
      label: "Threat Graph",
      icon: <LayoutGrid style={{ width: 16, height: 16 }} />,
    },
  ];

  if (userRole === "admin") {
    navItems.push({
      id: "admin",
      label: "Admin Management",
      icon: <Shield style={{ width: 16, height: 16 }} />,
    });
  }


  const handleNavClick = (tab) => {
    setDashboardTab(tab);
    setMobileMenuOpen(false);
  };

  const getBreadcrumbTitle = () => {
    const item = navItems.find((n) => n.id === dashboardTab);
    return item ? item.label : "Security Overview";
  };

  return (
    <div
      className="dark-bg-slate-950 dark-text-slate-100 transition-colors"
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        backgroundColor: "#f8fafc",
        display: "flex",
        color: "#0f172a",
        fontSize: "0.9375rem",
      }}
    >
      {/* ======================================================== */}
      {/* GEMINI-STYLE SIDEBAR (TRANSPARENT, NON-SCROLLABLE)       */}
      {/* Toggles between full-width (256px) and collapsed (68px) */}
      {/* ======================================================== */}
      <aside
        className="lg-flex dark-text-slate-300 dark-border-slate-800-60"
        style={{
          display: "none", // Overridden by media query below
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
          position: "sticky",
          top: 0,
          overflow: "visible",
          backgroundColor: "transparent",
          backdropFilter: "blur(12px)",
          color: "#334155",
          borderRight: "1px solid rgba(226, 232, 240, 0.6)",
          flexShrink: 0,
          transition: "all 300ms ease",
          userSelect: "none",
          zIndex: 30,
          width: sidebarCollapsed ? 68 : 256,
        }}
      >
        <style>{`
          @media (min-width: 1024px) {
            .lg-flex { display: flex !important; }
          }
        `}</style>

        {/* Top: Brand Header */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            className="dark-border-slate-800-40"
            style={{
              height: 64,
              padding: "0 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid rgba(226, 232, 240, 0.4)",
            }}
          >
            {sidebarCollapsed ? (
              /* Collapsed: Click the Radiant Shield Icon to Expand */
              <button
                onClick={() => setSidebarCollapsed(false)}
                className="hover-bg-slate-100 dark-hover-bg-white-10 cursor-pointer transition-colors group"
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 8,
                  borderRadius: 12,
                  border: "none",
                  background: "none",
                }}
                title="Expand sidebar"
              >
                <div
                  className="hover-scale-105"
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 32,
                    height: 32,
                    borderRadius: 12,
                    background:
                      "linear-gradient(to top right, #3b82f6, #6366f1, #fcd34d)",
                    padding: 2,
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    transition: "transform 150ms ease",
                  }}
                >
                  <div
                    className="dark-bg-slate-950"
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#ffffff",
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Shield
                      className="dark-text-blue-400"
                      style={{ width: 16, height: 16, color: "#2563eb" }}
                    />
                  </div>
                </div>
              </button>
            ) : (
              /* Expanded: Brand Logo + Close / Collapse Button */
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background:
                        "linear-gradient(to top right, #3b82f6, #6366f1, #fcd34d)",
                      padding: 2,
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      className="dark-bg-slate-950"
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#ffffff",
                        borderRadius: 6,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Shield
                        className="dark-text-blue-400"
                        style={{ width: 14, height: 14, color: "#2563eb" }}
                      />
                    </div>
                  </div>
                  <div
                    className="dark-text-white"
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "-0.025em",
                      color: "#0f172a",
                      whiteSpace: "nowrap",
                    }}
                  >
                    RiskShield{" "}
                    <span
                      className="dark-text-blue-400"
                      style={{ color: "#2563eb" }}
                    >
                      AI
                    </span>
                  </div>
                </div>

                {/* Close Button to collapse sidebar into icons-only mode */}
                <button
                  onClick={() => setSidebarCollapsed(true)}
                  className="dark-hover-text-white hover-bg-slate-100 dark-hover-bg-white-10 cursor-pointer transition-colors"
                  style={{
                    padding: 6,
                    borderRadius: 8,
                    color: "#94a3b8",
                    border: "none",
                    background: "none",
                  }}
                  title="Close sidebar"
                  aria-label="Close sidebar"
                >
                  <X style={{ width: 16, height: 16 }} />
                </button>
              </div>
            )}
          </div>

          {/* Navigation Items */}
          <nav
            style={{
              padding: "12px 10px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {navItems.map((item) => {
              const isActive = dashboardTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`cursor-pointer transition-colors ${
                    isActive
                      ? ""
                      : "dark-text-slate-400 hover-text-slate-900 dark-hover-text-white hover-bg-slate-100-70 dark-hover-bg-white-5"
                  }`}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 12,
                    fontSize: "0.75rem",
                    textAlign: "left",
                    border: "none",
                    height: sidebarCollapsed ? 40 : "auto",
                    justifyContent: sidebarCollapsed ? "center" : "flex-start",
                    padding: sidebarCollapsed ? 0 : "10px 14px",
                    gap: sidebarCollapsed ? 0 : 12,
                    backgroundColor: isActive ? "#2563eb" : "transparent",
                    color: isActive ? "#ffffff" : "#475569",
                    fontWeight: isActive ? 600 : 500,
                    boxShadow: isActive
                      ? "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
                      : "none",
                  }}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <span style={{ flexShrink: 0 }}>{item.icon}</span>
                  {!sidebarCollapsed && (
                    <span
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* ======================================================== */}
        {/* BOTTOM ACCOUNT CONTAINER AREA                            */}
        {/* ======================================================== */}
        <div
          className="dark-border-slate-800-40"
          style={{
            padding: 12,
            borderTop: "1px solid rgba(226, 232, 240, 0.4)",
            position: "relative",
          }}
          ref={accountRef}
        >
          {sidebarCollapsed ? (
            /* Collapsed: Cyan "A" Avatar Button */
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={() => setAccountContainerOpen((prev) => !prev)}
                className="hover-ring-cyan-400 cursor-pointer transition-all"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  backgroundColor: "#00838f",
                  color: "#ffffff",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                  border: "none",
                  outline: "2px solid transparent",
                }}
                title={`Account: ${user?.displayName || user?.email} (Click to open sign out)`}
              >
                A
              </button>
            </div>
          ) : (
            /* Expanded: Full Account Row */
            <button
              onClick={() => setAccountContainerOpen((prev) => !prev)}
              className="hover-bg-slate-100-70 dark-hover-bg-white-5 cursor-pointer transition-colors"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 8,
                borderRadius: 12,
                textAlign: "left",
                border: "none",
                background: "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    backgroundColor: "#00838f",
                    color: "#ffffff",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    flexShrink: 0,
                    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                  }}
                >
                  A
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    className="dark-text-white truncate"
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "#0f172a",
                    }}
                  >
                    {user?.displayName || user?.email?.split('@')[0]}
                  </div>
                  <div
                    className="dark-text-slate-400 truncate"
                    style={{ fontSize: "10px", color: "#64748b" }}
                  >
                    {user?.email}
                  </div>
                </div>
              </div>
              <ChevronRight
                style={{
                  width: 14,
                  height: 14,
                  color: "#94a3b8",
                  flexShrink: 0,
                }}
              />
            </button>
          )}

          {/* Floating Account Container with Sign Out Option */}
          {accountContainerOpen && (
            <div
              className="fade-in dark-bg-slate-900 dark-border-slate-800 dark-text-white"
              style={{
                position: "absolute",
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                color: "#0f172a",
                borderRadius: 16,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                padding: 12,
                zIndex: 50,
                ...(sidebarCollapsed
                  ? { left: 74, bottom: 12, width: 256 }
                  : { left: 8, right: 8, bottom: 64 }),
              }}
            >
              <div
                className="dark-border-slate-800"
                style={{
                  padding: 8,
                  borderBottom: "1px solid #f1f5f9",
                  marginBottom: 8,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      backgroundColor: "#00838f",
                      color: "#ffffff",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      flexShrink: 0,
                    }}
                  >
                    A
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div
                      className="dark-text-white truncate"
                      style={{
                        fontWeight: 700,
                        fontSize: "0.75rem",
                        color: "#0f172a",
                      }}
                    >
                      {user?.displayName || user?.email?.split('@')[0]}
                    </div>
                    <div
                      className="dark-text-slate-400 truncate"
                      style={{ fontSize: "10px", color: "#64748b" }}
                    >
                      {user?.email}
                    </div>
                    <div
                      className="dark-text-blue-400"
                      style={{
                        fontSize: "10px",
                        color: "#2563eb",
                        fontFamily: "'JetBrains Mono', monospace",
                        marginTop: 2,
                      }}
                    >
                      Enterprise Security Lead
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  fontSize: "0.75rem",
                }}
              >
                <button
                  onClick={() => {
                    setDashboardTab("settings");
                    setAccountContainerOpen(false);
                  }}
                  className="dark-hover-bg-white-10 dark-text-slate-300 dark-hover-text-white hover-bg-slate-100 cursor-pointer transition-colors"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 10px",
                    borderRadius: 8,
                    color: "#334155",
                    textAlign: "left",
                    border: "none",
                    background: "none",
                  }}
                >
                  <Settings style={{ width: 14, height: 14 }} />
                  <span>Workspace Preferences</span>
                </button>

                <div
                  className="dark-border-slate-800"
                  style={{
                    paddingTop: 4,
                    marginTop: 4,
                    borderTop: "1px solid #f1f5f9",
                  }}
                >
                  <button
                    onClick={() => {
                      setAccountContainerOpen(false);
                      logout();
                    }}
                    className="dark-hover-bg-rose-950-40 dark-text-rose-400 hover-bg-rose-50 cursor-pointer transition-colors"
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "6px 10px",
                      borderRadius: 8,
                      color: "#e11d48",
                      textAlign: "left",
                      fontWeight: 600,
                      border: "none",
                      background: "none",
                    }}
                  >
                    <LogOut style={{ width: 14, height: 14 }} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* ======================================================== */}
      {/* MAIN CONTENT VIEWPORT (SCROLLABLE)                       */}
      {/* ======================================================== */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
          minWidth: 0,
        }}
      >
        {/* Top Header Bar */}
        <header
          className="dark-border-slate-800 dark-bg-slate-900 transition-colors sm-px-6 lg-px-8"
          style={{
            height: 64,
            padding: "0 16px",
            borderBottom: "1px solid #e2e8f0",
            backgroundColor: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexShrink: 0,
          }}
        >
          {/* Left: Breadcrumbs */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              minWidth: 0,
            }}
          >
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg-hidden dark-text-slate-300 dark-hover-bg-slate-800 hover-bg-slate-100"
              style={{
                padding: 6,
                borderRadius: 8,
                color: "#475569",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
              aria-label="Toggle navigation drawer"
            >
              <Menu style={{ width: 20, height: 20 }} />
            </button>

            <div
              className="dark-text-slate-400"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: "0.75rem",
                color: "#64748b",
              }}
            >
              <span className="hidden sm-inline">RiskShield AI</span>
              <ChevronRight
                className="hidden sm-inline"
                style={{ width: 12, height: 12, color: "#94a3b8" }}
              />
              <span
                className="dark-text-white truncate"
                style={{ fontWeight: 600, color: "#0f172a" }}
              >
                {getBreadcrumbTitle()}
              </span>
            </div>
          </div>

          {/* Center: Global Search Input */}
          <div className="hidden md-block" style={{ flex: 1, maxWidth: 448 }}>
            <div style={{ position: "relative" }}>
              <Search
                style={{
                  width: 14,
                  height: 14,
                  color: "#94a3b8",
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <input
                type="text"
                placeholder="Search brands, package IDs, usernames, or threat indicators..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                className="dark-bg-slate-800-80 dark-border-slate-700 dark-text-slate-100 placeholder-text-slate-400 focus-ring-blue-500"
                style={{
                  width: "100%",
                  padding: "6px 16px 6px 36px",
                  fontSize: "0.75rem",
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: 8,
                  color: "#0f172a",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* Right Action Cluster */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexShrink: 0,
            }}
          >
            {/* Dark/Light Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="dark-text-slate-400 dark-hover-text-white dark-hover-bg-slate-800 dark-border-slate-800 hover-bg-slate-100 cursor-pointer transition-colors"
              style={{
                padding: 8,
                borderRadius: 8,
                color: "#64748b",
                border: "1px solid #e2e8f0",
                background: "none",
              }}
            >
              {theme === "dark" ? (
                <Sun style={{ width: 16, height: 16, color: "#fbbf24" }} />
              ) : (
                <Moon style={{ width: 16, height: 16, color: "#334155" }} />
              )}
            </button>

            {/* Notifications Center */}
            <div style={{ position: "relative" }} ref={notifRef}>
              <button
                onClick={() => setNotificationsOpen((prev) => !prev)}
                className="dark-text-slate-400 dark-hover-text-white dark-hover-bg-slate-800 hover-bg-slate-100 cursor-pointer transition-colors"
                style={{
                  padding: 8,
                  borderRadius: 8,
                  color: "#64748b",
                  position: "relative",
                  border: "none",
                  background: "none",
                }}
                aria-label="Notifications"
              >
                <Bell style={{ width: 16, height: 16 }} />
                {unreadNotificationCount > 0 && (
                  <span
                    className="dark-ring-slate-900"
                    style={{
                      position: "absolute",
                      top: 6,
                      right: 6,
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "#f43f5e",
                      boxShadow: "0 0 0 2px #ffffff",
                    }}
                  />
                )}
              </button>

              {notificationsOpen && (
                <div
                  className="fade-in dark-bg-slate-900 dark-border-slate-800 sm-w-96"
                  style={{
                    position: "absolute",
                    right: 0,
                    marginTop: 8,
                    width: 320,
                    padding: 12,
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: 12,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    zIndex: 50,
                  }}
                >
                  <div
                    className="dark-border-slate-800"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingBottom: 8,
                      marginBottom: 8,
                      borderBottom: "1px solid #f1f5f9",
                    }}
                  >
                    <span
                      className="dark-text-white"
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "#0f172a",
                      }}
                    >
                      Notifications ({unreadNotificationCount} unread)
                    </span>
                    {unreadNotificationCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="dark-text-blue-400 cursor-pointer"
                        style={{
                          fontSize: "11px",
                          color: "#2563eb",
                          border: "none",
                          background: "none",
                          padding: 0,
                        }}
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      maxHeight: 288,
                      overflowY: "auto",
                    }}
                  >
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markNotificationRead(n.id);
                          setDashboardTab(n.targetView);
                          setNotificationsOpen(false);
                        }}
                        className={`cursor-pointer transition-colors ${
                          n.isRead
                            ? "dark-bg-slate-800-40 dark-border-slate-800-60"
                            : "dark-bg-blue-950-30 dark-border-blue-900-40"
                        }`}
                        style={{
                          padding: 10,
                          borderRadius: 8,
                          border: n.isRead
                            ? "1px solid #f1f5f9"
                            : "1px solid #dbeafe",
                          backgroundColor: n.isRead
                            ? "#f8fafc"
                            : "rgba(239, 246, 255, 0.5)",
                          textAlign: "left",
                          opacity: n.isRead ? 0.8 : 1,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            fontSize: "10px",
                            color: "#94a3b8",
                          }}
                        >
                          <span
                            className="dark-text-slate-200"
                            style={{ fontWeight: 600, color: "#1e293b" }}
                          >
                            {n.title}
                          </span>
                          <span
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                            }}
                          >
                            {n.timestamp}
                          </span>
                        </div>
                        <p
                          className="dark-text-slate-300 line-clamp-2"
                          style={{
                            fontSize: "0.75rem",
                            color: "#475569",
                            marginTop: 4,
                            margin: 0,
                          }}
                        >
                          {n.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Section Page Area (Only this container scrolls) */}
        <main
          className="sm-p-6 lg-p-8"
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "24px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {children}
        </main>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="lg-hidden"
          style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex" }}
        >
          <div
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(15, 23, 42, 0.6)",
              backdropFilter: "blur(4px)",
            }}
          />

          <div
            style={{
              position: "relative",
              width: 256,
              maxWidth: 320,
              backgroundColor: "#131314",
              color: "#cbd5e1",
              padding: 16,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              zIndex: 10,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: 16,
                  borderBottom: "1px solid #26262a",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                  }}
                >
                  <Shield style={{ width: 20, height: 20, color: "#3b82f6" }} />
                  <span>RiskShield AI</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    padding: 4,
                    color: "#94a3b8",
                    border: "none",
                    background: "none",
                  }}
                >
                  <X style={{ width: 20, height: 20 }} />
                </button>
              </div>

              <div
                style={{
                  marginTop: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={
                      dashboardTab === item.id
                        ? ""
                        : "hover-text-white hover-bg-white-5"
                    }
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 12px",
                      borderRadius: 8,
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      textAlign: "left",
                      border: "none",
                      backgroundColor:
                        dashboardTab === item.id ? "#2563eb" : "transparent",
                      color: dashboardTab === item.id ? "#ffffff" : "#94a3b8",
                    }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div
              style={{
                paddingTop: 16,
                borderTop: "1px solid #26262a",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                className="truncate"
                style={{ fontSize: "0.75rem", color: "#94a3b8" }}
              >
                {user?.displayName || user?.email?.split('@')[0]}
              </span>
              <button
                onClick={logout}
                style={{
                  fontSize: "0.75rem",
                  color: "#fb7185",
                  fontWeight: 600,
                  border: "none",
                  background: "none",
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
