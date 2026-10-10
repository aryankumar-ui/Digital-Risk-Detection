const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('./service-account-key.json');

initializeApp({
  credential: cert(serviceAccount)
});

async function listUsersAndProvision() {
  try {
    const listUsersResult = await getAuth().listUsers(1);
    if (listUsersResult.users.length === 0) {
      console.log("No users found.");
      return;
    }
    const emailToProvision = listUsersResult.users[0].email;
    console.log("Found user:", emailToProvision);
    
    const userRecord = listUsersResult.users[0];
    
    // Set custom claim
    await getAuth().setCustomUserClaims(userRecord.uid, { admin: true });
    
    // Update role in Firestore using set with merge to create it if it doesn't exist
    await getFirestore().collection("users").doc(userRecord.uid).set({
      role: "admin",
      email: userRecord.email,
      updatedAt: FieldValue.serverTimestamp()
    }, { merge: true });
    
    console.log(`Successfully provisioned ${emailToProvision} as an administrator.`);
    
  } catch (error) {
    console.error("Error provisioning admin:", error.message);
  }
}

listUsersAndProvision();
