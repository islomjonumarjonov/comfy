import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { login } from "../features/cartSlice";

function useSignup() {
  const [isPending, setIsPending] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const signup = (displayName, email, password) => {
    setIsPending(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await updateProfile(auth.currentUser, {
          displayName,
        });
        const user = userCredential.user;
        dispatch(login(user));
        setUser(user);
        setIsPending(false);
        toast.success("You are just signed up!");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        console.log(errorMessage);
        toast.error(errorMessage);
      });
  };

  return { user, error, signup, isPending };
}

export default useSignup;
