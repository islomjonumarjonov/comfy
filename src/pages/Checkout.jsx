import React from "react";
import { Link } from "react-router-dom";

import { usePrice } from "../hooks/usePrice";

import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cartSlice";

function Checkout() {
  const { cartTotal, orderTotal, tax, shipping } = useSelector(
    (store) => store.cartState
  );
  const dispatch = useDispatch();
  return (
    <div>
      <div className="my-10">
        <h2 className="text-3xl font-bold">Place Your Order</h2>
        <hr />
      </div>
      <div className="flex flex-col lg:flex-row justify-between">
        <form className="flex flex-col gap-3 w-[80%]">
          <h3>Shipping Information</h3>
          <label className="form-control w-[80%]">
            <div className="label">
              <span className="label-text">First Name</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-[80%] ">
            <div className="label">
              <span className="label-text">Address</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full "
            />
          </label>
          <div>
            <Link
              to="/"
              className="btn btn-info"
              onClick={() => {
                dispatch(clearCart());
              }}
            >
              Place Your Order
            </Link>
          </div>
        </form>
        <div>
          <div className="flex flex-col gap-3 lg:my-10 w-[400px]">
            <div className="p-5 bg-info bg-opacity-10 rounded-xl ">
              <div className="flex justify-between">
                <p className="text-sm">Subtotal</p>
                <p className="text-sm">{usePrice(cartTotal)}</p>
              </div>
              <hr />
              <div className="flex justify-between mt-5">
                <p className="text-sm">Shipping</p>
                <p className="text-sm">{usePrice(shipping)}</p>
              </div>
              <hr />
              <div className="flex justify-between mt-5">
                <p className="text-sm">Tax</p>
                <p className="text-sm">{usePrice(tax)}</p>
              </div>
              <hr />
              <div className="flex justify-between mt-5">
                <p className="px-4 lg:px-2">Order Total</p>
                <p className="">{usePrice(orderTotal)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
