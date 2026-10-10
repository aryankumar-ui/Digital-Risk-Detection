import re

# 1. Fix OverviewView.jsx Risk Distribution
path_overview = r"c:\Users\Aryan\OneDrive\Desktop\hack\src\components\dashboard\OverviewView.jsx"
with open(path_overview, "r", encoding="utf-8") as f:
    content = f.read()

# Add dynamic variables
dynamic_vars = """
  const allFindings = [...appFindings, ...socialFindings].filter(f => !f.isOfficialExcluded);
  const criticalCount = allFindings.filter(f => f.riskScore >= 85).length;
  const highCount = allFindings.filter(f => f.riskScore >= 70 && f.riskScore < 85).length;
  const mediumCount = allFindings.filter(f => f.riskScore >= 50 && f.riskScore < 70).length;
  const lowCount = allFindings.filter(f => f.riskScore < 50).length;
  const totalF = allFindings.length || 1;
"""
if "criticalCount =" not in content:
    content = content.replace('// Urgent threats requiring review', dynamic_vars + '\n  // Urgent threats requiring review')

# Replace hardcoded counts and widths
content = re.sub(r'>\s*2 findings\s*</span>', '>{criticalCount} findings</span>', content)
content = re.sub(r'width: "40%",', 'width: `${(criticalCount / totalF) * 100}%`,', content)

content = re.sub(r'>\s*3 findings\s*</span>', '>{highCount} findings</span>', content)
content = re.sub(r'width: "60%",', 'width: `${(highCount / totalF) * 100}%`,', content)

content = re.sub(r'>\s*1 finding\s*</span>', '>{mediumCount} finding(s)</span>', content)
content = re.sub(r'width: "25%",', 'width: `${(mediumCount / totalF) * 100}%`,', content)

content = re.sub(r'>\s*2 verified\s*</span>', '>{lowCount} verified</span>', content)
content = re.sub(r'width: "40%"\s*}\s*}\s*/>\s*</div>\s*</div>\s*</div>\s*<div', 'width: `${(lowCount / totalF) * 100}%`}}/></div></div></div><div', content)

with open(path_overview, "w", encoding="utf-8") as f:
    f.write(content)


# 2. Fix AuthPage.jsx instant redirect
path_auth = r"c:\Users\Aryan\OneDrive\Desktop\hack\src\components\auth\AuthPage.jsx"
with open(path_auth, "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace('showToast("Account created! You are now signed in.", "success");', 'showToast("Account created! You are now signed in.", "success");\n        setView("dashboard");')
content = content.replace('showToast("Signed in successfully", "success");', 'showToast("Signed in successfully", "success");\n        setView("dashboard");')
content = content.replace('showToast("Signed in with Google successfully", "success");', 'showToast("Signed in with Google successfully", "success");\n      setView("dashboard");')

with open(path_auth, "w", encoding="utf-8") as f:
    f.write(content)


# 3. Fix AppContext.jsx saving dashboardTab to localStorage
path_appcontext = r"c:\Users\Aryan\OneDrive\Desktop\hack\src\context\AppContext.jsx"
with open(path_appcontext, "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace('const [dashboardTab, setDashboardTab] = useState("overview");', 'const [dashboardTab, setDashboardTabState] = useState(localStorage.getItem("dashboardTab") || "overview");\n  const setDashboardTab = (tab) => {\n    localStorage.setItem("dashboardTab", tab);\n    setDashboardTabState(tab);\n  };')

with open(path_appcontext, "w", encoding="utf-8") as f:
    f.write(content)


# 4. Fix index.html dark background
path_index = r"c:\Users\Aryan\OneDrive\Desktop\hack\index.html"
with open(path_index, "r", encoding="utf-8") as f:
    content = f.read()

if "<style>body { background-color: #020617; }</style>" not in content:
    content = content.replace('</head>', '  <style>body { background-color: #020617; }</style>\n  </head>')

with open(path_index, "w", encoding="utf-8") as f:
    f.write(content)

print("All fixes applied successfully.")
