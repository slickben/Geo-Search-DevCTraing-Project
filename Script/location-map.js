//LG_vdj7d_X166xoJthaRIDod8BRqrHwoUc481tJ6AGk api key
// 71Eoa6rHwrq47vTSM0nH
//APP ID

//dom Elements
const backToCurrentLocationBtn = document.getElementById('backToCurrentLocation')
let input = document.getElementById('search-input');
const showLocalCondition = document.getElementById('local-condition');
const placeName = document.getElementById('placename');


//searched place
const  searchPlace = JSON.parse(sessionStorage.getItem("place"));
const currentPlace = JSON.parse(sessionStorage.getItem("currentPlace"))
const getSearchLatLng = searchPlace ?  searchPlace.map( (value) => value.geometry.location) : "";
console.log(searchPlace)




// place to view
const view = () => {

    if(!getSearchLatLng){
        return  {
          lng: currentPlace.lng,
          lat: currentPlace.lat
        }        
    }else {
        return   {
          lng: getSearchLatLng[0].lng,
          lat: getSearchLatLng[0].lat
        }       
        
    }
}


//map
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: view().lat, lng: view().lng},
    zoom: 17
  });

  var marker = new google.maps.Marker({
    position: {
      lat: view().lat, 
      lng: view().lng
    },
    map: map,
    // draggable = true
  
  });



//autocomplete search
  let autocomplete = new google.maps.places.Autocomplete(input)
  let searchBox = new google.maps.places.SearchBox(input)
  
//listener
  google.maps.event.addListener(searchBox, 'places_changed', function(){  
      sessionStorage.setItem("place", JSON.stringify(searchBox.getPlaces()));
      let places =  searchBox.getPlaces();
      let bounds = new google.maps.LatLngBounds();

      places.map( (place) => {
        console.log(place.geometry.location);
        bounds.extend(place.geometry.location);
        marker.setPosition(place.geometry.location);
      });

      map.fitBounds(bounds);
      map.setZoom(17) 

  })
}



//go back to current location func
backToCurrentLocationBtn.addEventListener('click', function () {
  sessionStorage.setItem('currentPlace', null)
  location.replace('http://127.0.0.1:5500/Geo-Search/Geo-Search-DevCTraing-Project/index/index.html')
})



