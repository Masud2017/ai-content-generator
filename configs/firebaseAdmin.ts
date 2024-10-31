import "server-only";

const { initializeApp, applicationDefault, cert,getApps,ServiceAcount } = require('firebase-admin/app');

const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');



const serviceAccount = {
    authProviderX509CertUrl: process.env.auth_provider_x509_cert_url || '',
    authUri: process.env.auth_uri || '',
    clientEmail: process.env.client_email || '',
    clientId: process.env.client_id || '',
    clientX509CertUrl: process.env.client_x509_cert_url || '',
    privateKey: process.env.private_key || '',
    privateKeyId: process.env.private_key_id || '',
    projectId: process.env.project_id || '',
    tokenUri: process.env.token_uri || '',
    type: process.env.type || '',
    universeDomain: process.env.universe_domain || '',
  };
  

console.log("Size of app :  "+getApps().length);
if (getApps().length == 0) {
    initializeApp({
        credential: cert("google.json")
        // credential : cert(serviceAccount)
    });
}



export const firebaseFireStore = getFirestore(); 
