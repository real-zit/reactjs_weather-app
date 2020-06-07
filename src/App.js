import React, { useState } from 'react';
const api = {
  url: "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/",
  key : "5f5ba719a1bc892512ee4714965a83c5"
}


function App() {
  const [ query, setQuery ] = useState('');
  const [ weather, setWeather ] = useState({ });

  function search(evt) {
    if(evt.key === "Enter"){
      fetch(`${api.url}weather?q=${query}&units=metrics&APPID=${api.key}`, 
        {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
         })
      .then(res => res.json())
      .then(result => {
         setWeather(result)
         setQuery(''); 
         
      });
    }
  }

  const dateBuilder =(d) => {
    let months = ["Jan", "Feb", "Mar", "Apr", "May","June",
                  "Jul", "Aug", "Sep","Oct", "Nov","Dec"];
    let days = ["Sun","Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }


  return (
    <div className=
    {
      (typeof weather.main  != "undefined") ?
     ((weather.main.temp < 288)
    ? 'App-cold' : 'App') : 'App'


    }>
      <main>
          <div className="search-box">
              <input
                type="text"
                className="search-bar"
                placeholder="Search..."

                onChange={e => setQuery(e.target.value)}
                value={query}
                onKeyPress = {search}
              />
            </div>

            {(typeof weather.main != "undefined") ? ( 
          <div>  
            <div className="location-box">
                <div className="location"> {weather.name}, {weather.sys.country} </div>
                <div className="date">{dateBuilder( new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
               {Math.round(weather.main.temp) - 273}°C
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>

           ): ('')}
      </main>
    </div>
  );
}

export default App;
