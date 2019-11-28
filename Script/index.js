//Dom Elements
const  placeName = document.getElementById('locationName');
const  Currentweather = document.getElementById('weather');
const showLocalCondition = document.getElementById('local-condition');
let input = document.getElementById('search-input');
const weatherImg = document.getElementById('weatherImg');
const userNameElem = document.getElementById('username');
//UI  class

function askUserName() {
    if(localStorage.getItem('username') !== null){
        return;
    }else {
        const userName = prompt('enter your fullname');
        localStorage.setItem('username', userName);  
    }
}
askUserName();


class UI {
    static showNameOfLocation ({name}) {
        placeName.innerText = name;
    }
    static showCurrentWeether ({weather})  {
        const image = (type) => {
            if(type === 'Clouds' || ''){
                return './icons/svg/014-cloudy.svg';
            }else if(type === 'wind') {
                return './icons/svg/004-drop.svg';
            }else if(type === 'humidity') {
                return './icons/svg/001-wind.svg';
            }else if(type === 'Rain'){
                return './icons/svg/006-rain.svg';
            }else if(type === 'Clear'){
                return '../icons/svg/day-clear-512.png';
            }else if (type === 'Thunderstorm'){
                return './icons/svg/008-thunderstorm.svg';
            }else if (type === 'Storm'){
              return './icons/svg/007-storm.svg';
            }else if (type === 'Snow'){
              return './icons/svg/013-snow.svg';
            }else if (type === 'Blizzard'){
              return './icons/svg/010-blizzard.svg';
            }else if (type === 'Sun'){
              return './icons/svg/027-sun.svg';
            }
        };
        console.log(weather[0].main);
        Currentweather.innerText = weather[0].main;
        weatherImg.setAttribute('src', `${image(weather[0].main)}`);
    }
    static userName () {
        let name = localStorage.getItem('username');
        userNameElem.innerText = name;
    }
    static showLocalCondition ({main, wind}) {
        let localCondition = [
            {
                name: 'temperature',
                value: main.temp - 273.15
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

        showLocalCondition.innerHTML = localCondition.map( (val) => {
            return `
                <li>
                    <div class="box">
                        <h1>${val.value}</h1>
                        <span>${symbol(val.name)}</span>
                    </div>
                    <p>${val.name}</p>
                </li>`;
        });
    }
}

UI.userName();


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
    // const currentPlace = JSON.parse(sessionStorage.getItem('currentPlace'));
    // var pyrmont = new google.maps.LatLng(currentPlace.lng,currentPlace.lat);
    // var request = {
    //     location: pyrmont,
    //     radius: ' 1',
    //   };
    
    //   let service = new google.maps.places.PlacesService(placeName);
    //   service.nearbySearch(request, callback);
    
    
    // function callback(results, status) {
    //   if (status == google.maps.places.PlacesServiceStatus.OK) {
    //     console.log(results)
    //   }
    // }
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




