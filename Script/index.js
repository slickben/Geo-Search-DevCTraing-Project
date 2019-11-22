//Dom Elements
const  placeName = document.getElementById('locationName');
const  Currentweather = document.getElementById('weather');
const showLocalCondition = document.getElementById('local-condition');
let input = document.getElementById('search-input');

//UI  class
class UI {
    static showNameOfLocation ({name}) {
        placeName.innerText = name;
    }
    static showCurrentWeether ({weather})  {
        console.log(weather[0].main);
        Currentweather.innerText = weather[0].main;
    }
    static showLocalCondition ({main, wind}) {
        let localCondition = [
            {
                name: 'temperature',
                value: main.temp
            },
            {
                name: 'wind speed',
                value: wind.speed
            },
            {
                name: 'humidity',
                value: main.humidity
            }
        ];

        const symbol = (type) => {
            if(type === 'temperature'){
                return '\xB0C.';
            }else if(type === 'wind speed') {
                return 'm/s';
            }else if(type === 'humidity') {
                return '%';
            }
        };

        showLocalCondition.innerHTML = localCondition.map( (val, ) => {
            return `
                <li>
                    <div class="box">
                        <h1>${val.value}</h1>
                        <span>${symbol(val.name)}</span>
                    </div>
                    <p>${val.name}</p>
                </li>
            `;
        });
    }
}


//get current location 
const getCurrentLocation = () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( (position) => {
            console.log(position);
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            sessionStorage.setItem('currentPlace', JSON.stringify(pos));
            getLocationWeatherData(pos.lat, pos.lng,);
        });
    }
};

//get weather data
const getLocationWeatherData = (lat, lng,) => {
    console.log(lat, lng );
    let key = '3fef7f09e3d16a2d67ba169848bd7e6f';
    fetch('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lng+ '&appid=' + key)
    .then( (responce) => {
        return responce.json();
    })
    .then( (data) => {
        console.log(data);
        UI.showNameOfLocation(data);
        UI.showCurrentWeether(data);
        UI.showLocalCondition(data);
    });
};

//autocomplete search
function  actvitePlaceSearch () { // eslint-disable-line
    let autocomplete = new google.maps.places.Autocomplete(input); // eslint-disable-line

    let searchBox = new google.maps.places.SearchBox(input); // eslint-disable-line

    google.maps.event.addListener(searchBox, 'places_changed', function(){ // eslint-disable-line
        let photoArr = [];
        let places =  searchBox.getPlaces();
        let photos = places.map(value => value.photos) //eslint-disable-line
        console.log(photos);
        photos[0] != undefined ? photos[0].map( value => {
            let photoUrl = value.getUrl({maxWidth: 800, maxHeight: 400});
            photoArr.push(photoUrl);
        }) : '';

        sessionStorage.setItem('photo', JSON.stringify(photoArr));
        
        sessionStorage.setItem('place', JSON.stringify(searchBox.getPlaces()));
        location.replace('https://slickben.github.io/Geo-Search-DevCTraing-Project/index/location-map.html');

    });
}
//https://slickben.github.io/Geo-Search-DevCTraing-Project/index/location-map.html
//http://127.0.0.1:5500/Geo-Search-DevCTraing-Project/index.html


getCurrentLocation();




