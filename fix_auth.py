import re

with open(r"c:\Users\Aryan\OneDrive\Desktop\hack\src\components\auth\AuthPage.jsx", "r", encoding="utf-8") as f:
    content = f.read()

pattern = re.compile(r'\{/\* Sign In / Sign Up Mode Switch \*/\}.*?</div>\s*<form', re.DOTALL)

replacement = """{/* Sign In / Sign Up Mode Switch */}
                <div
                  className="dark-bg-slate-900 dark-border-slate-800"
                  style={{
                    display: "flex",
                    backgroundColor: "#f1f5f9",
                    padding: 4,
                    borderRadius: 8,
                    border: "1px solid #e2e8f0",
                    marginBottom: 8,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setAuthMode("signin")}
                    className="transition-colors cursor-pointer"
                    style={{
                      flex: 1,
                      padding: "8px 0",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      textAlign: "center",
                      borderRadius: 6,
                      backgroundColor:
                        authMode === "signin"
                          ? theme === "dark"
                            ? "#1e293b"
                            : "#ffffff"
                          : "transparent",
                      color:
                        authMode === "signin"
                          ? theme === "dark"
                            ? "#ffffff"
                            : "#0f172a"
                          : theme === "dark"
                          ? "#94a3b8"
                          : "#64748b",
                      boxShadow:
                        authMode === "signin"
                          ? "0 1px 3px rgba(0,0,0,0.1)"
                          : "none",
                      border: "none",
                      outline: "none",
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMode("signup")}
                    className="transition-colors cursor-pointer"
                    style={{
                      flex: 1,
                      padding: "8px 0",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      textAlign: "center",
                      borderRadius: 6,
                      backgroundColor:
                        authMode === "signup"
                          ? theme === "dark"
                            ? "#1e293b"
                            : "#ffffff"
                          : "transparent",
                      color:
                        authMode === "signup"
                          ? theme === "dark"
                            ? "#ffffff"
                            : "#0f172a"
                          : theme === "dark"
                          ? "#94a3b8"
                          : "#64748b",
                      boxShadow:
                        authMode === "signup"
                          ? "0 1px 3px rgba(0,0,0,0.1)"
                          : "none",
                      border: "none",
                      outline: "none",
                    }}
                  >
                    Sign Up
                  </button>
                </div>

                <form"""

new_content = pattern.sub(replacement, content)

with open(r"c:\Users\Aryan\OneDrive\Desktop\hack\src\components\auth\AuthPage.jsx", "w", encoding="utf-8") as f:
    f.write(new_content)

print("AuthPage updated!")
