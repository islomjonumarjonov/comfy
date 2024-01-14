import React from "react";

//react-icons
import NavLg from "./NavLg";
import Nav from "./Nav";

function Navbar() {
  return (
    <div>
      <div
        className={`hidden lg:flex ${
          document.querySelector("html").getAttribute("data-theme") == "coffee"
            ? "bg-zinc-900"
            : "bg-slate-200"
        }`}
      >
        <NavLg />
      </div>
      <div
        className={`lg:hidden ${
          document.querySelector("html").getAttribute("data-theme") == "coffee"
            ? "bg-zinc-900"
            : "bg-slate-200"
        }`}
      >
        <Nav />
      </div>
    </div>
  );
}

export default Navbar;
