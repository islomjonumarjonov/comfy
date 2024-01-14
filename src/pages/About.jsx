import React from "react";

function About() {
  return (
    <div className="my-20 flex flex-col items-center gap-10">
      <div className="flex justify-start items-end gap-3">
        <h1 className="text-6xl font-bold">We love </h1>
        <p className="text-[36px] px-4 py-2 text-white bg-info rounded-2xl justify-items-start font-bold">
          comfy
        </p>
      </div>
      <p className="max-w-[700px]">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quae
        quam blanditiis vitae, dolor non eveniet ipsum voluptatibus, quia optio
        aut! Perferendis ipsa cumque ipsam nostrum reprehenderit ad illo sed
        officiis ea tempore! Similique eos minima sit porro, ratione aspernatur!
      </p>
    </div>
  );
}

export default About;
