import React from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logout } from "../features/cartSlice";

function TopNav() {
  const { user } = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  return (
    <div className="bg-slate-950 py-2">
      <div className="container text-white text-sm flex flex-row-reverse gap-4 items-center">
        <Link className="btn" onClick={() => dispatch(logout())}>
          Logout
        </Link>
        <h2>Hello, {user.displayName}</h2>
      </div>
    </div>
  );
}

export default TopNav;
