import React, { useState } from 'react';

// components and stylesheets
import Today from '../components/Today';
import Card from '../components/Card';
import styles from './weather.less';

// icons
import { WiDaySunny } from "weather-icons-react";


export default function Weather () {
  const [selectedCity, setSelectedCity] = useState("ottawa");


  return (
    <div className={styles.container}>
      <nav>
        <ul>
          <li>OTTAWA</li>
          <li>MOSCOW</li>
          <li>TOKYO</li>
        </ul>
      </nav>
      <main>
        <div>
          <Today icon={<WiDaySunny size={140} color='#000' />}>19 clouds</Today>
        </div>
        <div className={styles.forecast}>
          <Card icon={<WiDaySunny size={72} color='#000' />} />
          <Card icon={<WiDaySunny size={72} color='#000' />} />
          <Card icon={<WiDaySunny size={72} color='#000' />} />
          <Card icon={<WiDaySunny size={72} color='#000' />} />
        </div>
      </main>
    </div>
  )
}