import React, { useEffect, useState } from "react";
// import { use } from "react";
import { climateCode } from "../utils/climate";
import { iconBundler } from "../utils/icons";


// let yesterday = new Date(new Date().setDate(new Date().getDay() - 1)).getDay()

export default function Information({Propdata,offset}) {
  const[futureData,setFutureData]=useState(JSON.parse(localStorage.getItem("futureData")));
  const [day, setDay] = useState(new Date().getDay());
  const [day_index, setDay_index] = useState(indexHandle(new Date().getDay()));
  const [time, setTime] = useState();
  const [date,setDate]=useState(0);
  
  
  // const [data,setData]=useState(Propdata);

  useEffect(() => {
    
 

    

    // fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&forecast_days=16&daily=weathercode,apparent_temperature_max,precipitation_sum,windspeed_10m_max,uv_index_max&timezone=auto`)
    // .then((res)=>res.json())
    // .then((data)=>{
    
    //   localStorage.setItem("futureData",JSON.stringify(data));
    // })

    let parseFutureDate=JSON.parse(localStorage.getItem("futureData"));
    
    // console.log(parseFutureDate);
    setFutureData(parseFutureDate);



    // setDate(parseFutureDate.daily.time[0]);

    

   
  }, []);

  useEffect(()=>{
       let Clock = setInterval(() => {
        
      setTime(getCurrentTime);
    }, 1000);

      return()=>{
      clearInterval(Clock);
     }
  },[offset])

  useEffect(()=>{
    futureData.daily.apparent_temperature_max[0]=Propdata.realFeel;
    futureData.daily.precipitation_sum[0]=Propdata.percepitation;
    futureData.daily.uv_index_max[0]=Propdata.uv_index;
    futureData.daily.weathercode[0]=Propdata.wheatherCode;
    futureData.daily.windspeed_10m_max[0]=Propdata.windSpeed;

    setFutureData(futureData);
  },[Propdata,futureData])

  useEffect(() => {
    setTime(getCurrentTime);
  }, [offset])

  const getCurrentTime = () => {
    if(offset){

      const maindate = new Date().getTime()+parseInt(offset);
      // console.log("offeset",offset);
      // console.log("date with offser",maindate);
    const date=new Date(new Date(maindate).toISOString());
    // console.log(date,"from information");
    return date.toLocaleString("en-US",{
      hour:"numeric",
      minute:"2-digit",
      hour12:true,
      timeZone:"UTC"
    })
  
    }
    return 0;
  };
  const days = [
    { day: "SUN", icon: "./info-rain.svg" },
    { day: "MON", icon: "./info-rain.svg" },
    { day: "TUE", icon: "./info-rain.svg" },
    { day: "WED", icon: "./info-rain.svg" },
    { day: "THUS", icon: "./info-rain.svg" },
    { day: "FRI", icon: "./info-rain.svg" },
    { day: "SAT", icon: "./info-rain.svg" },
  ];

  const style=[
    {p:"text-[12.4px] text-white/60",img:"w-[20.67px] h-[19.64px] "},
    {p:"text-[14.17px] text-white/80",img:"w-[24.36px] h-[24.36px]"},
    {p:"text-[17.72px] text-white",img:"w-[31.01px] h-[24.36px]"},
    {p:"text-[14.17px] text-white/80",img:"w-[24.36px] h-[24.36px] "},
    {p:"text-[12.4px] text-white/60",img:"w-[20.67px] h-[19.64px] "}
  ]

  const weekLength = 7;

  function handleRightClick() {

    //  console.log("day",day);
    // console.log("day_index",day_index);

    setDay((day) => (day + 1) % weekLength);
    setDay_index(indexHandle((day + 1) % weekLength));
    if(date>=15){
      let leftButton=document.querySelector("#next-btn");
      leftButton.disabled=true;
      // setDate(date+1);
      
    }else{
      setDate(date+1);
      let RightButton=document.querySelector("#prev-btn");
      RightButton.disabled=false;
      // console.log(iconBundler[climateCode(futureData.daily.weathercode[date])])
    }
    
    
  }

  function handleLeftClick() {
    // console.log("day",day);
    // console.log("day_index",day_index);
    
    
    
    if(date<=0){
      let leftButton=document.querySelector("#prev-btn");
      leftButton.disabled=true;
    }else{
      console.log(date-1);
      setDate(date-1);
      let leftButton=document.querySelector("#next-btn");
      leftButton.disabled=false;
    }
    setDay((day) => {
      if (day == 0) {
        setDay_index(indexHandle(6));
        return 6;
      }
      setDay_index(indexHandle(day - 1));
      return day - 1;
    });
  }

  
  return (
    <section className="flex flex-col bg-[#DEAB4D] rounded-4xl px-5 py-8 gap-10">
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-1 ">
          <button onClick={handleLeftClick} id="prev-btn">
            <img
              src="./arrow-left.svg"
              alt="arrow-left"
              className="h-[16.74px] w-[16.49px]"
            />
          </button>
          <div className=" flex items-center justify-between gap-9 w-[300px]">
            {
              day_index.map((day_id,idx)=><div className="flex flex-col items-start " key={idx}> 
              <p className={style[idx].p}>
                {days[day_id].day}
              </p>
              <img
                src={iconBundler[climateCode(futureData.daily.weathercode[date+idx])]}
                alt="rain-icon"
                className={style[idx].img}
              />
            </div>)
            }
            
          </div>
          <button onClick={handleRightClick} id="next-btn">
            <img
              src="./arrow-right.svg"
              alt="arrow-right"
              className="h-[16.74px] w-[16.49px]"
            />
          </button>
        </div>
        <div className="flex gap-1 self-center items-center text-white">
          <img src="./clock.svg" alt="" className="h-[14.4px] w-[14.4px]" />
          <p className="text-[17.12px]">
            {time}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-[14px] font-bold text-white">AIR CONDITIONS</h1>
        <div className="flex flex-col gap-12">
          <div className="flex flex-row gap-1 text-white">
            <img
              src="./thermometer.svg"
              alt="tempreture"
              className="w-[14.58px] h-[22.92px]"
            />
            <div className="flex gap-0.5 flex-col items-start">
              <p className="text-[12px] font-medium">Real Feel</p>
              <h1 className="text-[16px] font-medium ">{futureData.daily["apparent_temperature_max"][date]}°C</h1>
            </div>
          </div>
          <div className="flex flex-row gap-1 text-white">
            <img
              src="./Windy.svg"
              alt="tempreture"
              className="w-[20.31px] h-[18.75px]"
            />
            <div className="flex gap-0.5 flex-col items-start">
              <p className="text-[12px] font-medium">Wind</p>
              <h1 className="text-[16px] font-medium ">{futureData.daily["windspeed_10m_max"][date]} km/h</h1>
            </div>
          </div>
          <div className="flex flex-row gap-1 text-white">
            <img
              src="./water.svg"
              alt="tempreture"
              className="w-[16.67px] h-[21.17px]"
            />
            <div className="flex gap-0.5 flex-col items-start">
              <p className="text-[12px] font-medium">Chance of rain</p>
              <h1 className="text-[16px] font-medium ">{futureData.daily["precipitation_sum"][date]}%</h1>
            </div>
          </div>
          <div className="flex flex-row gap-1 text-white">
            <img
              src="./sun.svg"
              alt="tempreture"
              className="w-[22.4px] h-[22.4px]"
            />
            <div className="flex gap-0.5 flex-col items-start">
              <p className="text-[12px] font-medium">UV Index</p>
              <h1 className="text-[16px] font-medium ">{futureData.daily["uv_index_max"][date]}</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function indexHandle(day) {
  let day_index = [];
  // console.log(`Day_index[] value at start of function ${day_index}`)
  for (let i = -2; i <= 2; i++) {
    day_index.unshift(new Date(new Date().setDate(day - i)).getDay());
  }

  return day_index;
}
