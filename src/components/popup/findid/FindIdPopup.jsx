// Popup.js
import React from 'react';
import styles from '../../ui/style.module.css'; // 스타일을 위한 CSS 모듈

const Popup = ({ message, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.pwPopup}>
        <h2>찾은 아이디</h2>
        <p>{message}</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default Popup;
