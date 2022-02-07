import React from 'react';
import styles from './card.less';

export default function Prediction ({ icon, temperature, day }) {

  return (
    <div className={styles.container}>
      <h4>{day}</h4>
      <span>{icon}</span>
      <p className={styles.number}>{temperature}&#176;</p>
    </div>
  )
}