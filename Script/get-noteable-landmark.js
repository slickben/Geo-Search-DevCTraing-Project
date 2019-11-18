// // https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?app_id={YOUR_APP_ID}&app_code={YOUR_APP_CODE}&mode=retrieveLandmarks&prox=37.7442,-119.5931,1000

// fetch('https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?app_id=71Eoa6rHwrq47vTSM0nH&app_code=LG_vdj7d_X166xoJthaRIDod8BRqrHwoUc481tJ6AGk&mode=retrieveLandmarks&prox=37.7442,-119.5931,1000', {
//     mode: 'no-cors',
//     headers: {
//       'Content-Type': 'application/json'
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
// })
// .then( (responce) => {
//     return responce.json()
// })
// .then( (data) => {
//     console.log('noteable landmark:' + data)
// })