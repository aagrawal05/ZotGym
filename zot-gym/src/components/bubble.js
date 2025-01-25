import React from 'react';
import styles from 'zot-gym/src/styles/bubble.css';


export default function Bubble({ isSender, message }) {
  const bubbleClass = isSender ? `${styles.messageBox} ${styles.sender}` : `${styles.messageBox} ${styles.receiver}`;

  return (
    <div className={bubbleClass}>
      <p>{message}</p>
    </div>
  );
}

Bubble.propTypes = {
  isSender: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};
