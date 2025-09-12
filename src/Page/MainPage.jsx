import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import MainBody from "../components/MainBody";

function MainPage() {
  const [wheatherData, setWheatherData] = useState();
  const [headerData,setHeaderData]=useState({});
  const [infoData,setInfoData]=useState({});
  const location="udaipur";

  useEffect(() => {
    //Using the name of the city we are getting the city cordination
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1`)
      //In this then we are converting response into data
      .then((location) => location.json())
      //now we are extracting the cordination from the data and call the api for all information
      .then((locationJson) => {
        let locationCoordination = locationJson.results[0];

        //Now calling the main api

        return fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${locationCoordination.latitude}&longitude=${locationCoordination.longitude}&current=temperature_2m,apparent_temperature,weathercode,wind_speed_10m,precipitation_probability&hourly=uv_index&forecast_days=1`
        );
      })
      //Convert the call response into data
      .then((res) => res.json())
      .then((data) => {
        /// now we find responsive index of the data from currentTime using the time given in the current field of data

        let currentTimeIndex = data.hourly.time.indexOf(
          data.current.time.slice(0, 14) + "00"
        );

        //now using currentTimeInde we will get that hours respectively uv_index

        let CurrentUvIndex = data.hourly.uv_index[currentTimeIndex];

        data.current.current_uv_index = CurrentUvIndex;
        
        localStorage.setItem("wheatherData", JSON.stringify(data));
        //now store the current whether data into local storage
        setWheatherData(data);
      })
      
      .catch((err) => console.log(err));

      //getting the wheather data from local storage and set it to wheatherData
      let WheatherData=(JSON.parse(localStorage.getItem("wheatherData")));
      setHeaderData({city:location,wheatherCode:WheatherData.current.weathercode,temperature:WheatherData.current.temperature_2m,temp_unit:WheatherData.current_units.temperature_2m});
      setInfoData({realFeel:WheatherData.current.apparent_temperature,percepitation:WheatherData.current.precipitation_probability,uv_index:WheatherData.current.current_uv_index,windSpeed:WheatherData.current.wind_speed_10m,wheatherCode:WheatherData.current.weathercode});
  }, []);
  return (
    <div className="w-full flex flex-col gap-3">
      <Header data={headerData}/>
      <MainBody infoData={infoData} />
    </div>
  );
}

export default MainPage;
