import React from 'react';
import styles from './today.less';

export default function Today ({ icon }) {

  return (
    <div className={styles.container}>
      <h3>Today</h3>
      <div className={styles.content}>
        <span>{icon}</span>
        <div>
          <p className={styles.number}>19&#176;</p>
          <h4>Sunny</h4>
        </div>
      </div>
    </div >
  )
}

