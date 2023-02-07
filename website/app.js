/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Personal API Key for OpenWeatherMap API
function apiKey() {
    return 'b0b06dbf01aaab2489ef2903c1336134';
}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeather(baseURL, zip, apiKey())
    .then(function(data) {
        postData('/add', {date: newDate, temp: data.main.temp, content: feelings});
    })
    .then(function() {
        updateUI();
    })
}


/* Function to GET Web API Data*/
const getWeather = async (baseURL, zip, key)=>{
    const res = await fetch(baseURL+zip+'&appid='+key);
    try {
        const data = await res.json();
        console.log(data);
        return data;
    }catch(error) {
        console.log("error", error);
    }
}

/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log("error", error);
    }
}
/* Function to GET Project Data */
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.content;
    }catch(error) {
        console.log("error", error);
    }
}
