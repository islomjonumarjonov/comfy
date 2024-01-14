import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import CartList from "../components/CartList";
import { Link } from "react-router-dom";

function Cart() {
  const { localOrder } = useSelector((store) => store.cartState);

  return (
    <div>
      <div className="my-10">
        <h2 className="text-3xl font-bold">Shopping Cart</h2>
        <hr />
        {localOrder ? (
          <CartList />
        ) : (
          <p className="text-2xl font-medium text-slate-400">
            Your cart is empty, choose something{" "}
            <Link to="/products" className="underline link">
              here
            </Link>{" "}
            please
          </p>
        )}
      </div>
    </div>
  );
}

export default Cart;
