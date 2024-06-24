import { useState, useEffect } from 'react';
import './index.css';

const api = {
  key: "f67c39fa35760ee5785c97ac352e8f2f",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');
  const [placeholder, setPlaceholder] = useState('Type anything to search');

  useEffect(() => {
    // Get the current location when the component mounts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  const showPosition = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    fetchWeatherByCoords(latitude, longitude);
  }

  const showError = (error) => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
  }

  const fetchWeatherByCoords = (lat, lon) => {
    fetch(`${api.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        if (result.cod !== 200) {
          setPlaceholder('Unable to retrieve weather for your location.');
          setWeather('');
        } else {
          setWeather(result);
          setPlaceholder('Type anything to search');
        }
      })
      .catch(err => {
        setPlaceholder('An error occurred.');
        setWeather('');
        console.error(err);
      });
  }

  const Search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          if (result.cod !== 200) {
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
          <div>
            {fetchWeatherByCoords.geolocation}
          </div>
          </div>
        ) : ''}
      </main>
    </div>
  );
}

export default App;
