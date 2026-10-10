import re

path_index = r"c:\Users\Aryan\OneDrive\Desktop\hack\index.html"
with open(path_index, "r", encoding="utf-8") as f:
    content = f.read()

# Add an inline script to prevent white flash before React loads
flash_prevention_script = """
    <script>
      (function() {
        try {
          var savedTheme = localStorage.getItem("riskshield_theme");
          if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        } catch (e) {}
      })();
    </script>
"""

if "riskshield_theme" not in content:
    content = content.replace('</head>', f'{flash_prevention_script}\n  </head>')

with open(path_index, "w", encoding="utf-8") as f:
    f.write(content)

print("Flash prevention script injected into index.html")
