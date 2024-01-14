import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import TopNav from "../components/TopNav";

function RootLayout() {
  return (
    <>
      <div>
        <TopNav />
        <Navbar />
        <main className="container">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default RootLayout;
