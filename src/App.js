import { useState } from 'react';
import './index.css';

const api = {
  key: "f67c39fa35760ee5785c97ac352e8f2f",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');
  const [placeholder, setPlaceholder] = useState('Type anything to search');

  const Search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          if (result.cod !== 200) {  // Check if the result code is not 200 (which means success)
            setPlaceholder('No place by that name.');
            setWeather('');
          } else {
            setWeather(result);
            setPlaceholder('Type anything to search');
          }
          setQuery('');
        })
        .catch(err => {
          setPlaceholder('An error occurred.');
          setWeather('');
          console.error(err);
        });
    }
  }

  const datebuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div className={(typeof weather.main != "undefined")
      ? (weather.main.temp > 17)
        ? 'app warm'
        : 'app cold'
      : 'app'}>
      <main>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder={placeholder}
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={(e) => Search(e)}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className='location-box'>
              <div className='location'>{weather.name}, {weather.sys.country}</div>
              <div className='date'>{datebuilder(new Date())}</div>
            </div>
            <div className='weather-box'>
              <div className='temp'>
                {Math.round(weather.main.temp)}°c
              </div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ''}
      </main>
    </div>
  );
}

export default App;
