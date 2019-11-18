//dom element 
const convertToCelsiusBtn = document.getElementById('convertToCelsius');
const convertToFahrenheitBtn = document.getElementById('convertToFahrenheit');


let weatherData = JSON.parse(sessionStorage.getItem('weatherData'));
let {main} = weatherData;

let saveToCelsius;
let saveToFahrenheit;
//convert to celsius func
const convertToCelsiusFunc = () => {
    const tempElem = document.getElementById('weather');
    if(saveToFahrenheit){
        const convertToCelsius  = saveToFahrenheit * 9 / 5 + 32;
        saveToCelsius = convertToCelsius;
        const weatherTemp  = saveToCelsius;
        tempElem.innerText = weatherTemp;
        
    }
    return;
    
};

//convert to celsius func
const convertToFahrenheitFunc = () => {
    const tempElem = document.getElementById('weather');
    const convertToFahrenheit  = (main.temp -32) * 5 / 9;
    saveToFahrenheit = convertToFahrenheit;
    const weatherTemp = convertToFahrenheit;
    tempElem.innerText = weatherTemp;

};

//Event
convertToCelsiusBtn.addEventListener('click', convertToCelsiusFunc);
convertToFahrenheitBtn.addEventListener('click', convertToFahrenheitFunc);


