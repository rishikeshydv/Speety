import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../firebase/config";
// import { AuthenticationContext } from '../context/AuthenticationContext'

// User data type interface
interface UserType {
  email: string | null;
  uid: string | null;
}

// Create auth context
const AuthContext = createContext({});

export function useAuth(){
  return useContext(AuthContext);
}

// Create the auth context provider
const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  // Define the constants for the user and loading state
  const [user, setUser] = useState<UserType>({ email: null, uid: null });
  const [userLoggedIn, setUserLoggedIn] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(true);
  const router = useRouter();
  // Update the state depending on auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

function initializeUser(user: any) {
    // if (user) {
      router.push("/auth/signin");
      setUser({ ...user });
      setUserLoggedIn(true);
    // } else {
    //   setUser({
    //     email: null,
    //     uid: null,
    //   });
    //   setUserLoggedIn(false);
    // }
    setLoading(false);
  }

  const value = {
    user,
    userLoggedIn,
    loading,
  };

  //   // Sign up the user
  //   const signUp = (email: string, password: string) => {
  //     return createUserWithEmailAndPassword(auth, email, password);
  //   };

  //   // Login the user
  //   const logIn = (email: string, password: string) => {
  //     return signInWithEmailAndPassword(auth, email, password);
  //   };

  //   // Logout the user
  //   const logOut = async () => {
  //     setUser({ email: null, uid: null });
  //     return await signOut(auth);
  //   };

  // Wrap the children with the context provider
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
export { AuthContextProvider, AuthContext };
