var actuallyUsefulWeather = {		
	weather: function (a) {		
		
		const now = new Date();
		const yy = now.getFullYear();
		const mm = now.getMonth();
		const dd = now.getDay();
		const hh = now.getHours();
		const cdate = ("" + yy + mm + dd + hh);
		
		
		var button = document.getElementById('submit-btn');
		button.addEventListener('click', function() {
		
		let city = document.getElementById('city').value;
		let state = document.getElementById('state').value;
		let unit = document.getElementById('unit').value;
			
		let url = "https://query.yahooapis.com/v1/public/yql?format=json&rnd=" + `${cdate}` + "&diagnostics=true&q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + `${city}` + "," + `${state}` + "') and u='" + `${unit}` + "'";
			
			
		var e = new XMLHttpRequest();
		return e.open("GET", encodeURI(url), true),
		e.send(null),
		e.onreadystatechange = function () {
			if (e.readyState === 4 && (e.status === 200)) {
				var d = JSON.parse(e.responseText);
				var h,
					f = d.query.results.channel,
					g = {},
					i = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"],
					k = "https://s.yimg.com/os/mit/media/m/weather/images/icons/l/44d-100567.png";
					g.title = f.item.title,
					g.temp = f.item.condition.temp,
					g.code = f.item.condition.code,
					g.todayCode = f.item.forecast[0].code,
					g.currently = f.item.condition.text,
					g.high = f.item.forecast[0].high,
					g.low = f.item.forecast[0].low,
					g.text = f.item.forecast[0].text,
					g.humidity = f.atmosphere.humidity,
					g.pressure = f.atmosphere.pressure,
					g.rising = f.atmosphere.rising,
					g.visibility = f.atmosphere.visibility,
					g.sunrise = f.astronomy.sunrise,
					g.sunset = f.astronomy.sunset,
					g.description = f.item.description,
					g.city = f.location.city,
					g.country = f.location.country,
					g.region = f.location.region,
					g.updated = f.item.pubDate,
					g.link = f.item.link,
					g.t = f.units.temperature,
					g.distance = f.units.distance,
					g.pr = f.units.pressure,
					g.speedUnits = f.units.speed,
					g.units = {
						temp: f.units.temperature,
						distance: f.units.distance,
						pressure: f.units.pressure,
						speed: f.units.speed
					},
					g.wind = {
						chill: f.wind.chill,
						direction: i[Math.round(f.wind.direction / 22.5)],
						speed: f.wind.speed
					},
					
					//f.item.condition.temp < 80 && f.atmosphere.humidity < 40 ? g.heatindex = -42.379 + 2.04901523 * f.item.condition.temp + 10.14333127 * f.atmosphere.humidity - .22475541 * f.item.condition.temp * f.atmosphere.humidity - 6.83783 * Math.pow(10, -3) * Math.pow(f.item.condition.temp, 2) - 5.481717 * Math.pow(10, -2) * Math.pow(f.atmosphere.humidity, 2) + 1.22874 * Math.pow(10, -3) * Math.pow(f.item.condition.temp, 2) * f.atmosphere.humidity + 8.5282 * Math.pow(10, -4) * f.item.condition.temp * Math.pow(f.atmosphere.humidity, 2) - 1.99 * Math.pow(10, -6) * Math.pow(f.item.condition.temp, 2) * Math.pow(f.atmosphere.humidity, 2) : g.heatindex = f.item.condition.temp,
					"3200" === f.item.condition.code ? (g.thumbnail = k, g.image = k) : (g.thumbnail = "https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/" + f.item.condition.code + "ds.png", g.image = "https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/" + f.item.condition.code + "d.png"),
					
					g.forecast = [];
					for (var j = 0; j < f.item.forecast.length; j++)
						h = f.item.forecast[j],
					"3200" === f.item.forecast[j].code ? (h.thumbnail = k, h.image = k) : (h.thumbnail = "https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/" + f.item.forecast[j].code + "ds.png", h.image = "https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/" + f.item.forecast[j].code + "d.png"),
					g.forecast.push(h);
					a.success(g) //a=>location, unit, woeid, etc, from app.js; success=>function(weather), (g)=>JSON data
					
				} else {
				a.error("There is a problem receiving the latest weather. Try again.")
			
		}
		this	//this=>XMLHttpRequest (is global) 
		}
	})
}
}
