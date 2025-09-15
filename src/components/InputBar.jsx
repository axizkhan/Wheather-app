// import js from "@eslint/js";
import React from "react";

function InputBar({ setShowInput,setCoords }) {
  function handleCross() {
    setShowInput(false);
  }
  function handleSearch(e) {
    e.preventDefault();
    const input = document.getElementById("input-search");
    if(input.value){
        const url =
      `https://us1.locationiq.com/v1/search/structured?county=${input.value}&format=json&key=pk.de1dff9abf31bfbf59c0e773ab42fa6d`;
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
    
        localStorage.setItem("coordsofSearch",JSON.stringify({latitude:json[0].lat,longitude:json[0].lon}))
        console.log(json);
        setCoords({latitude:json[0].lat,longitude:json[0].lon});
        // console.log(setCoords,"In input box");
      })
      .catch((err) => console.error(err));
      return;
    }
        alert("Enter City Name");
    
  }
  return (
    <div className="flex items-center justify-center">
      <form action="" onSubmit={handleSearch}>
        <div
        className="flex rounded-[30px]  w-[600px] h-[60px] bg-[#F5B747]  px-4"
        
      >
        <button type="submit">
          <i className="fa-solid fa-magnifying-glass text-[#2B261D] text-2xl"></i>
        </button>
        <input
          type="text"
          placeholder="Enter City"
          className="w-[90%] ml-2 font-white border-0 outline-0 text-2xl text-white"
          id="input-search"
        />

        <button className="text-2xl cursor-pointer" onClick={handleCross}>
          <i className="fa-solid fa-xmark text-[#2B261D]"></i>
        </button>
      </div>
      </form>
    </div>
  );
}

export default InputBar;
