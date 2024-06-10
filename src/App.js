import { useState } from 'react';
import './index.css';
const api = {
  key: "f67c39fa35760ee5785c97ac352e8f2f",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');
  const Search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then(R => {
          setWeather(R);
          setQuery('');
          console.log('lala', R)
        });
    }
  }


  const datebuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "Jully", "Augest", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday", "Sunday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day}${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main!="undefined")
      ?(weather.main.temp > 16)
      ?'app warm'
      : 'app'
      :'app'}>
      <main>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='type aything to search'
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={(R) => Search(R)}
          />
        </div>
        {(typeof weather.main != "undefined") ? (

          <div>
            <div className='location-box'>

              <div className='location'>{weather.name},{weather.sys.country}</div>
              <div className='date'>{datebuilder(new Date())}</div>
            </div>
            <div className='weather-box'>
              <div className='temp'>
                {/* 15°c */}
                {Math.round(weather.main.temp)}°c
              </div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ('')};


      </main>
    </div>
  );
}

export default App;
