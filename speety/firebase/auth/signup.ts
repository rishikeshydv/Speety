import React from 'react'
import { app } from '../config'
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(app);
export default async function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
  }