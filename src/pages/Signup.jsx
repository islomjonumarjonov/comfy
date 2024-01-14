import React, { useRef } from "react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";

function Signup() {
  const { signup, error, user, isPending } = useSignup();
  const displayName = useRef();
  const email = useRef();
  const password = useRef();
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    signup(
      displayName.current.value,
      email.current.value,
      password.current.value
    );

    form.current.value = "";
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        ref={form}
        className="card gap-5 shadow-xl w-[35%] items-center mx-auto my-10 p-5"
      >
        <h2 className="text-3xl font-bold">Register</h2>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Username</span>
          </div>
          <input
            type="text"
            ref={displayName}
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            type="email"
            ref={email}
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            ref={password}
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <button className="btn btn-info">Register</button>
        <p>
          Already a member?{" "}
          <a href="login" className="link-info">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
