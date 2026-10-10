import re

with open(r"c:\Users\Aryan\OneDrive\Desktop\hack\src\components\dashboard\DashboardLayout.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add Admin item to navItems conditionally based on userRole
# We need to get userRole from useApp() first
if "userRole," not in content:
    content = content.replace(
        "const {\n    dashboardTab,",
        "const {\n    userRole,\n    dashboardTab,"
    )

# Now inject the Admin navigation item logic
# Instead of modifying navItems directly which is a const array, we can rebuild it dynamically.
nav_logic = """
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
    {
      id: "scans",
      label: "Scan Activity",
      icon: <Activity style={{ width: 16, height: 16 }} />,
    },
    {
      id: "reports",
      label: "Reports",
      icon: <FileText style={{ width: 16, height: 16 }} />,
    },
  ];

  if (userRole === "admin") {
    navItems.push({
      id: "admin",
      label: "Admin Management",
      icon: <Shield style={{ width: 16, height: 16 }} />,
    });
  }
"""

content = re.sub(r'  const navItems = \[.*?\];', nav_logic, content, flags=re.DOTALL)

with open(r"c:\Users\Aryan\OneDrive\Desktop\hack\src\components\dashboard\DashboardLayout.jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("DashboardLayout navItems updated.")
