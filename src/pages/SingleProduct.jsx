import React, { useRef, useState } from "react";

import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { generateAmountOptions, usePrice } from "../hooks/usePrice";

import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../features/cartSlice";

function SingleProduct() {
  const [d, setD] = useState(null);
  const { localOrder } = useSelector((store) => store.cartState);
  console.log("Local order from single", localOrder);
  const dispatch = useDispatch();
  const amount = useRef();
  const { id } = useParams();
  const { data } = useFetch(
    `https://strapi-store-server.onrender.com/api/products/${id}`
  );
  return (
    <div className="my-10">
      <p className="my-2">
        <Link to="/">Home</Link> {">"} <Link to="/products">Products</Link>
      </p>
      {data && (
        <div className="md:flex gap-10  md:items-start">
          <img
            src={data.data.attributes.image}
            alt={data.data.attributes.description}
            className="w-96 h-96 object-cover rounded-lg "
          />
          <div className="flex flex-col gap-3 my-10 md:my-0">
            <h1 className="text-3xl font-bold text-[#394e6a]">
              {data.data.attributes.title}
            </h1>
            <p className="text-2xl text-[#c7c9d1] font-medium">
              {data.data.attributes.company}
            </p>
            <p className="text-lg">{usePrice(data.data.attributes.price)}</p>
            <p className="text-md">{data.data.attributes.description}</p>
            <div>
              <h4>Colors</h4>
              <div className="flex gap-3">
                {data.data.attributes.colors.map((i) => {
                  //   setColor(i.slice(1));
                  return (
                    <button
                      key={i}
                      className={`bg-[#${i.slice(1)}] rounded-full`}
                    >
                      {i}
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-4 items-center">
                <span className="label-text">Amount</span>
                <select
                  ref={amount}
                  className="select select-bordered w-full max-w-xs my-5"
                >
                  {generateAmountOptions(20)}
                </select>

                <button
                  onClick={() => {
                    let newData = {
                      image: data.data.attributes.image,
                      price: data.data.attributes.price,
                      title: data.data.attributes.title,
                      cartId: data.data.attributes.cartId,
                      company: data.data.attributes.company,
                      amount: +amount.current.value,
                      id: data.data.id,
                    };
                    console.log(newData);
                    dispatch(addProduct(newData));
                    setD(Math.random());
                  }}
                  className="btn btn-info"
                >
                  Add to Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleProduct;
