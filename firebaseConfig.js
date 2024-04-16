import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDX_kuMYisGFm4Wm7ziXlsSmWs75twtmpg",
  authDomain: "inquiryapp-552a6.firebaseapp.com",
  projectId: "inquiryapp-552a6",
  storageBucket: "inquiryapp-552a6.appspot.com",
  messagingSenderId: "321967052832",
  appId: "1:321967052832:web:6b26346b93ec6442e28445",
  measurementId: "G-LF7K3QMXMT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };