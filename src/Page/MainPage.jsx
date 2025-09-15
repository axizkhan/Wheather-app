import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import MainBody from "../components/MainBody";
import InputBar from "../components/InputBar";
// import { APIKEY } from "../../config";
import { SpinnerRoundFilled } from 'spinners-react';
const locationApiKey=import.meta.env.VITE_LOCATION_API_KEY;
const timeApiKey=import.meta.env.VITE_TIME_API_KEY;



// import js from "@eslint/js";

const date = new Date();


function MainPage() {

  
  const [WheatherData, setWheatherData] = useState();
  const [headerData, setHeaderData] = useState({});
  const [infoData, setInfoData] = useState({});
  const [showInput, setShowInput] = useState(false);
  const [city, setCity] = useState("");
  const[offset,setOffset]=useState(0);

  const [coords, setCoords] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        localStorage.setItem(
          "coords",
          JSON.stringify({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        );

        // console.log(position.coords);

        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => {
        if (JSON.parse(localStorage.getItem("coords"))) {
          setCoords(JSON.parse(localStorage.getItem("coords")));
        }
        console.log(err);
        alert("Can't access the live location try using search by city");
        setCoords({ latitude: 0, longitude: 0 });
      }
    );
  }, []);

  useEffect(() => {
    // console.log("First use effect");
    //Using the name of the city we are getting the city cordination

    let wheatherDataPresent = localStorage.getItem("wheatherData")
      ? true
      : false;
    let timeCheck =
      localStorage.getItem("recentUpdate") ==
      date.toISOString().slice(0, 14) + "00"
        ? true
        : false;
    let isCoordPresent =
      coords.latitude != null && coords.longitude != null ? true : false;

    if ((!wheatherDataPresent || !timeCheck) && isCoordPresent) {
      // console.log("Condition is working fine");
    }

    if (coords.latitude != null && coords.longitude != null) {
      const url = `https://eu1.locationiq.com/v1/reverse?lat=${coords.latitude}&lon=${coords.longitude}&zoom=10&accept-language=en&key=${locationApiKey}&format=json`;
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };

      fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
          // console.log(json);
          for (let address in json.address) {
            if (address == "postcode" || address == "country_code") continue;
            localStorage.setItem("city", json.address[address]);
            return setCity(json.address[address]);
          }

          // localStorage.setItem("coords");
        })
        .catch((err) => console.error(err));

      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m,apparent_temperature,weathercode,wind_speed_10m,precipitation_probability&hourly=uv_index&forecast_days=1`
      )
        //In this then we are converting response into data

        //Convert the call response into data
        .then((res) => res.json())
        .then((data) => {
          /// now we find responsive index of the data from currentTime using the time given in the current field of data
          // console.log("Main api request called");
          // console.log(data);
          let currentTimeIndex = data.hourly.time.indexOf(
            data.current.time.slice(0, 14) + "00"
          );

          localStorage.setItem(
            "recentUpdate",
            data.current.time.slice(0, 14) + "00"
          );

          //now using currentTimeInde we will get that hours respectively uv_index

          let CurrentUvIndex = data.hourly.uv_index[currentTimeIndex];

          data.current.current_uv_index = CurrentUvIndex;

          localStorage.setItem("wheatherData", JSON.stringify(data));
          // localStorage.setItem("todayRecentUpdate",JSON.stringify(data.current.time))

          //now store the current whether data into local storage
          setWheatherData(data);
        })

        .catch((err) => console.log(err));

      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&forecast_days=16&daily=weathercode,apparent_temperature_max,precipitation_sum,windspeed_10m_max,uv_index_max&timezone=auto`
      )
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("futureData", JSON.stringify(data));
        });
      fetch(
        `https://api.timezonedb.com/v2.1/get-time-zone?key=${timeApiKey}&format=json&by=position&lat=${coords.latitude}&lng=${coords.longitude}`
      )
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("offset", data.gmtOffset*1000);
          setOffset(data.gmtOffset*1000);
          // console.log(data);
        })
        .catch((err) => console.log(err));

      //getting the wheather data from local storage and set it to wheatherData
    }

    // console.log("First use effect");
  }, [coords, city]);

  useEffect(() => {
    // console.log("second use effect");

    if (localStorage.getItem("wheatherData")) {
      let wheatherData = JSON.parse(localStorage.getItem("wheatherData"));
      setHeaderData({
      city: location,
        wheatherCode: wheatherData.current.weathercode,
        temperature: wheatherData.current.temperature_2m,
        temp_unit: wheatherData.current_units.temperature_2m,
      
      
      });
      setInfoData({
        realFeel: wheatherData.current.apparent_temperature,
        percepitation: wheatherData.current.precipitation_probability,
        uv_index: wheatherData.current.current_uv_index,
        windSpeed: wheatherData.current.wind_speed_10m,
        wheatherCode: wheatherData.current.weathercode,
      });
      // console.log(wheatherData,"Wheather useEffect");
    }
    // console.log("second use effect");
  }, [WheatherData]);


  return (
    <React.Fragment>
      {WheatherData?(<div className="w-full flex flex-col gap-3">
      <Header
        data={headerData}
        showInput={showInput}
        setShowInput={setShowInput}
        city={city}
        setCoords={setCoords}
      />
      <MainBody infoData={infoData} setShowInput={setShowInput} offset={offset} />
    </div>):(<div className="h-[100vh] w-full flex justify-center items-center">
      <SpinnerRoundFilled size={150} thickness={180} speed={150} color="rgba(255, 255, 255, 1)" />
    </div>)}
    </React.Fragment>
    
  );
}

export default MainPage;
