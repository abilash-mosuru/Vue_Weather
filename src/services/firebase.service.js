import {initializeApp} from 'firebase/app';
import {getFirestore,collection,addDoc} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDod-SF1EYfGkhvklcJWIEoFdwWvd38qMs",
  authDomain: "vue-weather-app-a2d62.firebaseapp.com",
  projectId: "vue-weather-app-a2d62",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export function saveLocation(city) {
  return addDoc(collection(db, "locations"), {
    city : city,
    createdAt: new Date(),
  });
}
