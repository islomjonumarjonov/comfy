import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { usePrice } from "../hooks/usePrice";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

function ProductGrid() {
  const dispatch = useDispatch();
  const { formResults } = useSelector((store) => store.cartState);

  const [page, setPage] = useState(1);
  const { data } = useFetch(
    `${
      !formResults
        ? `https://strapi-store-server.onrender.com/api/products?page=${page}`
        : `https://strapi-store-server.onrender.com/api/products?search=${
            formResults[0].text ? formResults[0].text : "s"
          }&category=${formResults[0].category.toLowerCase()}&company=${formResults[0].company.toLowerCase()}&order=${
            formResults[0].sort
          }&price=${formResults[0].price}&shipping=${
            formResults[0].shipping == "on" ? "true" : "false"
          }`
    }`
  );

  // ("https://strapi-store-server.onrender.com/api/products?search=chic&category=All&company=Al&order=a-z&price=100000&shipping=true");

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-4">
        {data &&
          data.data.map((i) => {
            return (
              <Link
                to={`/singleProduct/${i.id}`}
                key={i.id}
                className="card shadow-xl link-hover"
              >
                <img
                  className="h-[192px] object-cover mt-4 mx-4 rounded"
                  src={i.attributes.image}
                  alt=""
                />
                <div className="flex flex-col gap-4 items-center my-4">
                  <h3>{i.attributes.title}</h3>
                  <p>{usePrice(i.attributes.price)}</p>
                </div>
              </Link>
            );
          })}
      </div>
      <div className="flex justify-end">
        <button
          className={`${page == 1 ? "btn bg-warning" : "btn"}`}
          onClick={() => setPage(1)}
        >
          1
        </button>
        <button
          className={`${page == 2 ? "btn bg-warning" : "btn"}`}
          onClick={() => setPage(2)}
        >
          2
        </button>
        <button
          className={`${page == 3 ? "btn bg-warning" : "btn"}`}
          onClick={() => setPage(3)}
        >
          3
        </button>
      </div>
    </div>
  );
}

export default ProductGrid;
