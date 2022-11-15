const Weather = async () => {
        var city = 'Toronto';
        var country = 'Canada';
        var apiKey = `86ac319fd4bfefb560a238da054cc1fd`;
        
        const response = await fetch(`
        https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${process.env.REACT_APP_API_KEY}`);
        const responseData = await response.json();
        console.log(responseData)
        return responseData;
    
}

export default Weather;