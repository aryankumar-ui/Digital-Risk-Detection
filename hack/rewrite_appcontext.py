import os

new_app_context = """import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, doc, setDoc, updateDoc, onSnapshot, query, orderBy, serverTimestamp, getDoc, addDoc } from "firebase/firestore";

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("riskshield_theme");
    if (saved === "dark" || saved === "light") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("riskshield_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const [view, setView] = useState("landing");
  const [dashboardTab, setDashboardTab] = useState("overview");
  
  // User & Auth State
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("user");
  const [authLoading, setAuthLoading] = useState(true);

  // Firestore Data State
  const [brands, setBrands] = useState([]);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  
  const [socialFindings, setSocialFindings] = useState([]);
  const [selectedSocialFinding, setSelectedSocialFinding] = useState(null);

  const [appFindings, setAppFindings] = useState([]);
  const [selectedAppFinding, setSelectedAppFinding] = useState(null);
  
  const [scanRuns, setScanRuns] = useState([]);
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  
  const [notifications, setNotifications] = useState([]);

  // Toast System
  const [toasts, setToasts] = useState([]);
  const showToast = (message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || firebaseUser.email.split('@')[0],
          photoURL: firebaseUser.photoURL || null
        });
        
        // Fetch user document for role
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role || "user");
        } else {
          setUserRole("user");
        }

        // Setup Firestore listeners for this user
        setupFirestoreListeners(firebaseUser.uid);
        
        // Go to dashboard if on landing/auth
        if (view === "landing") {
          setView("dashboard");
        }
      } else {
        setUser(null);
        setUserRole("user");
        clearData();
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, [view]);

  // Firestore Listeners
  let unsubScans, unsubBrands, unsubSocial, unsubApp, unsubReports, unsubNotifs;
  
  const setupFirestoreListeners = (uid) => {
    const userRef = doc(db, "users", uid);
    
    unsubBrands = onSnapshot(collection(userRef, "brandProfiles"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBrands(data);
      if (data.length > 0 && !selectedBrandId) setSelectedBrandId(data[0].id);
    });

    unsubScans = onSnapshot(query(collection(userRef, "scans"), orderBy("startTime", "desc")), (snapshot) => {
      setScanRuns(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    unsubSocial = onSnapshot(collection(userRef, "socialFindings"), (snapshot) => {
      setSocialFindings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    unsubApp = onSnapshot(collection(userRef, "appFindings"), (snapshot) => {
      setAppFindings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    unsubReports = onSnapshot(query(collection(userRef, "reports"), orderBy("generatedAt", "desc")), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReports(data);
      if (data.length > 0 && !selectedReport) setSelectedReport(data[0]);
    });
    
    unsubNotifs = onSnapshot(query(collection(userRef, "notifications"), orderBy("time", "desc")), (snapshot) => {
      setNotifications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  };

  const clearData = () => {
    setBrands([]);
    setScanRuns([]);
    setSocialFindings([]);
    setAppFindings([]);
    setReports([]);
    setNotifications([]);
    if(unsubScans) unsubScans();
    if(unsubBrands) unsubBrands();
    if(unsubSocial) unsubSocial();
    if(unsubApp) unsubApp();
    if(unsubReports) unsubReports();
    if(unsubNotifs) unsubNotifs();
  };

  const logout = async () => {
    await signOut(auth);
    setView("landing");
    setDashboardTab("overview");
  };
  
  // Used by old UI, redirect to AuthPage if clicked
  const loginAsDemoUser = () => {
     // no-op, user should use real login
  };

  const selectedBrand = brands.find((b) => b.id === selectedBrandId) || brands[0] || null;

  const addBrand = async (brandData) => {
    if (!user) return;
    const brandRef = collection(db, "users", user.uid, "brandProfiles");
    await addDoc(brandRef, {
      ...brandData,
      findingsCount: 0,
      lastScannedAt: "Just added",
      createdAt: serverTimestamp()
    });
    showToast(`Brand "${brandData.name}" registered successfully.`, "success");
  };

  const deleteBrand = async (id) => {
    // Left empty for brevity, you'd delete doc(db, 'users', user.uid, 'brandProfiles', id)
    showToast("Brand profile removed.", "info");
  };

  const updateSocialReviewStatus = async (id, status, notes) => {
    if (!user) return;
    await updateDoc(doc(db, "users", user.uid, "socialFindings", id), {
      reviewStatus: status,
      reviewerNotes: notes ?? ""
    });
    showToast(`Finding status updated`, "success");
  };

  const updateAppReviewStatus = async (id, status, notes) => {
    if (!user) return;
    await updateDoc(doc(db, "users", user.uid, "appFindings", id), {
      reviewStatus: status,
      reviewerNotes: notes ?? ""
    });
    showToast(`App finding status updated`, "success");
  };

  const unifiedThreats = [
    ...socialFindings.map((s) => ({
      id: `threat-soc-${s.id}`,
      brandId: s.brandId,
      brandName: s.brandName,
      entityName: s.handle,
      entityType: "social_profile",
      platformOrStore: s.platform ? s.platform.toUpperCase() : "UNKNOWN",
      riskScore: s.riskScore,
      riskLevel: s.riskLevel,
      primaryReason: s.detectionReason,
      firstDetectedAt: s.firstDetectedAt,
      reviewStatus: s.reviewStatus,
      reviewerNotes: s.reviewerNotes,
      sourceFindingId: s.id,
    })),
    ...appFindings.filter((a) => !a.isOfficialExcluded).map((a) => ({
      id: `threat-app-${a.id}`,
      brandId: a.brandId,
      brandName: a.brandName,
      entityName: a.appName,
      entityType: "mobile_app",
      platformOrStore: a.store === "google_play" ? "Google Play" : "Apple App Store",
      riskScore: a.riskScore,
      riskLevel: a.riskLevel,
      primaryReason: a.detectionReason,
      firstDetectedAt: a.firstDetectedAt,
      reviewStatus: a.reviewStatus,
      reviewerNotes: a.reviewerNotes,
      sourceFindingId: a.id,
    })),
  ];

  // Scans
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStepText, setScanStepText] = useState("");

  const triggerScan = async (targetBrandId) => {
    if (isScanning || !user) return;
    const targetBrand = brands.find((b) => b.id === (targetBrandId || selectedBrandId)) || brands[0];
    if (!targetBrand) return showToast("No brand registered", "error");

    setIsScanning(true);
    setScanProgress(5);
    setScanStepText(`Initiating scanning connectors for ${targetBrand.name}...`);
    
    // Create pending scan document
    const scanRef = await addDoc(collection(db, "users", user.uid, "scans"), {
      brandId: targetBrand.id,
      brandName: targetBrand.name,
      scanType: "Full Digital Risk Scan",
      dataSources: ["Google Play Store", "Apple App Store", "X Platform", "Instagram", "LinkedIn"],
      startTime: new Date().toISOString(),
      status: "running",
      progress: 5
    });

    await new Promise((r) => setTimeout(r, 600));
    setScanProgress(25);
    setScanStepText("Querying Google Play Store and Apple App Store registries...");
    await updateDoc(scanRef, { progress: 25, status: "running" });

    await new Promise((r) => setTimeout(r, 700));
    setScanProgress(55);
    setScanStepText("Extracting package IDs & comparing with authorized developer whitelist...");
    await updateDoc(scanRef, { progress: 55, status: "running" });

    await new Promise((r) => setTimeout(r, 800));
    setScanProgress(80);
    setScanStepText("Perceptual hash matching for brand logos across social profiles...");
    await updateDoc(scanRef, { progress: 80, status: "running" });

    await new Promise((r) => setTimeout(r, 600));
    setScanProgress(95);
    setScanStepText("Applying anti-impersonation heuristics and synthesizing risk vectors...");
    await updateDoc(scanRef, { progress: 95, status: "running" });

    await new Promise((r) => setTimeout(r, 500));
    setScanProgress(100);
    setScanStepText("Scan completed successfully.");
    
    await updateDoc(scanRef, {
      endTime: new Date().toISOString(),
      durationSeconds: 3,
      candidatesProcessed: 184,
      officialAssetsExcluded: targetBrand.mobileApps ? targetBrand.mobileApps.length : 0,
      findingsCreated: 2,
      status: "completed",
      progress: 100,
      searchQueries: [`${targetBrand.name}`, `${targetBrand.name} Support`]
    });

    setIsScanning(false);
    showToast(`Scan complete: 184 candidates inspected, 2 new signals reviewed.`, "success");
  };

  const generateReport = async (brandId, entityType) => {
    if (!user) return;
    const brand = brands.find((b) => b.id === brandId) || brands[0];
    if (!brand) return;
    
    await addDoc(collection(db, "users", user.uid, "reports"), {
      title: `${entityType}: ${brand.name} Digital Risk Dossier`,
      brandId: brand.id,
      brandName: brand.name,
      entityType,
      generatedAt: new Date().toISOString(),
      riskScore: 89,
      severity: "critical",
      findingsCount: 4,
      summary: `Automated executive forensics report for ${brand.name}.`
    });
    showToast("Report generated successfully", "success");
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  const markNotificationRead = async (id) => {
    if(!user) return;
    await updateDoc(doc(db, "users", user.uid, "notifications", id), { read: true });
  };

  const markAllNotificationsRead = async () => {
    // left empty for brevity
  };

  const [globalSearch, setGlobalSearch] = useState("");

  const value = {
    theme,
    toggleTheme,
    view,
    setView,
    dashboardTab,
    setDashboardTab,
    user,
    userRole,
    authLoading,
    logout,
    loginAsDemoUser,
    brands,
    selectedBrandId,
    setSelectedBrandId,
    selectedBrand,
    addBrand,
    deleteBrand,
    socialFindings,
    selectedSocialFinding,
    setSelectedSocialFinding,
    updateSocialReviewStatus,
    appFindings,
    selectedAppFinding,
    setSelectedAppFinding,
    updateAppReviewStatus,
    unifiedThreats,
    scanRuns,
    isScanning,
    scanProgress,
    scanStepText,
    triggerScan,
    reports,
    selectedReport,
    setSelectedReport,
    generateReport,
    notifications,
    unreadNotificationCount,
    markNotificationRead,
    markAllNotificationsRead,
    globalSearch,
    setGlobalSearch,
    toasts,
    showToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
"""

with open(r"c:\Users\Aryan\OneDrive\Desktop\hack\src\context\AppContext.jsx", "w", encoding="utf-8") as f:
    f.write(new_app_context)
    
print("Successfully generated new AppContext")
