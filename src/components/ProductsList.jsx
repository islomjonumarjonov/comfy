import React, { useRef, useState } from "react";

import { useFetch } from "../hooks/useFetch";

//icons
import { MdWindow, MdOutlineMenu } from "react-icons/md";

//redux
import { addItem } from "../features/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import ProductGrid from "./ProductGrid";
import ProductLine from "./ProductLine";

function ProductsList() {
  //   const { cartItems } = useSelector((store) => store.cartState);
  //   const dispatch = useDispatch();
  const { data } = useFetch(
    "https://strapi-store-server.onrender.com/api/products"
  );

  const [toggle, setToggle] = useState(false);

  return (
    <div>
      {data && (
        <div>
          <div className="flex justify-between mb-3 items-center">
            <p>{data.data.length} products</p>
            <div className="text-2xl flex gap-3 items-center">
              <button
                className={`${!toggle ? "circle" : ""} p-2`}
                onClick={() => {
                  setToggle(false);
                }}
              >
                <MdWindow />
              </button>
              <button
                className={`${toggle ? "circle" : ""} p-2`}
                onClick={() => {
                  setToggle(true);
                }}
              >
                <MdOutlineMenu />
              </button>
            </div>
          </div>
          <hr />
          {!toggle && <ProductGrid />}
          {toggle && <ProductLine />}
        </div>
      )}
    </div>
  );
}

export default ProductsList;
