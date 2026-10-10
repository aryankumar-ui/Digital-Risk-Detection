import os
import glob
import re

landing_dir = r"c:\Users\Aryan\OneDrive\Desktop\hack\src\components\landing"

for filepath in glob.glob(os.path.join(landing_dir, "*.jsx")):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Replacement 1: The full inline style
    content = content.replace('maxWidth: "80rem", margin: "0 auto", padding: "0 1rem"', 'padding: "0 32px"')
    
    # Replacement 2: Just maxWidth (like in HeroSection)
    # wait, if it's `maxWidth: "80rem",`, we can just replace it with `width: "100%",`
    content = content.replace('maxWidth: "80rem",', 'width: "100%",')
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print("Landing page expanded!")
