var optionsGeoLocalizacao = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};


function getGeoLocalizacao() {
    if (!navigator.geolocation) {
        console.log('output.innerHTML = "<p>Geolocation is not supported by your browser</p>"');
        return false;
    }


    function geo_success(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let url = 'https://fcc-weather-api.glitch.me/api/current?lat=' + latitude + '5&lon=' + longitude;
        let pLat = $("#lat").text();
        let pLong = $("#long").text();


        var t = new moment(position.timestamp);
        t.locale('pt-br');
        var formatted = t.format("DD/MM/YYYY, h:mm:ss a");

        $("#lat").text( pLat + latitude.toFixed(4));
        $("#long").html( pLong + longitude.toFixed(4));
        $("#idDateTime").text(formatted);

        $.getJSON(url, function(json) {           
            $("#idTemp").text(json.main.temp);          
            $('#idWeatherIcon').html('<img src=' + json.weather[0].icon + ' />');
            $('#idWweatherMain').text(json.weather[0].main + ' ' + json.weather[0].description);
            $('#idAtPressure').text(json.main.pressure);
            $('#idHumidity').text(json.main.humidity);



           console.log(json.weather[0].main);
           $.each(json, function (index, value) {
                console.log( value );
             });
           
        });



        console.log('Latitude: ' + position.coords.latitude + '<br />' +
            'Longitude: ' + position.coords.longitude + '<br />' +
            'Altitude: ' + position.coords.altitude + '<br />' +
            'Accuracy: ' + position.coords.accuracy + '<br />' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
            'Heading: ' + position.coords.heading + '<br />' +
            'Speed: ' + position.coords.speed + '<br />' +
            'Timestamp: ' + position.timestamp + '<br />');
    };

    function geo_error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(geo_success, geo_error, optionsGeoLocalizacao);
}

getGeoLocalizacao();

function ourRandomRange(ourMin, ourMax) {
    return Math.floor(Math.random() * (ourMax - ourMin + 1)) + ourMin;
}

function getRandomColor() {
    var hex = Math.floor(Math.random() * 0xFFFFFF);
    return "#" + ("000000" + hex.toString(16)).substr(-6);
}

function setBackGround() {
    window.setTimeout("setBackGround()", 5000); // 5000 milliseconds delay
    document.body.style.backgroundColor = getRandomColor();
}