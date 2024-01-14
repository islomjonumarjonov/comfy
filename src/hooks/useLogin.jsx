import React, { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { login } from "../features/cartSlice";

function useLogin() {
  const [isPending, setIsPending] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const logIn = (email, password) => {
    setIsPending(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(login(user));
        setIsPending(false);
        toast.success("You just login!");
      })
      .catch((error) => {
        const errorMessage = error.error.message;
        setError(errorMessage);
        toast.error(errorMessage);
      });
  };

  return { logIn, error, user, isPending };
}

export default useLogin;
