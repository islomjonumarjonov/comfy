import React from "react";
import { Link } from "react-router-dom";

function TopNav() {
  return (
    <div className="bg-slate-950 py-2">
      <div className="container text-white text-sm flex flex-row-reverse gap-4 items-center">
        <Link className="btn">Logout/SignIn</Link>
        <h2>Hello, {}</h2>
      </div>
    </div>
  );
}

export default TopNav;
