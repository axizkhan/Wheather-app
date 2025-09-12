import React from "react";

export default function ActivityArea() {
  return (
    <div className="bg-[#DEAB4D] px-12 rounded-4xl pt-5 pb-8 flex flex-col gap-8 ">
      <div
        className="flex items-baseline gap-2"
      >
        <img src="heart.svg" alt="" className="w-[21.88px] h-[18.13px]" />
        <h1 className="text-white text-[24px] font-normal">
          Activities in your area
        </h1>
      </div>
      <div className="flex gap-10">
        <figure>
            <img src="./park.jpg" alt="park" className="h-[108px] w-[178.85] rounded-xl" />
            <figcaption className="text-[12px] font-medium">2km away</figcaption>
        </figure>
        <figure >
            <img src="./beach.jpg" alt="park" className="h-[108px] w-[178.85] rounded-xl object-fill" />
            <figcaption className="text-[12px] font-medium">2km away</figcaption>
        </figure>
        <figure>
            <img src="./waterpark.jpg" alt="park" className="h-[108px] w-[178.85] rounded-xl" />
            <figcaption className="text-[12px] font-medium">2km away</figcaption>
        </figure>
        <figure>
            <img src="./beach.jpg" alt="park" className="h-[108px] w-[178.85] rounded-xl" />
            <figcaption className="text-[12px] font-medium">2km away</figcaption>
        </figure>
      </div>
    </div>
  );
}
