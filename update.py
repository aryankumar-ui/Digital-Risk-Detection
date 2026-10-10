import re

with open(r"c:\Users\Aryan\OneDrive\Desktop\hack\src\components\auth\AuthPage.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Insert components before 'export const AuthPage'
new_components = """
const DecorativeDiamond = ({ opacity, delay }) => (
  <div
    className="dark-bg-slate-800 dark-border-slate-700 transition-colors"
    style={{
      width: "100%",
      height: "100%",
      backgroundColor: "#e2e8f0",
      borderRadius: 28,
      border: "1px solid #cbd5e1",
      opacity: opacity,
      animation: `fadeIn 1s ease-out ${delay}s both`,
    }}
  />
);

const FeatureDiamond = ({ title, description, imageSrc, delay }) => (
  <div
    className="dark-bg-slate-900 dark-border-slate-700 transition-colors hover-scale-105"
    style={{
      width: "100%",
      height: "100%",
      backgroundColor: "#ffffff",
      borderRadius: 28,
      boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)",
      border: "1px solid #cbd5e1",
      position: "relative",
      animation: `zoomIn95 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s both`,
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "70%",
        height: "70%",
        transform: "translate(-50%, -50%) rotate(-45deg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div style={{ width: 64, height: 64, marginBottom: 12, borderRadius: 16, overflow: "hidden", border: "2px solid #e2e8f0", flexShrink: 0, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}>
         <img src={imageSrc} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt={title} />
      </div>
      <h3 className="dark-text-white" style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a", marginBottom: 6, lineHeight: 1.2 }}>{title}</h3>
      <p className="dark-text-slate-400" style={{ fontSize: "0.75rem", color: "#64748b", margin: 0, lineHeight: 1.4 }}>{description}</p>
    </div>
  </div>
);
"""
content = content.replace("export const AuthPage = () => {", new_components + "\nexport const AuthPage = () => {")

# 2. Remove Theme Toggle
theme_pattern = re.compile(r"\{\/\* Absolute Theme Toggle for Login Page \*\/\}.*?<\/div>", re.DOTALL)
content = theme_pattern.sub("", content)

# 3. Replace Left Column
left_col_pattern = re.compile(r"\{\/\* LEFT COLUMN: LARGE DIAMOND MESH & CONTENT \*\/\}.*?<\/div>\s*\{\/\* RIGHT COLUMN: SLIDING ANIMATION BETWEEN SIGN IN & FORGOT \*\/\}", re.DOTALL)

new_left_col = """{/* LEFT COLUMN: LARGE DIAMOND MESH & CONTENT */}
        <div
          className="lg-col-span-6 hidden lg-flex dark-bg-slate-950"
          style={{
            position: "relative",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            backgroundColor: "#f8fafc",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) rotate(45deg)",
              display: "grid",
              gridTemplateColumns: "repeat(4, 280px)",
              gridTemplateRows: "repeat(4, 280px)",
              gap: 24,
            }}
          >
            {/* Row 1 */}
            <DecorativeDiamond opacity={0.1} delay={0.1} />
            <DecorativeDiamond opacity={0.3} delay={0.2} />
            <DecorativeDiamond opacity={0.2} delay={0.3} />
            <DecorativeDiamond opacity={0.1} delay={0.4} />

            {/* Row 2 */}
            <DecorativeDiamond opacity={0.4} delay={0.2} />
            <FeatureDiamond 
              title="AI Brand Sensor"
              description="Real-time logo matching and brand intelligence."
              imageSrc="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=200&q=80"
              delay={0.4}
            />
            <FeatureDiamond 
              title="Rogue App Shield"
              description="Detect suspicious apps and publisher mismatches."
              imageSrc="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=200&q=80"
              delay={0.5}
            />
            <DecorativeDiamond opacity={0.4} delay={0.3} />

            {/* Row 3 */}
            <DecorativeDiamond opacity={0.3} delay={0.3} />
            <FeatureDiamond 
              title="Social Radar"
              description="Discover impersonation accounts and fraudulent profiles."
              imageSrc="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=200&q=80"
              delay={0.5}
            />
            <FeatureDiamond 
              title="Official Whitelist"
              description="Recognize trusted assets and reduce false alerts."
              imageSrc="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=200&q=80"
              delay={0.6}
            />
            <DecorativeDiamond opacity={0.5} delay={0.4} />

            {/* Row 4 */}
            <DecorativeDiamond opacity={0.1} delay={0.4} />
            <DecorativeDiamond opacity={0.3} delay={0.5} />
            <DecorativeDiamond opacity={0.4} delay={0.6} />
            <DecorativeDiamond opacity={0.1} delay={0.7} />
          </div>

          {/* Logo overlay floating on top left */}
          <div style={{ position: "absolute", top: 32, left: 32, zIndex: 20, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 32, backgroundColor: "#2563eb", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Shield style={{ width: 16, height: 16, color: "#fff" }} />
            </div>
            <span className="dark-text-white" style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a" }}>
              RiskShield <span style={{ color: "#2563eb" }}>AI</span>
            </span>
          </div>

          <button
            onClick={() => setView("landing")}
            className="hover-bg-slate-100 dark-hover-bg-slate-800 transition-all cursor-pointer dark-text-slate-300 dark-border-slate-700"
            style={{
              position: "absolute",
              bottom: 32,
              left: 32,
              zIndex: 20,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              borderRadius: 8,
              border: "1px solid #cbd5e1",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(4px)",
              color: "#334155",
              fontWeight: 600,
              fontSize: "0.875rem",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
            }}
          >
            <ArrowLeft style={{ width: 16, height: 16 }} />
            <span>Return to Landing Page</span>
          </button>
        </div>
        {/* RIGHT COLUMN: SLIDING ANIMATION BETWEEN SIGN IN & FORGOT */}"""

content = left_col_pattern.sub(new_left_col, content)

with open(r"c:\Users\Aryan\OneDrive\Desktop\hack\src\components\auth\AuthPage.jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Done")
