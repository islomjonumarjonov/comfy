import React, { useRef, useState } from "react";

import { usePrice } from "../hooks/usePrice";

//redux
import { search } from "../features/cartSlice";
import { useSelector, useDispatch } from "react-redux";

function Form() {
  const { formResults } = useSelector((store) => store.cartState);
  const dispatch = useDispatch();
  const [value, setValue] = useState(100000);

  console.log("Form results: ", formResults);

  //ref
  const form = useRef();
  const price = useRef();
  const textReq = useRef();
  const companyReq = useRef();
  const categoryReq = useRef();
  const sortReq = useRef();
  const shippingReq = useRef();
  //   console.log(companyReq.current);
  return (
    <div>
      <form
        ref={form}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 p-10 bg-info bg-opacity-10 rounded my-10"
      >
        <label>
          <div className="label">
            <span className="label-text">Search Product</span>
          </div>
          <input
            type="text"
            ref={textReq}
            placeholder="Type here"
            className="input input-bordered input-sm w-full"
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Select Category</span>
          </div>
          <select
            ref={categoryReq}
            className="select select-bordered select-sm w-full"
          >
            <option>All</option>
            <option>Tables</option>
            <option>Chairs</option>
            <option>Kids</option>
            <option>Sofas</option>
            <option>Beds</option>
          </select>
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Select Company</span>
          </div>
          <select
            ref={companyReq}
            className="select select-bordered select-sm w-full"
          >
            <option>All</option>
            <option>Modenza</option>
            <option>Luxora</option>
            <option>Artifex</option>
            <option>Comfora</option>
            <option>Homestead</option>
          </select>
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Sort by</span>
          </div>
          <select
            ref={sortReq}
            className="select select-bordered select-sm w-full"
          >
            <option>a-z</option>
            <option>z-a</option>
            <option>high</option>
            <option>low</option>
          </select>
        </label>
        <label>
          <div className="label">
            <span className="label-text">Select Price</span>
            <span className="label-text">{usePrice(value)}</span>
          </div>
          <input
            onChange={() => {
              setValue(price.current.value);
            }}
            ref={price}
            type="range"
            min="0"
            max="100000"
            value={value}
            step={10}
            className="range range-xs"
          />
        </label>
        <label className="flex flex-col items-center">
          <div className="label">
            <span className="label-text">Free Shipping</span>
          </div>
          <input
            ref={shippingReq}
            type="checkbox"
            className="checkbox checkbox-md"
          />
        </label>
        <button
          type="submit"
          className="btn btn-info"
          onClick={(e) => {
            e.preventDefault();
            const req = {
              text: textReq.current.value,
              company: companyReq.current.value,
              category: categoryReq.current.value,
              sort: sortReq.current.value,
              shipping: shippingReq.current.value,
              price: price.current.value,
            };

            dispatch(search(req));
            setValue(100000);
          }}
        >
          Search
        </button>
        <button
          className="btn btn-error"
          onClick={(e) => {
            e.preventDefault();
            form.current.reset();
            setValue(0);
          }}
        >
          Reset
        </button>
      </form>
    </div>
  );
}

export default Form;
