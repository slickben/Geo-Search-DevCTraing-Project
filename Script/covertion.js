//dom element 
const convertToCelsiusBtn = document.getElementById('convertToCelsius');
const convertToFahrenheitBtn = document.getElementById("convertToFahrenheit");
const tempElem = document.querySelector('weather')


let weatherData = JSON.parse(sessionStorage.getItem('weatherData')) 
let {main} = weatherData;

let saveToCelsius;
let saveToFahrenheit;
//convert to celsius func
const convertToCelsiusFunc = () => {
    const tempElem = document.getElementById('weather')
    if(saveToFahrenheit){
        const convertToCelsius  = saveToFahrenheit * 9 / 5 + 32;
        saveToCelsius = convertToCelsius;
        weatherTemp  = saveToCelsius;
        console.log(tempElem)
        tempElem.innerText = weatherTemp
        console.log(weatherTemp)
    }
    return
    
}

//convert to celsius func
const convertToFahrenheitFunc = () => {
    const tempElem = document.getElementById('weather')
    const convertToFahrenheit  = (main.temp -32) * 5 / 9;
    saveToFahrenheit = convertToFahrenheit;
    weatherTemp = convertToFahrenheit;
    console.log(tempElem)
    tempElem.innerText = weatherTemp
    console.log(weatherTemp)

}

//Event
convertToCelsiusBtn.addEventListener('click', convertToCelsiusFunc);
convertToFahrenheitBtn.addEventListener('click', convertToFahrenheitFunc)


