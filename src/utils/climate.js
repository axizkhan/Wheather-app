function climateCode(code){
    if([0,1].includes(code))
        return "sunny";
    else if([2,3,45,48,].includes(code))
        return "cloudy";
    else if([51, 53, 55, 61, 63, 80, 81].includes(code))
        return "sunny-rainy";
    else if([65, 66, 67, 71, 73, 75, 77, 82, 85, 86].includes(code))
        return "rainy";
    else if([95, 96, 99].includes(code))
        return "thunderstrom";
    return"unknown";
}

export {climateCode};