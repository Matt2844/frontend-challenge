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
  const [lat, setLat] = useState(coords.toronto.lat);
  const [lon, setLon] = useState(coords.toronto.lon);
  const [today, setToday] = useState(null)

  useEffect(() => {
    getWeatherToday();
  }, [])

  const getWeatherToday = () => {
    axios.get(`${prefix}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
      .then((res) => {
        setToday(res.data.current);
        setLoading(false)
        console.log(res);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getIcon = () => {

  }


  return (
    <div className={styles.container}>
      <nav>
        <ul>
          <li>TORONTO</li>
          <li>MIAMI</li>
          <li>WINNIPEG</li>
        </ul >
      </nav >
      <main>
        {loading ? (
          <div>Retrieving Data, Please Wait...</div>
        ) : (
            <>
              <div>
                <Today
                  temperature={Math.round(today.temp)}
                  description={today.weather[0].main}
                  icon={<Icon type={today.weather[0].main} size={130} />}
                />
              </div>
              <div className={styles.forecast}>
                <Card icon={<Icon type={"Clear"} size={72} />} />
                <Card icon={<Icon type={"Rain"} size={72} />} />
                <Card icon={<Icon type={"Thunderstorm"} size={72} />} />
                <Card icon={<Icon type={"Drizzle"} size={72} />} />
              </div>
            </>
          )
        }
      </main >
    </div >
  )
}