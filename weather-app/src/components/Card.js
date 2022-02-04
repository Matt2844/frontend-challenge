import React from 'react';
import styles from './card.less';

export default function Prediction ({ icon }) {

  return (
    <div className={styles.container}>
      <h4>Wed</h4>
      <span>{icon}</span>
      <p className={styles.number}>17&#176;</p>
    </div>
  )
}