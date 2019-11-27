//dom element 
const convertToCelsiusBtn = document.getElementById('convertToCelsius');
const convertToFahrenheitBtn = document.getElementById('convertToFahrenheit');


let weatherData = JSON.parse(sessionStorage.getItem('weatherData'));
let {main} = weatherData;

let saveToCelsius;
let saveToFahrenheit;// eslint-disable-line
//convert to celsius func
const convertToCelsiusFunc = () => {
    const tempElem = document.getElementById('weather');
    const tempIconElem = document.querySelector('.temp');
        saveToCelsius = Math.round(parseFloat(main.temp)- 273.15);
        const weatherTemp  = saveToCelsius;
        tempElem.innerText = weatherTemp;
        tempIconElem.innerText = '\xB0C.';
    
};

//convert to celsius func
const convertToFahrenheitFunc = () => {
    const tempElem = document.getElementById('weather');
    const tempIconElem = document.querySelector('.temp');
    const convertToFahrenheit  = Math.round(parseFloat((main.temp * 9/5)) - 459.67) ;
    const weatherTemp = convertToFahrenheit;
    tempElem.innerText = weatherTemp;
    tempIconElem.innerText = '\xB0F.';

};

//Event
convertToCelsiusBtn.addEventListener('click', convertToCelsiusFunc);
convertToFahrenheitBtn.addEventListener('click', convertToFahrenheitFunc);


