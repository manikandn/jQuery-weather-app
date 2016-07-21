
var InitMap = {
	init: function(){
		this.getCoord();
	},

	defaults: function(){
		return{
			lat: 23.4,
			lng: 78.8
		}
	},

	drawMap: function(CURR_POS){
		var DEFAULT_POS = {};
		var mapDiv = document.getElementById('Map');
		DEFAULT_POS['lat'] = this.defaults().lat;
		DEFAULT_POS['lng'] = this.defaults().lng;
		var POS = CURR_POS || DEFAULT_POS;
		var map = new google.maps.Map(mapDiv, {
			center: POS,
			zoom: 10
		});
		var _this = this;
		map.addListener('click', function(e) {
			var lat=e.latLng.lat();
			var lng=e.latLng.lng();
			_this.showWeather(lat,lng);
		});
		$("#Map").click(function(e){
			// $(".nodata").hide();
			// $(".Details").show();
			$(".nodata").addClass('hide');
			$(".Details").removeClass('hide');
			// var lat=e.latLng.lat();
			// var lng=e.latLng.lng();
			// _this.showWeather(lat,lng);
		});
	},

	getCoord: function(){
		var CURR_POS = {};
		var _this = this;
		if (navigator.geolocation) {
			 navigator.geolocation.getCurrentPosition(function(position) {
				CURR_POS['lat'] = position.coords.latitude;
				CURR_POS['lng'] = position.coords.longitude;
				_this.drawMap(CURR_POS);
			 });
		}
	},

	showWeather: function(lat,lng){
		$.getJSON("http//api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng+"&appid=b32c6ca8c73ce068dc53638889e842db", function(data){
			var returnedWeatherDetails=JSON.parse(JSON.stringify(data));
			console.log(returnedWeatherDetails);
			$(".Weather-icon").html('<img style="margin-left:40%;" src="icon/'+returnedWeatherDetails.weather[0].icon+'.png">');
			document.getElementById("Latitude").innerHTML= returnedWeatherDetails.coord.lat;
			document.getElementById("Longitude").innerHTML=returnedWeatherDetails.coord.lon;
			document.getElementById("City_name").innerHTML= returnedWeatherDetails.name;
			document.getElementById("Country_name").innerHTML=returnedWeatherDetails.sys.country;
			document.getElementById("City_ID").innerHTML=returnedWeatherDetails.id;
			document.getElementById("Weather").innerHTML=returnedWeatherDetails.weather[0].main;
			document.getElementById("Weather_desc").innerHTML=returnedWeatherDetails.weather[0].description;
			document.getElementById("Temperature").innerHTML=returnedWeatherDetails.main.temp;
			document.getElementById("Temp_min").innerHTML=returnedWeatherDetails.main.temp_min;
			document.getElementById("Temp_max").innerHTML=returnedWeatherDetails.main.temp_min;
			document.getElementById("Pressure").innerHTML=returnedWeatherDetails.main.pressure;
			document.getElementById("Humidity").innerHTML=returnedWeatherDetails.main.humidity;
			document.getElementById("Wind_speed").innerHTML=returnedWeatherDetails.wind.speed;
			document.getElementById("Wind_degree").innerHTML=returnedWeatherDetails.wind.deg;
			document.getElementById("Sunrise").innerHTML=returnedWeatherDetails.sys.sunrise;
			document.getElementById("Sunset").innerHTML=returnedWeatherDetails.sys.sunset;
		});
	}

}


$(document).ready(function(){
	InitMap.init();
});