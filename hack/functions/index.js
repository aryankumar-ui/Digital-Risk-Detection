const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.acceptAdminInvitation = functions.https.onCall(async (data, context) => {
  // 1. Authenticated?
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Must be logged in.");
  }

  // 2. Email Verified?
  const uid = context.auth.uid;
  const userRecord = await admin.auth().getUser(uid);
  if (!userRecord.emailVerified) {
    throw new functions.https.HttpsError("permission-denied", "Email must be verified.");
  }

  const { invitationId, token } = data;
  if (!invitationId || !token) {
    throw new functions.https.HttpsError("invalid-argument", "Missing parameters.");
  }

  return db.runTransaction(async (transaction) => {
    const inviteRef = db.collection("adminInvitations").doc(invitationId);
    const inviteSnap = await transaction.get(inviteRef);

    if (!inviteSnap.exists) {
      throw new functions.https.HttpsError("not-found", "Invitation not found.");
    }

    const inviteData = inviteSnap.data();

    // 3. Status Check
    if (inviteData.status !== "pending") {
      throw new functions.https.HttpsError("failed-precondition", "Invitation is no longer pending.");
    }

    // 4. Token Check (normally you would hash the incoming token and compare)
    // For simplicity, we assume token checking matches
    if (inviteData.token !== token) {
      throw new functions.https.HttpsError("permission-denied", "Invalid token.");
    }

    // 5. Expiry Check
    if (inviteData.expiresAt.toDate() < new Date()) {
      throw new functions.https.HttpsError("failed-precondition", "Invitation expired.");
    }

    // 6. Email Match
    if (inviteData.email.toLowerCase() !== userRecord.email.toLowerCase()) {
      throw new functions.https.HttpsError("permission-denied", "Email does not match invitation.");
    }

    // 7. Grant Admin
    await admin.auth().setCustomUserClaims(uid, { ...userRecord.customClaims, admin: true });

    // 8. Mark accepted
    transaction.update(inviteRef, {
      status: "accepted",
      acceptedBy: uid,
      acceptedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    // Update role in users collection
    transaction.update(db.collection("users").doc(uid), {
      role: "admin",
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return { success: true };
  });
});
