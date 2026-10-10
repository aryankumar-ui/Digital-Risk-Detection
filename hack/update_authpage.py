import re

with open(r"c:\Users\Aryan\OneDrive\Desktop\hack\src\components\auth\AuthPage.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add imports
imports = """import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Shield, Eye, EyeOff, ArrowLeft, Sparkles } from "lucide-react";
import { auth, googleProvider, db } from "../../lib/firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  sendEmailVerification,
  sendPasswordResetEmail 
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";"""

content = re.sub(
    r'import React.*?from "lucide-react";', 
    imports, 
    content, 
    flags=re.DOTALL
)

# 2. Replace auth handlers
handlers = """  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }
    setEmailError("");
    setIsLoading(true);

    try {
      if (authMode === "signup") {
        // Validation
        if (password.length < 6) {
          showToast("Password must be at least 6 characters", "error");
          setIsLoading(false);
          return;
        }
        
        // Create account
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Send verification
        await sendEmailVerification(user);
        
        // Create profile
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          role: "user",
          emailVerified: user.emailVerified,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        
        showToast("Account created! Please check your email to verify.", "success");
        // Force logout until verified (optional, but requested: prevent unverified access)
        auth.signOut();
        setAuthMode("signin");
      } else {
        // Sign In
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        if (!user.emailVerified) {
          showToast("Please verify your email before signing in.", "error");
          auth.signOut();
          setIsLoading(false);
          return;
        }
        
        // Load data happens in AppContext via onAuthStateChanged
        showToast("Signed in successfully", "success");
      }
    } catch (error) {
      console.error(error);
      showToast(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      
      // Check if user document exists
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          role: "user",
          emailVerified: user.emailVerified,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      showToast("Signed in with Google successfully", "success");
    } catch (error) {
      console.error(error);
      showToast(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendReset = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }
    setEmailError("");
    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      showToast(`Password recovery link sent to ${email}`, "success");
      setActiveForm("signin");
    } catch (error) {
      console.error(error);
      showToast(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };"""

content = re.sub(
    r'  const handleSignIn = \(e\).*?  const handleSendReset = \(e\) => \{.*?  \};',
    handlers,
    content,
    flags=re.DOTALL
)

# 3. Modify Google Button onClick
content = content.replace('onClick={() => loginAsDemoUser()}', 'onClick={handleGoogleLogin}')

# 4. Remove Microsoft Button
microsoft_pattern = re.compile(r'<button[^>]*>\s*<svg[^>]*>\s*<path[^>]*/>\s*<path[^>]*/>\s*<path[^>]*/>\s*<path[^>]*/>\s*</svg>\s*<span>Microsoft</span>\s*</button>', re.DOTALL)
content = microsoft_pattern.sub('', content)

# Also fix the grid to just be 1 column for the Google button so there's no weird empty space
content = content.replace('gridTemplateColumns: "repeat(2, minmax(0, 1fr))"', 'gridTemplateColumns: "repeat(1, minmax(0, 1fr))"')

with open(r"c:\Users\Aryan\OneDrive\Desktop\hack\src\components\auth\AuthPage.jsx", "w", encoding="utf-8") as f:
    f.write(content)

print("AuthPage updated!")
