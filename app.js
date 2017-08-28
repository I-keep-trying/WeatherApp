$(document).ready(function () { //background timeofday css framework
  Background.init();
  Greeting.init();
});
reallySimpleWeather.weather({
    //wunderkey: '8076a5047bcfa74f', // leave blank for Yahoo
	wunderkey: '', // leave blank for Yahoo
    location: 'Houston, TX',
    //woeid: '12590119',
    unit: 'f',
    success: function(weather) {
	  html = '<h2>'+weather.title+  '</h2>';
	  html += '<p><h3>'+weather.temp + '°'+weather.units.temp+'</p></h3>';
	  html += '<p><h3>'+weather.humidity+ '% Humidity</p></h3>';
	  html += '<p><h3>Feels like: '+weather.heatindex+'°'+weather.units.temp+'</p></h3>';
	  html += '<p><h3>Current Conditions: '+weather.currently+'</p></h3>';
	  html += '<p><h3>Wind direction: '+weather.wind.direction+' Speed:'+weather.wind.speed+' mph</p></h3>';
	  html += '<p><h3>Pressure:'+ ' '+weather.pressure + ' inches, '+ weather.rising+' change</p></h3>';
	  html += '<p><h3>Forecast: '+weather.forecast[0].text + weather.forecast[0].thumbnail + weather.forecast[0].day + weather.forecast[0].high + weather.forecast[0].low + weather.forecast[0].image+'</p></h3>';

	  document.getElementById('weather').innerHTML = html;
    },
    error: function(error) {
	  document.getElementById('weather').innerHTML = '<p>'+error+'</p>';
    }
});

var reallySimpleWeather = {

    getAltTemp: function(unit, temp) {
      if(unit === "f") {
        return Math.round((5.0/9.0)*(temp-32.0));
		} else {
        return Math.round((9.0/5.0)*temp+32.0);
		}
    },

    weather: function(options){
      options = ({
        location: "",
        woeid: "",
        unit: "f",
        success: function(weather){/*takes function passed from main*/},
        error: function(message){/*takes function passed from main*/}
      }, options);

      var now = new Date();
      var weatherUrl = "https://query.yahooapis.com/v1/public/yql?format=json&rnd=" + now.getFullYear() + now.getMonth() + now.getDay() + now.getHours() + "&diagnostics=true&q=";

      if(options.location !== "") {
        var location = "";
		// formats for latitude/longitude instead if applicable
        if(/^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)$/.test(options.location)) {
          location = "(" + options.location + ")";
		// otherwise returns location
        } else {
          location = options.location;
        }
        weatherUrl += "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + location + "') and u='" + options.unit + "'";
        // if no location, checks for WOEID (Where on Earth ID)      
	  } else if(options.woeid !== "") {
        weatherUrl += "select * from weather.forecast where woeid=" + options.woeid + " and u='" + options.unit + "'";
      } else {
        options.error("Could not retrieve weather due to an invalid location.");
        return false;
      }

	    // packages weather url for transport
        var xhr = new XMLHttpRequest();
        xhr.open("GET", encodeURI(weatherUrl));
        xhr.send(null);

        xhr.onreadystatechange = function () {
            var DONE = 4; // readyState 4 means the request is done.
            var OK = 200; // status 200 is a successful return.
            if (xhr.readyState === DONE) {
                if (xhr.status === OK)
                    var data = JSON.parse(xhr.responseText);
                    var result = data.query.results.channel,
                        weather = {},
                        forecast,
                        compass = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"],
                        image404 = "https://s.yimg.com/os/mit/media/m/weather/images/icons/l/44d-100567.png";
                weather.title = result.item.title;
                weather.temp = result.item.condition.temp;
                weather.code = result.item.condition.code;
                weather.todayCode = result.item.forecast[0].code;
                weather.currently = result.item.condition.text;
                weather.high = result.item.forecast[0].high;
                weather.low = result.item.forecast[0].low;
                weather.text = result.item.forecast[0].text;
                weather.humidity = result.atmosphere.humidity;
                weather.pressure = result.atmosphere.pressure;
                weather.rising = result.atmosphere.rising;
                weather.visibility = result.atmosphere.visibility;
                weather.sunrise = result.astronomy.sunrise;
                weather.sunset = result.astronomy.sunset;
                weather.description = result.item.description;
                weather.city = result.location.city;
                weather.country = result.location.country;
                weather.region = result.location.region;
                weather.updated = result.item.pubDate;
                weather.link = result.item.link;
                weather.units = {temp: result.units.temperature, distance: result.units.distance, pressure: result.units.pressure, speed: result.units.speed};
                weather.wind = {chill: result.wind.chill, direction: compass[Math.round(result.wind.direction / 22.5)], speed: result.wind.speed};

                if(result.item.condition.temp < 80 && result.atmosphere.humidity < 40) {
                  weather.heatindex = -42.379+2.04901523*result.item.condition.temp+10.14333127*result.atmosphere.humidity-0.22475541*result.item.condition.temp*result.atmosphere.humidity-6.83783*(Math.pow(10, -3))*(Math.pow(result.item.condition.temp, 2))-5.481717*(Math.pow(10, -2))*(Math.pow(result.atmosphere.humidity, 2))+1.22874*(Math.pow(10, -3))*(Math.pow(result.item.condition.temp, 2))*result.atmosphere.humidity+8.5282*(Math.pow(10, -4))*result.item.condition.temp*(Math.pow(result.atmosphere.humidity, 2))-1.99*(Math.pow(10, -6))*(Math.pow(result.item.condition.temp, 2))*(Math.pow(result.atmosphere.humidity,2));
                } else {
                  weather.heatindex = result.item.condition.temp;
                }

                if(result.item.condition.code == "3200") {
                  weather.thumbnail = image404;
                  weather.image = image404;
                } else {
                  weather.thumbnail = "https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/" + result.item.condition.code + "ds.png";
                  weather.image = "https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/" + result.item.condition.code + "d.png";
                }

                weather.alt = {temp: reallySimpleWeather.getAltTemp(options.unit, result.item.condition.temp), high: reallySimpleWeather.getAltTemp(options.unit, result.item.forecast[0].high), low: reallySimpleWeather.getAltTemp(options.unit, result.item.forecast[0].low)};
                if(options.unit === "f") {
                  weather.alt.unit = "c";
                } else {
                  weather.alt.unit = "f";
                }

                weather.forecast = [];
                for(var i=0;i<result.item.forecast.length;i++) {
                  forecast = result.item.forecast[i];
				  console.log(weather.forecast[0]);
                  forecast.alt = {high: reallySimpleWeather.getAltTemp(options.unit, result.item.forecast[i].high), low: reallySimpleWeather.getAltTemp(options.unit, result.item.forecast[i].low)};

                  if(result.item.forecast[i].code == "3200") {
                    forecast.thumbnail = image404;
                    forecast.image = image404;
                  } else {
                    forecast.thumbnail = "https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/" + result.item.forecast[i].code + "ds.png";
                    forecast.image = "https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/" + result.item.forecast[i].code + "d.png";
                  }

                  weather.forecast.push(forecast);
                }
                options.success(weather);

            } else {
                options.error("Yahoo is having a problem sending the latest weather. Please try again.");
            }
        };
        return this;
    },
	
};