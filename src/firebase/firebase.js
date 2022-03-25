import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  deleteField,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyC5I1TQyHSXpKIyD84w4_m5rOn18PdSZQU",
  authDomain: "dictionary-3c90f.firebaseapp.com",
  projectId: "dictionary-3c90f",
  storageBucket: "dictionary-3c90f.appspot.com",
  messagingSenderId: "523829874991",
  appId: "1:523829874991:web:1db98b1c0ce218267751da",
});
const db = getFirestore(firebaseApp);
const auth = getAuth();

export function addNewUser(email, password) {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => resolve(userCredential.user))
      .catch((error) => reject(error));
  });
}

export function login(email, password) {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => resolve(userCredential.user))
      .catch((error) => reject(error));
  });
}

export function getRefDoc(nameDocument) {
  return doc(db, "words", nameDocument);
}
export function getRefCollection() {
  return collection(db, "words");
}

export async function fetchThemes() {
  const themes = [];
  const catalogBooksReference = collection(db, "words");
  const docSnap = await getDocs(catalogBooksReference);
  docSnap.forEach((value) => themes.push(value.id));
  return themes;
}

export async function deleteWord(nameDoc, nameWord) {
  const cityRef = doc(db, "words", nameDoc);

  // Remove the 'capital' field from the document
  await updateDoc(cityRef, {
    [nameWord]: deleteField(),
  });
}

export async function addNewWord(nameDoc, englishWord, russianWord) {
  await updateDoc(doc(db, "words", nameDoc), {
    [englishWord]: russianWord,
  });
}

export async function addNewTheme(nameDoc) {
  await setDoc(doc(db, "words", nameDoc), {});
}

export async function deleteTheme(nameTheme) {
  await deleteDoc(doc(db, "words", nameTheme));
}
