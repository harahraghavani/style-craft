"use client";

import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import MY_APP from "@/configs/Firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import {
  COLLECTION_NAMES,
  USER_ACCESS_TOKEN,
  USER_DATA,
} from "@/constant/appConstant";
import { clearCookie, createCookie, getCookie } from "@/utils/utils";
import toast from "react-hot-toast";

const FirebaseContext = createContext();

const FirebaseProvider = ({ children }) => {
  // REACT ROUTER
  const router = useRouter();

  // FIREBASE
  const auth = getAuth(MY_APP);
  const googleProvider = new GoogleAuthProvider();
  const DATABASE = getFirestore(MY_APP);

  // states
  const [isLoading, setIsLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState(null);

  // COOKIE DATA
  const accessToken = getCookie(USER_ACCESS_TOKEN);

  const signUpWithGoogle = async () => {
    setIsLoading(true);
    await signInWithPopup(auth, googleProvider)
      .then((result) => {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            // CREATE A USER REFERENCE TO STORE THE DATA IN THE FIRESTORE
            const USER_REF = doc(DATABASE, COLLECTION_NAMES.USERS, user?.uid);

            // CHECK IF THE USER EXIST OR NOT
            const userSnapshot = await getDoc(USER_REF);
            if (!userSnapshot.exists()) {
              await setDoc(USER_REF, {
                uid: user.uid ?? "",
                name: user.displayName ?? "",
                email: user.email ?? "",
                photoURL: user.photoURL ?? "",
                createAt: new Date().valueOf(),
              });
            }
          }
        });
        createCookie(USER_ACCESS_TOKEN, result?.user?.accessToken);
        createCookie(USER_DATA, result?.user);
        router.push("/");
        toast.success(`Welcome, ${result?.user?.displayName}`);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logoutUser = async () => {
    await signOut(auth)
      .then(() => {
        setUser(null);
        clearCookie(USER_ACCESS_TOKEN);
        clearCookie(USER_DATA);
        router.push("/login");
        toast.success("Logged out successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {});
    clearCookie(USER_ACCESS_TOKEN);
    clearCookie(USER_DATA);
  };

  const isUserExist = () => {
    setLoader(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoader(false);
      } else {
        setUser(null);
        setLoader(false);
      }
    });
    setLoader(false);
  };

  useEffect(() => {
    isUserExist();
    // eslint-disable-next-line
  }, []);

  const values = {
    firebaseMethods: {
      signUpWithGoogle,
      logoutUser,
    },
    states: {
      isLoading,
      user,
      loader,
      accessToken,
    },
  };

  return (
    <FirebaseContext.Provider value={values}>
      {children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseContext, FirebaseProvider };
