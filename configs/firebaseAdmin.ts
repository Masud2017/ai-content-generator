import "server-only";

const { initializeApp, applicationDefault, cert,getApps } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

console.log("Size of app :  "+getApps().length);
if (getApps().length == 0) {
    initializeApp({
        credential: cert("google.json")
    });
}



export const firebaseFireStore = getFirestore(); 
