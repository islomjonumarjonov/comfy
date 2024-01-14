import React from "react";
import { Link } from "react-router-dom";
import Featured from "../components/Featured";

// import { toast } from "react-toastify";
let html = document.querySelector("html");

function Home() {
  return (
    <div>
      <div className="flex items-center justify-between py-10">
        <div className="max-w-[530px] flex flex-col gap-8 items-start">
          <h2 className="text-[60px] font-bold h2">
            We are changing the way people shop
          </h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
            repellat explicabo enim soluta temporibus asperiores aut obcaecati
            perferendis porro nobis.
          </p>
          <Link to="/products" className="btn btn-info items text-white">
            OUR PRODUCTS
          </Link>
        </div>
        <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box hidden lg:flex">
          <div className="carousel-item h-[448px]">
            <img
              src="https://react-vite-comfy-store-v2.netlify.app/assets/hero1-deae5a1f.webp"
              className="rounded-box object-cover"
            />
          </div>
          <div className="carousel-item h-[448px] w-80">
            <img
              src="https://react-vite-comfy-store-v2.netlify.app/assets/hero2-2271e3ad.webp"
              className="rounded-box object-cover"
            />
          </div>
          <div className="carousel-item h-[448px] w-80">
            <img
              src="https://react-vite-comfy-store-v2.netlify.app/assets/hero3-a83f0357.webp"
              className="rounded-box object-cover"
            />
          </div>
          <div className="carousel-item h-[448px] w-80">
            <img
              src="https://react-vite-comfy-store-v2.netlify.app/assets/hero4-4b9de90e.webp"
              className="rounded-box object-cover"
            />
          </div>
        </div>
      </div>
      <Featured />
    </div>
  );
}

export default Home;
