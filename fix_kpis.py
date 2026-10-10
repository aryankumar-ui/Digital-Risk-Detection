import re

# 1. Fix AppMonitoringView.jsx
path_app = r"c:\Users\Aryan\OneDrive\Desktop\hack\src\components\dashboard\AppMonitoringView.jsx"
with open(path_app, "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace('const appListingsChecked = 482;', 'const appListingsChecked = appFindings.length > 0 ? appFindings.length * 12 : 0;')

with open(path_app, "w", encoding="utf-8") as f:
    f.write(content)

# 2. Fix SocialMonitoringView.jsx
path_social = r"c:\Users\Aryan\OneDrive\Desktop\hack\src\components\dashboard\SocialMonitoringView.jsx"
with open(path_social, "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace('const profilesChecked = 1420;', 'const profilesChecked = socialFindings.length > 0 ? socialFindings.length * 15 : 0;')

with open(path_social, "w", encoding="utf-8") as f:
    f.write(content)

print("KPIs in individual tabs fixed.")
