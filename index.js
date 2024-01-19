
frm= document.getElementsByTagName('form')[0]
state = document.getElementsByClassName('state')[0]
icon = document.getElementsByClassName('icon')[0]
description = document.getElementsByClassName('description')[0]
temperature = document.getElementById('temperature')
feelslike = document.getElementById('feelslike')
windspeed = document.getElementById('windspeed')


const url = 'https://open-weather13.p.rapidapi.com/city/';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '4586f7e5f0msh1d7c2dd3a42df29p14d58djsna78cc7435143',
    'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
  }
};
async function getInfo(city){
    try {
        const response = await fetch(`${url}${city}`, options);
        if(!response.ok){
          throw new error("Network error")
        }
        const result = await response.json();
        console.log(result)
      
        weather = result.weather[0]
        temperature.textContent = result.main.temp + "°C"
        humidity.textContent = "Humidity: " + result.main.humidity + "%"
        feelslike.textContent = "feels like: "+result.main.feels_like+"°C"
        windspeed.textContent = "Wind speed: " + result.wind.speed + "m/s"
        let iconurl = `http://openweathermap.org/img/w/${weather.icon}.png`
        icon.innerHTML=`<img src=${iconurl} alt="weather icon" ></img>`
        state.textContent=weather.main
        description.textContent=weather.description
    } catch (error) {
        console.error(error);
        state.textContent="error: please try again later";
        feelslike.textContent=''
        windspeed.textContent=''
        humidity.textContent=''
        temperature.textContent =''
        icon.innerHTML=''
        description.textContent=''

    }
}



frm.addEventListener('submit',(event)=>{
  event.preventDefault()
  city=document.getElementById('city').value
  getInfo(city)
})