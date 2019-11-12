//Dom Elements
const  placeName = document.getElementById('locationName');
const  Currentweather = document.getElementById('weather');
const showLocalCondition = document.getElementById('local-condition');
let input = document.getElementById('search-input');

//UI  class
class UI {
    static showNameOfLocation = ({name}) => {
        placeName.innerText = name
    }
    static showCurrentWeether = ({weather}) => {
        console.log(weather[0].main)
        Currentweather.innerText = weather[0].main
    }
    static showLocalCondition = ({main, wind}) => {
        let localCondition = [
            {
                name: "temperature",
                value: main.temp
            },
            {
                name: "wind speed",
                value: wind.speed
            },
            {
                name: "humidity",
                value: main.humidity
            }
        ];

        const symbol = (type) => {
            if(type === "temperature"){
                return '\xB0C.'
            }else if(type === "wind speed") {
                return 'm/s'
            }else if(type === "humidity") {
                return '%'
            }
        }

        showLocalCondition.innerHTML = localCondition.map( (val, index) => {
            return `
                <li>
                    <div class="box">
                        <h1>${val.value}</h1>
                        <span>${symbol(val.name)}</span>
                    </div>
                    <p>${val.name}</p>
                </li>
            `
        })
    }
}


//get current location 
const getCurrentLocation = () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( (position) => {
            console.log(position)
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            sessionStorage.setItem("currentPlace", JSON.stringify(pos))
            getLocationWeatherData(pos.lat, pos.lng,);
        })
    }
}

//get weather data
const getLocationWeatherData = (lat, lng,) => {
    console.log(lat, lng )
    let key = '3fef7f09e3d16a2d67ba169848bd7e6f';
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lng+ '&appid=' + key)
    .then( (responce) => {
        return responce.json()
    })
    .then( (data) => {
        console.log(data)
        UI.showNameOfLocation(data)
        UI.showCurrentWeether(data)
        UI.showLocalCondition(data)
    })
};

//autocomplete search
function  actvitePlaceSearch () {
    let autocomplete = new google.maps.places.Autocomplete(input)

    let searchBox = new google.maps.places.SearchBox(input)

    google.maps.event.addListener(searchBox, 'places_changed', function(){
        console.log(searchBox.getPlaces());  
        sessionStorage.setItem("place", JSON.stringify(searchBox.getPlaces()))
        location.replace("http://127.0.0.1:5500/Geo-Search/Geo-Search-DevCTraing-Project/index/location-map.html")

    })
}


getCurrentLocation()




