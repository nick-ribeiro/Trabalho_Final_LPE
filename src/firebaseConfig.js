import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, GithubAuthProvider, getAuth, signInWithPopup, signOut } from
    "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc } from
    "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDueBY8L-EnSmPldYbEbyj01FYK5ClOVGc",
  authDomain: "fir-le-afa6b.firebaseapp.com",
  projectId: "fir-le-afa6b",
  storageBucket: "fir-le-afa6b.firebasestorage.app",
  messagingSenderId: "605036505560",
  appId: "1:605036505560:web:55cecbea157461cb6e6aad",
  measurementId: "G-4HC1V67EGY"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);


const githubProvider = new GithubAuthProvider();
const signInWithGithub = async () => {
    try {
        const res = await signInWithPopup(auth, githubProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "github",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const logout = () => {
    signOut(auth);
};
export {
    auth,
    db,
    signInWithGithub,
    logout,
};