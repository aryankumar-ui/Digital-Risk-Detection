import re

with open(r"c:\Users\Aryan\OneDrive\Desktop\hack\src\components\auth\AuthPage.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Update DecorativeDiamond
content = content.replace('className="dark-bg-slate-800 dark-border-slate-700 transition-colors"', 'className="diamond-dec transition-colors"')
content = content.replace('backgroundColor: "#e2e8f0",\n      borderRadius: 28,', 'borderRadius: 28,')

# Update FeatureDiamond
content = content.replace('className="dark-bg-slate-900 dark-border-slate-700 transition-colors hover-scale-105"', 'className="diamond-feature transition-colors hover-scale-105"')
content = content.replace('backgroundColor: "#ffffff",\n      borderRadius: 28,', 'borderRadius: 28,')

with open(r"c:\Users\Aryan\OneDrive\Desktop\hack\src\components\auth\AuthPage.jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated")
