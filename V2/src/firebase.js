import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyDvDKcWGjc9L_jXXIjTHEH-t5HYUKLwoPw",
  authDomain: "netflix-clone-v2-dcd9e.firebaseapp.com",
  projectId: "netflix-clone-v2-dcd9e",
  storageBucket: "netflix-clone-v2-dcd9e.firebasestorage.app",
  messagingSenderId: "214406637382",
  appId: "1:214406637382:web:41768c56248de36676a747"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const signup = async(name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

export const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

export const logout = () => {
    signOut(auth);
}