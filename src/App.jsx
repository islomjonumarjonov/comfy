import React from "react";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  localStorage.setItem(
    "user",
    JSON.stringify({
      user: {
        apiKey: "AIzaSyDZI1Onim6N2GT7TxRlUIGrs0fEJbmzDhc",
        appName: "[DEFAULT]",
        createdAt: "1705271535375",
        displayName: "demo user",
        email: "dm@gmail.com",
        emailVerified: false,
        isAnonymous: false,
        lastLoginAt: "1705271535375",
        providerData: "MFIXXVlE8pYo0GsNA3trEAl3Bzr1",
      },
    })
  );
  const s = JSON.parse(localStorage.getItem("user"));
  // const { user } = useSelector((store) => store.cartState);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={s.user && s.user}>
          <RootLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/checkout",
          element: <Checkout />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/singleProduct/:id",
          element: <SingleProduct />,
        },
      ],
    },
    {
      path: "login",
      element: <>{s.user ? <Navigate to="/" /> : <Login />}</>,
    },
    {
      path: "signup",
      element: <>{s.user ? <Navigate to="/" /> : <Signup />}</>,
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
