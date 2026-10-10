import re

with open(r"c:\Users\Aryan\OneDrive\Desktop\hack\src\components\dashboard\AppMonitoringView.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# The modal starts at `{selectedAppFinding && (` and ends with `)}` at the bottom of the file.
pattern = re.compile(r'\{selectedAppFinding && \(\s*<div\s*className="fixed inset-0.*?</div>\s*\)\}', re.DOTALL)

# Let's check if the pattern exists
if pattern.search(content):
    content = pattern.sub('', content)
    # Also we should remove the onClick handler on the table rows so it doesn't do anything
    content = content.replace('onClick={() => setSelectedAppFinding(app)}', '')
    content = content.replace('cursor: "pointer",', '')
    
    with open(r"c:\Users\Aryan\OneDrive\Desktop\hack\src\components\dashboard\AppMonitoringView.jsx", "w", encoding="utf-8") as f:
        f.write(content)
    print("Removed modal successfully.")
else:
    print("Modal pattern not found.")
