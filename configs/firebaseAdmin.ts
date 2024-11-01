import "server-only";

const { initializeApp, applicationDefault, cert,getApps,ServiceAcount } = require('firebase-admin/app');

const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');



// private_key = private_key!.replace(/\\n/g, '\n');
const serviceAccount = {
    // authProviderX509CertUrl: process.env.auth_provider_x509_cert_url || '',
    // authUri: process.env.auth_uri || '',
    // clientEmail: process.env.client_email || '',
    // clientId: process.env.client_id || '',
    // clientX509CertUrl: process.env.client_x509_cert_url || '',
    // privateKey: private_key || '',
    // privateKeyId: process.env.private_key_id || '',
    // projectId: process.env.project_id || '',
    // tokenUri: process.env.token_uri || '',
    // type: process.env.type || '',
    // universeDomain: process.env.universe_domain || '',
    'auth_provider_x509_cert_url': process.env.auth_provider_x509_cert_url || '',
    'auth_uri': process.env.auth_uri || '',
    'client_email': process.env.client_email || '',
    'client_id': process.env.client_id || '',
    'client_x509_cert_url': process.env.client_x509_cert_url || '',
    'private_key': process.env!.private_key!.replace(/\\n/g, '\n') || '',
    'private_key_id': process.env.private_key_id || '',
    'project_id': process.env.project_id || '',
    'token_uri': process.env.token_uri || '',
    'type': process.env.type || '',
    'universe_domain': process.env.universe_domain || '',

  };
  

//   new Buffer(process.env.PRIVATE_KEY, 'base64').toString('ascii')
console.log("Size of app :  "+getApps().length);
if (getApps().length == 0) {
    initializeApp({
        // credential: cert("google.json")
        credential : cert(serviceAccount)
    });
}



export const firebaseFireStore = getFirestore(); 
