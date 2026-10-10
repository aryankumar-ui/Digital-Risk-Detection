import os
import glob

dashboard_dir = r"c:\Users\Aryan\OneDrive\Desktop\hack\src\components\dashboard"

for filepath in glob.glob(os.path.join(dashboard_dir, "*.jsx")):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Scale down explicit rem values
    content = content.replace('fontSize: "1.05rem"', 'fontSize: "0.9375rem"')
    content = content.replace('fontSize: "1rem"', 'fontSize: "0.875rem"')
    content = content.replace('fontSize: "0.875rem"', 'fontSize: "0.75rem"')
    
    # Scale down explicit px values
    content = content.replace('fontSize: "16px"', 'fontSize: "14px"')
    content = content.replace('fontSize: "15px"', 'fontSize: "13px"')
    content = content.replace('fontSize: "14px"', 'fontSize: "12px"')
    content = content.replace('fontSize: 16', 'fontSize: 14')
    content = content.replace('fontSize: 15', 'fontSize: 13')
    content = content.replace('fontSize: 14', 'fontSize: 12')
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print("Dashboard font sizes reverted!")
