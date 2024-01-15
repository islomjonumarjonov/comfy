import React, { useRef } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

function Login() {
  const { logIn, error, user, isPending } = useLogin();
  const email = useRef();
  const password = useRef();
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    logIn(email.current.value, password.current.value);

    form.current.value = "";
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        ref={form}
        className="card gap-5 shadow-xl w-[90%] md:w-[35%] items-center mx-auto my-10 p-5"
      >
        <h2 className="text-3xl font-bold">Login</h2>

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
        <button className="btn btn-info">Login</button>
        <p>
          Not a member yet?{" "}
          <a href="signup" className="link-info">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
