# LocalWeather

Retrieves weather data about you current location and displays temperature and the weather condition. This is very simple, and only supports two types of conditions so far, which is clear and cloudy. Additional conditions can easily be added.

It works fine on Firexof, Google Chrome and Internet Explorer. It has not been tested on other browsers. 

### Icons

This app is using weather icons like clouds and suns. These icons can be fetched by having the following css link in your html head section: https://cdnjs.cloudflare.com/ajax/libs/weather-icons/1.3.2/css/weather-icons.min.css

Documentation of icon codewords can be found [here](https://erikflowers.github.io/weather-icons/).

### Yahoo Weather API

The Yahoo Weather API can be used to fetch data based on location. In this case a lat/long coordinate is retrieved, using [geolocation](https://www.w3schools.com/html/html5_geolocation.asp). 

The following YQL (Yahoo Query Language) call is used to get weather data based on a lat/long coordinate:

https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE text='({latitude},{longitude})')&format=json.

This query returns weather data in JSON format. 

From this data the weather condition, temperature and wind speed for the nearest city is extracted. Additionally, the name of the city and the country is also extracted.
