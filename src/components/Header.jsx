import React, { useEffect, useState } from "react";
import { climateCode } from "../utils/climate";
import { iconBundler } from "../utils/icons";
import InputBar from "./InputBar";

export default function Header({ data,showInput,setShowInput,city,setCoords }) {

  // const[city,setCity]=useState("");
   useEffect(() => {
      // const url =
      //   "https://eu1.locationiq.com/v1/reverse?lat=26.4062&lon=72.6791&zoom=10&accept-language=en&key=pk.de1dff9abf31bfbf59c0e773ab42fa6d&format=json";
      // const options = { method: "GET", headers: { accept: "application/json" } };
  
      // fetch(url, options)
      //   .then((res) => res.json()  )
      //   .then((json) =>{
      //     setCity(json.address.county);
      //   })
      //   .catch((err) => console.error(err));
      //  setCity("Udaipur");

    }, []);

    
  const wheatherDiscription = climateCode(data.wheatherCode);
  
  return (
    
   <React.Fragment>
      {showInput && <InputBar setShowInput={setShowInput} setCoords={setCoords} />}
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
   </React.Fragment>
  );
}
