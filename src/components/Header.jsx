import React from "react";
import { climateCode } from "../utils/climate";
import { iconBundler } from "../utils/icons";

export default function Header({ data }) {
  const wheatherDiscription = climateCode(data.wheatherCode);
  const city=data.city?data.city[0].toUpperCase()+data.city.slice(1):"";
  return (
    <div className="flex flex-row w-full text-[#ffffff] font-inter justify-between px-[40px] pt-[20px]">
      <div className="  flex flex-col gap-18">
        <div className="flex flex-col ">
          <div className=" flex items-baseline gap-2">
            <img src="./location.svg" alt="" className="h-[25px] w-[18px]" />
            <p className="text-[24px]">{city}</p>
            <img src="./arrow.svg" className="h-[19px] w-[19px]" />
          </div>
          <h1 className="text-[48px] font-medium">{`${
            wheatherDiscription[0].toUpperCase() + wheatherDiscription.slice(1)
          }`}</h1>
        </div>

        <div className=" flex flex-col">
          <p className="text-[64px] font-medium">
            {data.temperature}
            {data.temp_unit}
          </p>
          <span className="text-[18px] font-medium">
            {new Date().toLocaleString("en-GB", { weekday: "long" })} |{" "}
            {new Date().toLocaleString("en-GB", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
      <div className=" flex items-center justify-center">
        <img
          src={iconBundler[wheatherDiscription]}
          alt=""
          className="h-[254.3px] w-[321px] "
        />
      </div>
    </div>
  );
}
