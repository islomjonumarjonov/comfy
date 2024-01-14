import React from "react";
import { useFetch } from "../hooks/useFetch";
import { usePrice } from "../hooks/usePrice";
import { Link } from "react-router-dom";

function Featured() {
  const { data, isPending } = useFetch(
    "https://strapi-store-server.onrender.com/api/products?featured=true"
  );
  {
    data && console.log(data);
  }

  return (
    <div>
      <h2 className="text-3xl font-medium">Featured Products</h2>
      <hr />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-10">
        {isPending && (
          <span className="my-10 loading loading-ball loading-sm"></span>
        )}
        {data &&
          data.data.map((featured) => {
            return (
              <Link
                to={`/singleProduct/${featured.id}`}
                key={featured.id}
                className="card shadow-xl flex-col items-center pt-4 px-4 link-hover"
              >
                <img
                  className="w-[630px] h-[256px] md:w-[420px] md:h-[192] lg:w-[320px] lg:h-[320px] object-cover"
                  width={411}
                  height={192}
                  src={featured.attributes.image}
                  alt=""
                />
                <div className="py-4 flex flex-col gap-2 items-center">
                  <h3 className="text-xl">{featured.attributes.title}</h3>
                  <p>{usePrice(featured.attributes.price)}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default Featured;
