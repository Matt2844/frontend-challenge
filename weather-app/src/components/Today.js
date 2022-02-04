import React from 'react';
import styles from './today.less';

export default function Today ({ icon, description, temperature }) {

  return (
    <div className={styles.container}>
      <h3>Today</h3>
      <div className={styles.content}>
        <span>{icon}</span>
        <div>
          <p className={styles.number}>{temperature}&#176;</p>
          <h4>{description}</h4>
        </div>
      </div>
    </div >
  )
}

