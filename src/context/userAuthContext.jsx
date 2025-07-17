// contexts/UserAuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { auth,db } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";

const UserAuthContext = createContext();

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error("useUserAuth must be used within a UserAuthProvider");
  }
  return context;
};

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role,setRole]= useState(null)

  

  // Email/Password Authentication
  const signUp = async (email, password, displayName, role = "user") => {
  try {
    setError(null);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update displayName in Firebase Auth
    if (displayName) {
      await updateProfile(user, { displayName });
    }

    // Add role and other info to Firestore
    await setDoc(doc(db, "users", user.uid), {
      email,
      displayName,
      role, // Save role
      createdAt: new Date(),
    });

    toast.success("Account Created Successfully");
    return user;
  } catch (error) {
    setError(error.message);
    toast.error(error.message);
    throw error;
  }
};


 const signIn = async (email, password) => {
  try {
    setError(null);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Fetch role from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    console.log(userDoc)
    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log("User Role:", userData.role); // You can store this in context or local state
    }

    toast.success("Login Successfully");
    return user;
  } catch (error) {
    setError(error.message);
    toast.error(error.message);
    throw error;
  }
};


  // Phone Authentication
  const setUpRecaptcha = (elementId) => {
    const recaptchaVerifier = new RecaptchaVerifier(auth, elementId, {
      size: "invisible",
      callback: (response) => {
        console.log("reCAPTCHA solved");
      },
      "expired-callback": () => {
        console.log("reCAPTCHA expired");
      },
    });
    return recaptchaVerifier;
  };

  const signInWithPhone = async (phoneNumber, recaptchaVerifier) => {
    try {
      setError(null);
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptchaVerifier
      );
      return confirmationResult;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const verifyOTP = async (confirmationResult, otp) => {
    try {
      setError(null);
      const result = await confirmationResult.confirm(otp);
      return result.user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Password Reset
  const resetPassword = async (email) => {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Sign Out
  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
      toast.success("Logout successfully")
    } catch (error) {
      setError(error.message);
       toast.error(error.message)
      throw error;
    }
  };

  // Update User Profile
  const updateUserProfile = async (updates) => {
    try {
      setError(null);
      await updateProfile(auth.currentUser, updates);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Clear Error
  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    loading,
    error,
    signUp,
    signIn,
    signInWithPhone,
    verifyOTP,
    setUpRecaptcha,
    logout,
    resetPassword,
    updateUserProfile,
    clearError,
  };

  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
};
