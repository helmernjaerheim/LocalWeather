var weatherObject = {
	"position": {
		"latitude": null,
		"longitude": null,
		"city": null,
		"country": null
	},
	"weather": {
		"condition": null,
		"wind": null,
		"temperature": null
	}
}

function alignImageMiddleHorizontally(ID) {
	$(ID).css({left: ($(ID).parent().width() / 2) - ($(ID).width() / 2)});
}

function getLocationAndWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        	weatherObject.position.latitude = position.coords.latitude;
			weatherObject.position.longitude = position.coords.longitude;

			getWeather(position.coords.latitude, position.coords.longitude);
        });
    } else {
        console.log("Geolocation is not supported by this browser");
    }
}

function convertFromMphToMs(mph) {
	var ms = mph * 0.44704;
	return Math.round(ms * 100) / 100
}

function convertFromFahrenheitToCelsius(fahrenheit) {
	var celsius = (fahrenheit - 32) / 1.8
	return Math.round(celsius * 100) / 100;
}

function getWeather(lat, long) {
    $.get("https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast " + 
    	"where woeid in (SELECT woeid FROM geo.places " + 
    	"WHERE text='(" + lat + "," + long + ")')&format=json", function (data) {
        
    	weatherObject.position.city = data.query.results.channel.location.city;
    	weatherObject.position.country = data.query.results.channel.location.country;
        weatherObject.weather.condition = data.query.results.channel.item.condition.text;
        weatherObject.weather.wind = convertFromMphToMs(Number(data.query.results.channel.wind.speed));
        weatherObject.weather.temperature = convertFromFahrenheitToCelsius(Number(data.query.results.channel.item.condition.temp));
    	
    	renderLocation(weatherObject.position.city, weatherObject.position.country);
    	renderTemp(weatherObject.weather.temperature);
    	renderCondition(weatherObject.weather.condition);
    });
}

function renderLocation(city, country) {
	$("#location").html(city + ", " + country);
}

function renderTemp(degrees) {
	if (degrees > 15) {
		$("#degrees").html(degrees + "&deg" + "<i class='red-text'>C</i>");
	}
	else {
		$("#degrees").html(degrees + "&deg" + "<i class='blue-text'>C</i>");
	}
}

function renderCondition(condition) {
	$("#condition").html(condition);

	switch(condition) {
		case "Cloudy": 
			console.log("day");
			renderCloudGraphics();
			break;
		case "Clear":
			renderSunGraphics();
			break;
		default:
			break;
	}
}

function renderCloudGraphics() {
	var icon = "<i id='cloud-graphics' class='wi wi-cloud huge-text'></i>";
	$("#condition-graphics").html(icon);
}

function renderSunGraphics() {
	var icon = "<i id='sun-graphics' class='wi wi-day-sunny huge-text'></i>";
	$("#condition-graphics").html(icon);
}

$(document).ready(function() {
	alignImageMiddleHorizontally("#headline");
	getLocationAndWeather(); 
}); 