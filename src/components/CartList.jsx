import React, { useRef, useState, useEffect } from "react";

import { getCartFromLocalStorage } from "../features/cartSlice";
import { generateAmountOptions, usePrice } from "../hooks/usePrice";
import { MdDelete } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../features/cartSlice";

import { editProduct, calculateTotals } from "../features/cartSlice";
import { Link } from "react-router-dom";

function CartList() {
  const { cartTotal, shipping, tax, orderTotal } = useSelector(
    (store) => store.cartState
  );
  const dispatch = useDispatch();

  const [reload, setReload] = useState(null);
  const clcThunk = async (dispatch) => {
    useEffect(() => {
      dispatch(calculateTotals());
    }, [reload]);
  };

  clcThunk(dispatch);
  const amount = useRef();
  const { localOrder, qty } = JSON.parse(localStorage.getItem("cart"));
  return (
    <div className="lg:flex gap-5">
      <div>
        <p>{localOrder.length} products</p>
        <div className="flex flex-col-reverse gap-5 my-10">
          {localOrder &&
            localOrder.map((i) => {
              return (
                <div
                  onMouseMoveCapture={() => {
                    dispatch(calculateTotals());
                  }}
                  key={i.id}
                  className="flex gap-10 shadow-md rounded items-start p-5"
                >
                  <img
                    src={i.image}
                    alt=""
                    className="w-32 h-32 rounded object-cover"
                  />
                  <div className="flex justify-between gap-10 w-full">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-medium">{i.title}</h3>
                      <p className="text-slate-400">{i.company}</p>
                    </div>
                    <div className="flex gap-40">
                      <div>
                        <span className="label-text">Amount</span>
                        <select
                          onChange={() => {
                            const newData = {
                              image: i.image,
                              price: i.price,
                              title: i.title,
                              cartId: i.cartId,
                              company: i.company,
                              amount: +amount.current.value,
                              id: i.id,
                            };

                            dispatch(editProduct(newData));
                            setReload(Math.random());
                          }}
                          ref={amount}
                          defaultValue={i.amount}
                          className="select select-bordered w-full max-w-xs my-5"
                        >
                          {generateAmountOptions(20)}
                        </select>
                      </div>
                      <div className="flex flex-col gap-6 items-center">
                        <p>{usePrice(i.price)}</p>
                        <button
                          className="cursor-pointer text-red-500"
                          onClick={() => {
                            dispatch(deleteProduct(i.id));
                            setReload(Math.random());
                          }}
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {qty && (
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
          <Link to="/checkout" className="btn btn-info">
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
}

export default CartList;
