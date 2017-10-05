/* $(document).ready(function () {

  Background.init();
 */

actuallyUsefulWeather.weather({  

     success: function(weather) {
      html =  '<div class="parallax-container" data-parallax="scroll" data-image-src="https://source.unsplash.com/1600x900/?storm,water"><div class="flex-container"><ul>'+weather.title +'';
	  html += '<li>Updated: '+weather.updated+'</li>';
	  html += '<ul><li>'+weather.temp+'°'+weather.t+'</li>';
      html += '<li>'+weather.city+', '+weather.region+'</li>';
      html += '<li>'+weather.currently+'</li>';
	  html += '<li>Wind: '+weather.wind.direction+' '+weather.wind.speed+' ' +weather.speedUnits+'</li>';
	  html += '<li>'+weather.humidity + ' % Humidity</li>';
	  html += '<li>Barometric Pressure: '+weather.pressure + ' Inches  </li>';
	  html += '<li>Visibility: '+weather.visibility + ' Miles </li></div></div>';
	  
	  html += '<div class="w3-content w3-display-container">';
	  html += '<div class="flex-container">Forecast';
	  html += '<div class="forecast"><ul><li>'+weather.forecast[0].day + ', '+weather.forecast[0].date + '</li>';
	  html += '<li><img src='+weather.forecast[0].image + '></li>';
	  html += '<li>High: '+weather.forecast[0].high + '</li>';
	  html += '<li>Low: '+weather.forecast[0].low + '</li>';
	  html += '<li>'+weather.forecast[0].text + '</li></ul></div>';
	  html += '<div class="forecast"><ul><li>'+weather.forecast[1].day + ', '+weather.forecast[1].date + '</li>';
	  html += '<li><img src='+weather.forecast[1].image + '></li>';
	  html += '<li>'+weather.forecast[1].high + '</li>';
	  html += '<li>'+weather.forecast[1].low + '</li>';
	  html += '<li>'+weather.forecast[1].text + '</li></ul></div>';
	  html += '<div class="forecast"><ul><li>'+weather.forecast[2].day + ', '+weather.forecast[2].date + '</li>';
	  html += '<li><img src='+weather.forecast[2].image + '></li>';
	  html += '<li>'+weather.forecast[2].high + '</li>';
	  html += '<li>'+weather.forecast[2].low + '</li>';
	  html += '<li>'+weather.forecast[2].text + '</li></ul></div>';
	  html += '<div class="forecast"><ul><li>'+weather.forecast[3].day + ', '+weather.forecast[3].date + '</li>';
	  html += '<li><img src='+weather.forecast[3].image + '></li>';
	  html += '<li>'+weather.forecast[3].high + '</li>';
	  html += '<li>'+weather.forecast[3].low + '</li>';
	  html += '<li>'+weather.forecast[3].text + '</li></ul></div>';
	  html += '<div class="forecast"><ul><li>'+weather.forecast[4].day + ', '+weather.forecast[4].date + '</li>';
	  html += '<li><img src='+weather.forecast[4].image + '></li>';
	  html += '<li>'+weather.forecast[4].high + '</li>';
	  html += '<li>'+weather.forecast[4].low + '</li>';
	  html += '<li>'+weather.forecast[4].text + '</li></ul></div>';
	  html += '<div class="forecast"><ul><li>'+weather.forecast[5].day + ', '+weather.forecast[5].date + '</li>';
	  html += '<li><img src='+weather.forecast[5].image + '></li>';
	  html += '<li>'+weather.forecast[5].high + '</li>';
	  html += '<li>'+weather.forecast[5].low + '</li>';
	  html += '<li>'+weather.forecast[5].text + '</li></ul></div>';
	  html += '<div class="forecast"><ul><li>'+weather.forecast[6].day +', '+weather.forecast[6].date + '</li>';
	  html += '<li><img src='+weather.forecast[6].image + '></li>';
	  html += '<li>'+weather.forecast[6].high + '</li>';
	  html += '<li>'+weather.forecast[6].low + '</li>';
	  html += '<li>'+weather.forecast[6].text + '</li></ul></div>';
	  html += '<div class="forecast"><ul><li>'+weather.forecast[7].day + ', '+weather.forecast[7].date + '</li>';
	  html += '<li><img src='+weather.forecast[7].image + '></li>';
	  html += '<li>'+weather.forecast[7].high + '</li>';
	  html += '<li>'+weather.forecast[7].low + '</li>';
	  html += '<li>'+weather.forecast[7].text + '</li></ul></div>';
	  html += '<div class="forecast"><ul><li>'+weather.forecast[8].day +', '+weather.forecast[8].date + '</li>';
	  html += '<li><img src='+weather.forecast[8].image + '></li>';
	  html += '<li>'+weather.forecast[8].high + '</li>';
	  html += '<li>'+weather.forecast[8].low + '</li>';
	  html += '<li>'+weather.forecast[8].text + '</li></ul></div>';
	  html += '<div class="forecast"><ul><li>'+weather.forecast[9].day + ', '+weather.forecast[9].date + '</li>';
	  html += '<li><img src='+weather.forecast[9].image + '></li>';
	  html += '<li>'+weather.forecast[9].high + '</li>';
	  html += '<li>'+weather.forecast[9].low + '</li>';
	  html += '<li>'+weather.forecast[9].text + '</li></ul></div>';
	  html += '<button class="w3-button w3-black w3-display-left w3-xlarge" onclick="plusDivs(-1)">Prev</button>';
	  html += '<button class="w3-button w3-black w3-display-right w3-xlarge" onclick="plusDivs(1)">Next</button></div></div></div>';
	  
	  document.getElementById('w').innerHTML = html;
    },
    error: function(error) {
	  document.getElementById('w').innerHTML = '<p>'+error+'</p>';
    },
});
//});