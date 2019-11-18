//LG_vdj7d_X166xoJthaRIDod8BRqrHwoUc481tJ6AGk api key
// 71Eoa6rHwrq47vTSM0nH
//APP ID

//dom Elements
const backToCurrentLocationBtn = document.getElementById('backToCurrentLocation');
let input = document.getElementById('search-input');
const showLocalCondition = document.getElementById('local-condition');
const placeName = document.getElementById('placename');

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
      sessionStorage.setItem('weatherData', JSON.stringify(data));
      UI.showNameOfLocation(data);
      UI.showLocalCondition(data);
  });
};

//searched place
const  searchPlace = JSON.parse(sessionStorage.getItem('place'));
const currentPlace = JSON.parse(sessionStorage.getItem('currentPlace'));
 
const getSearchLatLng = searchPlace ?  searchPlace.map( (value) => 
value.geometry.location) : ""; // eslint-disable-line quotes
console.log(searchPlace);


//UI  class
class UI {
  constructor(CurrentWeatherData) {
      this.weatherData = CurrentWeatherData;
  }
  static showNameOfLocation  ({name})  {
    placeName.innerText = name;
  }
  static showLocalCondition  ({main, wind, weather})  {
      let localCondition = [
          {
              name: weather[0].main,
              value:  main.temp,
              type: 'temp'
          },
          {
              name: 'wind',
              value: wind.speed
          },
          {
              name: 'humidity',
              value: main.humidity
          }
      ];

      const image = (type) => {
          if(type === 'Clouds' || ''){
              return '../icons/svg/014-cloudy.svg';
          }else if(type === 'wind') {
              return '../icons/svg/004-drop.svg';
          }else if(type === 'humidit') {
              return '../icons/svg/001-wind.svg';
          }else if(type === 'Rain'){
              return '../icons/svg/006-rain.svg';
          }
      };

      const id = (type) => {
        if(type === 'temp'){
          return 'weather';
        }
      };

      showLocalCondition.innerHTML = localCondition.map( (val,) => {
          return `
              <li>
                <img src="${image(val.name)}">
                <div>
                  <p>${val.name}</p>
                  <p id="${id(val.type)}" class="val">${val.value}</p>
                </div>
              </li>
          `;
      });
  }
}



// place to view at first load
const view = () => {

    if(!getSearchLatLng){
        return  {
          lng: currentPlace.lng,
          lat: currentPlace.lat
        };        
    }else {
        return   {
          lng: getSearchLatLng[0].lng,
          lat: getSearchLatLng[0].lat
        };       
        
    }
};


//map
var map;
// eslint-disable-line
function initMap() { // eslint-disable-line
  
  map = new google.maps.Map(document.getElementById('map'), { // eslint-disable-line
    center: {lat: view().lat, lng: view().lng},
    zoom: 17,
    zoomControl: true
  });

  var marker = new google.maps.Marker({ //eslint-disable-line
    position: {
      lat: view().lat, 
      lng: view().lng
    },
    map: map,
    draggable: true
  
  });

  getLocationWeatherData(view().lat, view().lng);
//autocomplete search
  let autocomplete = new google.maps.places.Autocomplete(input); // eslint-disable-line
  let searchBox = new google.maps.places.SearchBox(input); // eslint-disable-line
  
//listener
  google.maps.event.addListener(searchBox, 'places_changed', function(){  // eslint-disable-line 
      sessionStorage.setItem('place', JSON.stringify(searchBox.getPlaces()));
      let places =  searchBox.getPlaces();
      let bounds = new google.maps.LatLngBounds(); // eslint-disable-line

      places.map( (place) => {
        console.log(place.geometry);
        bounds.extend(place.geometry.location);
        marker.setPosition(place.geometry.location);
      });

      map.fitBounds(bounds);
      map.setZoom(17);
      location.reload();
  });
}

//es-lint,
// bug
//share-feature





//go back to current location func
backToCurrentLocationBtn.addEventListener('click', function () {
  sessionStorage.setItem('place', null);
  location.replace('https://slickben.github.io/Geo-Search-DevCTraing-Project/');
});




