"use client";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import MY_APP from "@/configs/Firebase/firebaseConfig";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import {
  COLLECTION_NAMES,
  INITIAL_BOX_SHADOW,
  USER_ACCESS_TOKEN,
  USER_DATA,
} from "@/constant/appConstant";
import { clearCookie, createCookie, getCookie } from "@/utils/utils";
import toast from "react-hot-toast";
import { useConstantValues } from "@/hooks/Constant/useConstantValues";

const FirebaseContext = createContext();

const FirebaseProvider = ({ children }) => {
  // REACT ROUTER
  const router = useRouter();
  const pathname = usePathname();

  const { updateBoxShadow } = useConstantValues();

  // FIREBASE
  const auth = getAuth(MY_APP);
  const googleProvider = new GoogleAuthProvider();
  const DATABASE = getFirestore(MY_APP);

  // states
  const [isLoading, setIsLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState(null);
  const [isShadowStoring, setIsShadowStoring] = useState(false);
  const [userBoxShadowData, setUserBoxShadowData] = useState([]);
  const [isFetchingList, setIsFetchingList] = useState(false);
  const [isShadowDetails, setIsShadowDetails] = useState(true);
  const [shadowDetails, setShadowDetails] = useState(null);

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

  const logoutUser = async ({ showToast = true }) => {
    await signOut(auth)
      .then(() => {
        setUser(null);
        clearCookie(USER_ACCESS_TOKEN);
        clearCookie(USER_DATA);
        router.push("/login");
        if (showToast) {
          toast.success("Logged out successfully");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {});
    clearCookie(USER_ACCESS_TOKEN);
    clearCookie(USER_DATA);
  };

  const removeUser = async () => {
    try {
      await logoutUser({ showToast: false });
    } catch (error) {}
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

  const storeBoxShadowInCollection = async ({ boxShadow, isPublic, id }) => {
    setIsShadowStoring(true);

    try {
      const boxShadowCollectionRef = collection(
        DATABASE,
        COLLECTION_NAMES.BOX_SHADOW
      );
      const boxShadowDocRef = doc(boxShadowCollectionRef, "boxShadowArray");
      const boxShadowSnapshot = await getDoc(boxShadowDocRef);

      const newBoxShadowData = {
        id,
        userId: user?.uid ?? auth?.currentUser?.uid,
        boxShadow,
        isPublic,
        createdAt: new Date().valueOf(),
      };

      if (boxShadowSnapshot.exists()) {
        // Get existing data
        const existingData = boxShadowSnapshot.data().boxShadowArray || [];

        // Check if the item exists in the array
        const index = existingData.findIndex((item) => item.id === id);

        if (index !== -1) {
          // Update the existing entry
          existingData[index] = { ...existingData[index], ...newBoxShadowData };
        } else {
          // Add a new entry
          existingData.push(newBoxShadowData);
        }

        // Update the document with the modified array
        await updateDoc(boxShadowDocRef, { boxShadowArray: existingData });
      } else {
        // If no document exists, create a new one with the array
        await setDoc(boxShadowDocRef, { boxShadowArray: [newBoxShadowData] });
      }

      setIsShadowStoring(false);
    } catch (error) {
      setIsShadowStoring(false);
    }
  };

  const getBoxShadowData = async () => {
    setIsFetchingList(true);
    try {
      const boxShadowCollectionRef = collection(
        DATABASE,
        COLLECTION_NAMES.BOX_SHADOW
      );
      const boxShadowDocRef = doc(boxShadowCollectionRef, "boxShadowArray");

      const boxShadowSnapshot = await getDoc(boxShadowDocRef);

      if (boxShadowSnapshot.exists()) {
        const boxShadowArray = boxShadowSnapshot.data().boxShadowArray || [];

        // Filter the array for the current logged-in user
        const currentUser = user?.uid ?? auth?.currentUser?.uid;
        const userBoxShadows = boxShadowArray.filter(
          (item) => item.userId === currentUser
        );
        setUserBoxShadowData(userBoxShadows);
      }
      setIsFetchingList(false);
    } catch (error) {
      setIsFetchingList(false);
    }
  };

  const getShadowById = async (id) => {
    setIsShadowDetails(true);
    try {
      const boxShadowCollectionRef = collection(
        DATABASE,
        COLLECTION_NAMES.BOX_SHADOW
      );
      const boxShadowDocRef = doc(boxShadowCollectionRef, "boxShadowArray");
      const boxShadowSnapshot = await getDoc(boxShadowDocRef);

      if (boxShadowSnapshot.exists()) {
        const boxShadowArray = boxShadowSnapshot.data().boxShadowArray || [];
        const shadowDetails = boxShadowArray.find((item) => item.id === id);
        if (shadowDetails) {
          setShadowDetails(shadowDetails);
          updateBoxShadow(shadowDetails.boxShadow);
        } else {
          setShadowDetails(null);
        }
      } else {
        setShadowDetails(null);
      }
      setIsShadowDetails(false);
    } catch (error) {
      setIsShadowDetails(false);
    }
  };

  useEffect(() => {
    updateBoxShadow(INITIAL_BOX_SHADOW);
  }, [pathname]);

  useEffect(() => {
    isUserExist();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user && !accessToken) {
      removeUser();
    }
    // eslint-disable-next-line
  }, [user, accessToken]);

  const values = {
    firebaseMethods: {
      signUpWithGoogle,
      logoutUser,
      storeBoxShadowInCollection,
      getBoxShadowData,
      getShadowById,
    },
    states: {
      isLoading,
      user,
      loader,
      accessToken,
      isShadowStoring,
      isFetchingList,
      userBoxShadowData,
      isShadowDetails,
      shadowDetails,
    },
  };

  return (
    <FirebaseContext.Provider value={values}>
      {children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseContext, FirebaseProvider };
