const admin = require("firebase-admin");

// IMPORTANT: Replace the path to your service account key file.
// Do NOT commit the service account key to version control.
const serviceAccount = require("./service-account-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const args = process.argv.slice(2);
const emailToProvision = args[0];

if (!emailToProvision) {
  console.error("Please provide the email address to provision as admin.");
  console.error("Usage: node provision-initial-admin.js admin@example.com");
  process.exit(1);
}

async function provisionAdmin() {
  try {
    const userRecord = await admin.auth().getUserByEmail(emailToProvision);
    
    // Set custom claim
    await admin.auth().setCustomUserClaims(userRecord.uid, { admin: true });
    
    // Update role in Firestore if you use users collection for roles
    await admin.firestore().collection("users").doc(userRecord.uid).update({
      role: "admin",
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`Successfully provisioned ${emailToProvision} as an administrator.`);
    console.log("Please instruct the user to sign out and sign back in to refresh their claims.");
  } catch (error) {
    console.error("Error provisioning admin:", error.message);
  }
}

provisionAdmin();
