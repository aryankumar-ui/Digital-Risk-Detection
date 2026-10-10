import re

with open(r"c:\Users\Aryan\OneDrive\Desktop\hack\src\components\dashboard\AppMonitoringView.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Let's find the start of the modal. It usually starts with something like `{selectedAppFinding && (`
idx = content.find('{selectedAppFinding && (')
if idx != -1:
    # We want to remove everything from idx to the end of the file except the very last closing tags.
    # Actually, we can just replace the whole selectedAppFinding conditional block.
    # Let's find the matching parenthesis or just use a simple regex.
    # We know the modal ends right before the main `</div>` of the component.
    # Let's just find `      {selectedAppFinding && (` and the last `    </div>\n  );\n};`
    end_idx = content.rfind('    </div>\n  );\n};')
    if end_idx != -1:
        new_content = content[:idx] + content[end_idx:]
        
        # also remove the onClick on table rows
        new_content = new_content.replace('onClick={() => setSelectedAppFinding(app)}', '')
        
        with open(r"c:\Users\Aryan\OneDrive\Desktop\hack\src\components\dashboard\AppMonitoringView.jsx", "w", encoding="utf-8") as f:
            f.write(new_content)
        print("Modal removed successfully.")
    else:
        print("Could not find end of component.")
else:
    print("Could not find {selectedAppFinding && (")
