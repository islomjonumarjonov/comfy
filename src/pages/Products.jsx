import React, { useRef, useState } from "react";
import { useFetch } from "../hooks/useFetch";

// import { usePrice } from "../hooks/usePrice";
import { useDispatch, useSelector } from "react-redux";

//icons
import { MdWindow, MdOutlineMenu } from "react-icons/md";

//components
import ProductGrid from "../components/ProductGrid";
import ProductLine from "../components/ProductLine";
import Form from "../components/Form";

function Products() {
  const { formResults } = useSelector((store) => store.cartState);
  const { data } = useFetch(
    `${
      !formResults
        ? `https://strapi-store-server.onrender.com/api/products`
        : `https://strapi-store-server.onrender.com/api/products?search=${
            formResults[0].text ? formResults[0].text : "s"
          }&category=${formResults[0].category.toLowerCase()}&company=${formResults[0].company.toLowerCase()}&order=${
            formResults[0].sort
          }&price=${formResults[0].price}&shipping=${
            formResults[0].shipping == "on" ? "true" : "false"
          }`
    }`
  );

  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <Form />
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
    </div>
  );
}

export default Products;
