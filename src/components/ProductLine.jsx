import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { usePrice } from "../hooks/usePrice";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

function ProductGrid() {
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

  console.log(data);
  return (
    <div>
      <div className="flex flex-col gap-5 my-10">
        {data &&
          data.data.map((i) => {
            return (
              <Link
                to={`/singleProduct/${i.id}`}
                key={i.id}
                className="card shadow-xl link-hover flex-row p-8 justify-between"
              >
                <div className="flex justify-between gap-20">
                  <img
                    className="w-32 h-32 object-cover rounded"
                    src={i.attributes.image}
                    alt=""
                  />
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold text-[#394e6a]">
                      {i.attributes.title}
                    </h3>
                    <p className="text-[#c7c9d1]">{i.attributes.company}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center my-4">
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
