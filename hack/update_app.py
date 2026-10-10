import re

with open(r"c:\Users\Aryan\OneDrive\Desktop\hack\src\App.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add imports
imports = """import { AcceptInvitePage } from "./components/auth/AcceptInvitePage";
import { AdminManagementView } from "./components/dashboard/AdminManagementView";"""
content = content.replace('import { Toast } from "./components/common/Toast";', f'import {{ Toast }} from "./components/common/Toast";\n{imports}')

# Add route for AcceptInvitePage
# It should check window.location.pathname right inside AppContent
app_content_start = """const AppContent = () => {
  const { view, dashboardTab, setView, theme, toggleTheme } = useApp();

  // Route override for invite accept
  if (window.location.pathname === "/invite/accept") {
    return (
      <>
        <AcceptInvitePage />
        <Toast />
      </>
    );
  }
"""
content = content.replace("""const AppContent = () => {
  const { view, dashboardTab, setView, theme, toggleTheme } = useApp();""", app_content_start)

# Add rendering for AdminManagementView
dashboard_views = """        {dashboardTab === "settings" && <SettingsView />}
        {dashboardTab === "admin" && <AdminManagementView />}"""
content = content.replace('{dashboardTab === "settings" && <SettingsView />}', dashboard_views)

with open(r"c:\Users\Aryan\OneDrive\Desktop\hack\src\App.jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated App.jsx successfully.")
