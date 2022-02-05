(function (){
    // MapBox API:
    mapboxgl.accessToken = mapboxAPI_key;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-98.4916, 29.4252],
        zoom: 13,// starting zoom
    });

    htmlString = '';
    //search through clicking on the map
    map.on('click', (e) => {
        var lng = e.lngLat.lng;
        var lat = e.lngLat.lat;
        $.get("http://api.openweathermap.org/data/2.5/weather", {
            APPID: openWeatherAPI_key,
            lat: lat,
            lon: lng,
            units: "imperial"
        }).done(function (data){
            console.log(data);
            var weatherData = data.weather[0].description;
            $('.row').html(weatherData);
        });
        document.getElementById('info').innerHTML =
// `e.point` is the x, y coordinates of the `mousemove` event
// relative to the top-left corner of the map.
            JSON.stringify(e.point) +
            '<br />' +
            // `e.lngLat` is the longitude, latitude geographical position of the event.
            JSON.stringify(e.lngLat.wrap());
    });
    //searchBar:
    const geocoder = new MapboxGeocoder({
        // Initialize the geocoder
        accessToken: mapboxgl.accessToken, // Set the access token
        mapboxgl: mapboxgl, // Set the mapbox-gl instance
        marker: true // Do not use the default marker style
    });
    map.addControl(geocoder);
    geocoder.on('result', (event) => {
        var userInput = event.result.center;
        var lon = userInput[0];
        var lat = userInput[1];
        $.get("http://api.openweathermap.org/data/2.5/onecall", {
            APPID: openWeatherAPI_key,
            lat: lat,
            lon: lon,
            units: "imperial",
        }).done(function (data){
            var fiveDayForecast = data.daily;
            htmlString += '<h6>7 Day Forecast</h6>';
            for(var i = 0; i < 7; i++) {
                var icon = 'http://openweathermap.org/img/wn/' + fiveDayForecast[i].weather[0].icon + '@2x.png';
                $('.icon').html(icon);
                htmlString += '<div class="col">' + new Date(fiveDayForecast[i].dt * 1000) +
                    '</br>' + fiveDayForecast[i].temp.morn +
                    '</br>' + fiveDayForecast[i].weather[0].icon +
                    '</br>'  +
                    '</div>';
            }
            $('.row').html(htmlString);
        });
    });
}) ();

