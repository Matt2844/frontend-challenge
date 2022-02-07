import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { coords } from '../config';

// components and stylesheets
import Today from '../components/Today';
import Card from '../components/Card';
import Icon from '../components/Icon';
import styles from './weather.less';

export default function Weather () {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const prefix = 'https://api.openweathermap.org';
  const [selectedCity, setSelectedCity] = useState("toronto");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lat, setLat] = useState(coords.toronto.lat);
  const [lon, setLon] = useState(coords.toronto.lon);
  const [today, setToday] = useState(null)
  const [dayNames, setDayNames] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [nightTime, setNightTime] = useState(false);

  useEffect(() => {
    getWeatherToday();
  }, [selectedCity])

  // determines if it's light or dark out for the today section icon
  // only applies night icon if the weather type is clear
  const getDayOrNight = (data) => {
    const now = data.dt;
    const sunset = data.sunset;
    const sunrise = data.sunrise;

    if (now > sunrise && now < sunset) {
      setNightTime(false);
    } else {
      setNightTime(true);
    }

  }

  // gets the upcoming forcast days ex. Fri, Sat, Sun, Mon
  const getForecastDayName = (data) => {
    let days = [];
    data.map((day, index) => {
      if (index > 0 && index < 5) { // to get only the next four days
        let dayName = new Date(day.dt * 1000).toLocaleDateString("en", {
          weekday: "short",
        })
        days.push(dayName)
      }
    })
    setDayNames(days);
  }

  // call to openweatherapi, gets current and forecast
  const getWeatherToday = () => {
    axios.get(`${prefix}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
      .then((res) => {
        setToday(res.data.current);
        getDayOrNight(res.data.current);
        getForecastDayName(res.data.daily);
        setForecast(res.data.daily);
        setLoading(false);
        console.log(res);
      })
      .catch((err) => {
        console.log(err)
        setError(true);
      })
  }

  const cityClicked = (city) => {
    setSelectedCity(city)

    if (city === "toronto") {
      setLat(coords.toronto.lat);
      setLon(coords.toronto.lon);
    } else if (city === "miami") {
      setLat(coords.miami.lat);
      setLon(coords.miami.lon);
    } else if (city === "winnipeg") {
      setLat(coords.winnipeg.lat);
      setLon(coords.winnipeg.lon);
    }
  }


  return (
    <div className={styles.container}>
      <nav>
        <ul>
          <button onClick={() => cityClicked("toronto")}>
            <li className={selectedCity === "toronto" && styles.selected}>TORONTO</li>
          </button>
          <button onClick={() => cityClicked("miami")}>
            <li className={selectedCity === "miami" && styles.selected}>MIAMI</li>
          </button>
          <button onClick={() => cityClicked("winnipeg")}>
            <li className={selectedCity === "winnipeg" && styles.selected}>WINNIPEG</li>
          </button>
        </ul >
      </nav >
      <main>
        {loading ? (
          <>
            {!error ? (
              <div>Retrieving Data, Please Wait...</div>
            ) : (
                <div>Sorry, there was an error while retrieving data.</div>
              )}
          </>
        ) : (
            <>
              <div>
                <Today
                  temperature={Math.round(today.temp)}
                  description={today.weather[0].main}
                  icon={<Icon type={today.weather[0].main} nightTime={nightTime} size={130} />}
                />
              </div>
              <div className={styles.forecast}>
                <Card
                  day={dayNames[0]}
                  temperature={Math.round(forecast[1].temp.day)}
                  icon={<Icon type={forecast[1].weather[0].main} size={72} />}
                />
                <Card
                  day={dayNames[1]}
                  temperature={Math.round(forecast[2].temp.day)}
                  icon={<Icon type={forecast[2].weather[0].main} size={72} />}
                />
                <Card
                  day={dayNames[2]}
                  temperature={Math.round(forecast[3].temp.day)}
                  icon={<Icon type={forecast[3].weather[0].main} size={72} />}
                />
                <Card
                  day={dayNames[3]}
                  temperature={Math.round(forecast[4].temp.day)}
                  icon={<Icon type={forecast[4].weather[0].main} size={72} />}
                />
              </div>
            </>
          )
        }
      </main >
    </div >
  )
}