import re

with open(r"c:\Users\Aryan\OneDrive\Desktop\hack\src\components\auth\AuthPage.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Remove email verification requirement from sign up
content = content.replace('await sendEmailVerification(user);\n        \n        // Create profile', '// Create profile')
content = content.replace('showToast("Account created! Please check your email to verify.", "success");\n        // Force logout until verified (optional, but requested: prevent unverified access)\n        auth.signOut();\n        setAuthMode("signin");', 'showToast("Account created! You are now signed in.", "success");\n        // Removed forceful logout')

# 2. Remove email verification requirement from sign in
sign_in_check = """        if (!user.emailVerified) {
          showToast("Please verify your email before signing in.", "error");
          auth.signOut();
          setIsLoading(false);
          return;
        }"""
content = content.replace(sign_in_check, '// Removed email verified check for seamless testing')

# 3. Remove Quick Demo Login Action block (lines around 765-789)
demo_login_pattern = re.compile(r'\{\/\* Direct Demo Workspace Login Action \*\/.*?</div>\s*</div>\s*<p', re.DOTALL)
content = demo_login_pattern.sub('<p', content)

with open(r"c:\Users\Aryan\OneDrive\Desktop\hack\src\components\auth\AuthPage.jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("AuthPage updated to remove demo login and email verification.")
