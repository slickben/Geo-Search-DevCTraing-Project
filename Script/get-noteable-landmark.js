// // https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?app_id={YOUR_APP_ID}&app_code={YOUR_APP_CODE}&mode=retrieveLandmarks&prox=37.7442,-119.5931,1000

let getSearchName = searchPlace ?  searchPlace.map( (value) => // eslint-disable-line
value.url) : ""; // eslint-disable-line quotes

const getPlacePhoto = () => {
    if(searchPlace){ //eslint-disable-line
        let photo = searchPlace.photos  //eslint-disable-line
        // photo[0].getUrl({maxWidth: 35, maxHeight: 35});
    }
};

getPlacePhoto();


