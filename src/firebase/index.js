import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

// テスト用
// const firebaseConfig = {
//   apiKey: "AIzaSyAzVeXJNI0NClgn-wyazJNvCpP16N8kIwk",
//   authDomain: "so-test-96f0a.firebaseapp.com",
//   projectId: "so-test-96f0a",
//   storageBucket: "so-test-96f0a.appspot.com",
//   messagingSenderId: "334817468408",
//   appId: "1:334817468408:web:dee2371113dd957c60800d"
// };

// 本番用
const firebaseConfig = {
  apiKey: "AIzaSyD28riiV7hpfXY3MLDyw6wzlTzrS8rHM9A",
  authDomain: "so-web-c5883.firebaseapp.com",
  projectId: "so-web-c5883",
  storageBucket: "so-web-c5883.appspot.com",
  messagingSenderId: "462127487225",
  appId: "1:462127487225:web:3d545af4e840e6cdabaa28",
  measurementId: "G-JTZQ8PW92D"
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
console.log(analytics)

export default firebaseApp