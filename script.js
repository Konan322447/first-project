// 202d82902eabd3850603df4583f1619f


const date = document.getElementById('date');
const city =  document.getElementById('city');
const temp =  document.getElementById('temp');
const tempImg =  document.getElementById('tempImg');
const description =  document.getElementById('description');
const tempMax = document.getElementById('tempMax');
const tempMin = document.getElementById('tempMin');


const  months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let dateObj = new Date();
let month =  months[dateObj.getUTCMonth()];
let day = dateObj.getUTCDate() -1;
let year = dateObj.getUTCFullYear();


date.innerHTML = `${month} ${day}, ${year}`; 


const app = document.getElementById('app');

const getWeather = async () => {
    try {

        const cityName = document.getElementById('searchBarInput').value

        const lonLat = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=202d82902eabd3850603df4583f1619f`, {
            headers: {
                Accept: 'application/json'
            }
        })

        const exact = await lonLat.json();

        
        for (const x of exact) {
            console.log(` Latitude: ${x.lat} , Longitude: ${x.lon}, Name: ${x.name}, Country: ${x.country}, State: ${x.state}`);
            
        };
        
        console.log(exact);

        const lat =  exact[0].lat;
        console.log(lat);
        
        const lon = exact[0].lon;
        console.log(lon);
        
        

        const weatherDataFetch = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=202d82902eabd3850603df4583f1619f&units=metric`, {
            headers:{
                Accept: 'application/json'
            }
        });

        const weatherData = await weatherDataFetch.json();

        console.log(weatherData);

        city.innerHTML = `${weatherData.name}, ${weatherData.sys.country}`;

        
        description.innerHTML = `${weatherData.weather[0].main}`;
    
        tempImg.innerHTML = `<img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png" />`;

        temp.innerHTML = `<h2>${Math.round(weatherData.main.temp)}&#8451;  </h2>`
        tempMax.innerHTML = `<h2>${weatherData.main.temp_max}&#8451; </h2>`
        tempMin.innerHTML = `<h2>${weatherData.main.temp_min}&#8451; </h2>`
        
    } catch (error) {
        console.error();
        
    }
}
