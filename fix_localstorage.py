import re

with open(r"c:\Users\Aryan\OneDrive\Desktop\hack\src\context\AppContext.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Change initial view
content = content.replace('const [view, setView] = useState("landing");', 'const [view, setView] = useState(localStorage.getItem("isLoggedIn") === "true" ? "dashboard" : "landing");')

# Set local storage on login
login_hook = """        // Fetch user document for role"""
login_hook_replacement = """        localStorage.setItem("isLoggedIn", "true");
        
        // Fetch user document for role"""
content = content.replace(login_hook, login_hook_replacement)

# Remove local storage on logout
logout_hook = """      } else {
        setUser(null);
        setUserRole("user");
        clearData();
      }"""
logout_hook_replacement = """      } else {
        localStorage.removeItem("isLoggedIn");
        if (view === "dashboard") setView("landing");
        setUser(null);
        setUserRole("user");
        clearData();
      }"""
content = content.replace(logout_hook, logout_hook_replacement)

with open(r"c:\Users\Aryan\OneDrive\Desktop\hack\src\context\AppContext.jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("AppContext localStorage caching added.")
