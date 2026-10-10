import { initializeApp, cert } from "firebase-admin/app";
import { getSecurityRules } from "firebase-admin/security-rules";
import fs from "fs";

// Initialize Firebase Admin with the service account
const serviceAccount = JSON.parse(fs.readFileSync('c:/Users/Aryan/Downloads/riskshield-ai-674ab-firebase-adminsdk-fbsvc-b06d82e4d8.json', 'utf8'));

initializeApp({
  credential: cert(serviceAccount)
});

const rules = fs.readFileSync('firestore.rules', 'utf8');
const securityRules = getSecurityRules();

async function updateRules() {
  try {
    console.log("Updating Firestore rules...");
    const ruleset = await securityRules.createRuleset({
      source: {
        files: [
          {
            name: "firestore.rules",
            content: rules
          }
        ]
      }
    });
    
    await securityRules.releaseFirestoreRuleset(ruleset.name);
    console.log("Successfully updated Firestore rules!");
    process.exit(0);
  } catch (error) {
    console.error("Error updating rules:", error);
    process.exit(1);
  }
}

updateRules();
