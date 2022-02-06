(function (){
    // MapBox API:
    mapboxgl.accessToken = mapboxAPI_key;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-98.4916, 29.4252],
        zoom: 13,// starting zoom
    });

    function getWeather(latitude, longitude, APIkey) {
        var htmlString = '';
        var iconList = [];
        $.get("https://api.openweathermap.org/data/2.5/onecall", {
            APPID: APIkey,
            lat: latitude,
            lon: longitude,
            units: "imperial",
        }).done(function (data) {
            var fiveDayForecast = data.daily;
            htmlString += '<h6>5 Day Forecast</h6>';
            for (var i = 0; i < 5; i++) {
                var icon = "<img src='" + "http://openweathermap.org/img/wn/" + fiveDayForecast[i].weather[0].icon + "@2x.png'>";
                iconList.push(icon);
                htmlString += '<div class="col">' + iconList[i] +
                    '<br>' + 'temp morn: ' + fiveDayForecast[i].temp.morn +
                    '<br>' + new Date(fiveDayForecast[i].dt * 1000) + '</div>';
            }
            $('.row').html(htmlString);
        });
    }

    //search through clicking on the map
    map.on('click', (e) => {
        var lng = e.lngLat.lng;
        var lat = e.lngLat.lat;
        getWeather(lat, lng, openWeatherAPI_key);
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
        var locationName =event.result.place_name
        var coordinates = event.result.center;
        var lon = coordinates[0];
        var lat = coordinates[1];
        getWeather(lat, lon, openWeatherAPI_key);
        var marker = new mapboxgl.Marker()
            .setLngLat(coordinates)
            .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML(locationName)
            )
            .addTo(map)
    });
}) ();