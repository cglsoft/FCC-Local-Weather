var optionsGeoLocalizacao = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

var gTemp = 1;

$(document).ready(function() {
    getGeoLocalizacao();
    $("#rdStckFarenheit").click( () => $("#idTemp").html(  Math.round( ( 1.8 * gTemp) + 32 ) + "&#8457") );
    $("#rdStckCelsius").click( () => $("#idTemp").html( Math.round(gTemp) + "&#8451") );
});

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
            gTemp = json.main.temp;

            $("#idTemp").html( Math.round(json.main.temp) + "&#8451");          
            $('#idWeatherIcon').html('<img src=' + json.weather[0].icon + ' />');
            $('#idWweatherMain').text(json.weather[0].main + ' ' + json.weather[0].description);
            $('#idAtPressure').text(json.main.pressure);
            $('#idHumidity').text(json.main.humidity);
            $('#idCity').text(json.name);           
           
            setBackGround(json.weather[0].description);
        });
    };    

    function geo_error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(geo_success, geo_error, optionsGeoLocalizacao);
}



function setBackGround(mainWeather) {
   var mainWeather = mainWeather.toLowerCase()

    // mainWeather = 'thunderstom';

    console.log(mainWeather);
    
    switch (mainWeather) {

        case 'clear sky':
            document.body.style.background ="url('https://us.123rf.com/450wm/aprior/aprior1501/aprior150100206/36028203-beautiful-blue-sky-with-clouds.jpg?ver=6') no-repeat";
            break;
        case 'few clouds':
            document.body.style.background ="url('https://us.123rf.com/450wm/aprior/aprior1501/aprior150100206/36028203-beautiful-blue-sky-with-clouds.jpg?ver=6') no-repeat";
            break;
        case ("scattered clouds") :
            document.body.style.background = "url('http://cdn.wallpapersafari.com/73/15/PVUv2n.jpg') no-repeat";
            break;
        case 'broken clouds':
            document.body.style.background = "url('https://us.123rf.com/450wm/aprior/aprior1501/aprior150100206/36028203-beautiful-blue-sky-with-clouds.jpg?ver=6') no-repeat";
            break;
        case 'shower rain':
            document.body.style.background = "url('https://us.123rf.com/450wm/aprior/aprior1501/aprior150100206/36028203-beautiful-blue-sky-with-clouds.jpg?ver=6') no-repeat";
            break;            
        case 'rain':
            document.body.style.background = "url('https://images4.alphacoders.com/831/thumb-1920-83196.jpg') no-repeat";
            break;           
        case 'thunderstom':
            document.body.style.background = "url('http://www.nationalgeographic.com/content/dam/environment/photos/000/002/270.adapt.590.1.jpg') no-repeat";
            break;    
        case ("snow") :
            document.body.style.background ="url('https://cdn.pixabay.com/photo/2017/01/20/11/50/landscape-1994685_960_720.jpg') no-repeat";
            break;
        case 'mist':
            document.body.style.background = "url('http://cdn.wallpapersafari.com/53/61/HhtQdk.jpg') no-repeat";
            break;
        case 'clouds':
            document.body.style.background = "url('https://www.pixelstalk.net/wp-content/uploads/2016/03/Sun-And-Clouds-Wallpaper-HD-620x388.jpg') no-repeat";
            break;
        default:
            document.body.style.background = "url('http://cdn.wallpapersafari.com/48/26/IrYqbm.png') no-repeat";

    
    }
    document.body.style.backgroundSize = "100% 100%";
}