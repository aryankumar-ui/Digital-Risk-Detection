import os
import glob
import re

dashboard_dir = r"c:\Users\Aryan\OneDrive\Desktop\hack\src\components\dashboard"

for filepath in glob.glob(os.path.join(dashboard_dir, "*.jsx")):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Scale up explicit rem values
    content = content.replace('fontSize: "0.75rem"', 'fontSize: "0.875rem"')
    content = content.replace('fontSize: "0.875rem"', 'fontSize: "1rem"')
    content = content.replace('fontSize: "0.9375rem"', 'fontSize: "1.05rem"')
    
    # Scale up explicit px values
    content = content.replace('fontSize: "12px"', 'fontSize: "14px"')
    content = content.replace('fontSize: "13px"', 'fontSize: "15px"')
    content = content.replace('fontSize: "14px"', 'fontSize: "16px"')
    content = content.replace('fontSize: 12', 'fontSize: 14')
    content = content.replace('fontSize: 13', 'fontSize: 15')
    content = content.replace('fontSize: 14', 'fontSize: 16')
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print("Dashboard font sizes increased!")
