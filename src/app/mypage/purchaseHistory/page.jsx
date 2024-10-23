// src/app/purchase/PurchaseHistory.js
import React from 'react';
import styles from "../../../components/ui/style.module.css"; // CSS 모듈 임포트

const PurchaseHistory = () => {
  const historyItems = [
    {
      category: '오브젝트',
      icon: '/ic-object.png',
      thumbnail: '/his-thumb.png',
      title: '미녀와 야수',
      points: 300,
      date: '2022. 10. 16.',
    },
    {
      category: '맵',
      icon: '/ic-map.png',
      thumbnail: '/his-thumb.png',
      title: '미녀와 야수',
      points: 300,
      date: '2022. 10. 16.',
    },
  ];

  return (
    <div className={styles.contentWrap}>
      <div className={styles.contentArea }>
        <div className={styles.whiteBg}>
          <h3 className={styles.areaTitle}>구매내역</h3>
          <div className={styles.hisList}>
            {historyItems.map((item, index) => (
              <div key={index} className={styles.hisItem}>
                <div className={styles.hisCata}>
                  <div className={styles.icon}>
                    <img src={item.icon} alt={item.category} />
                  </div>
                  <p>{item.category}</p>
                </div>
                <div className={styles.hisCon}>
                  <div className={styles.imgBox}>
                    <img src={item.thumbnail} alt="썸네일" />
                  </div>
                  <p>{item.title}</p>
                </div>
                <div className={styles.hisEct}>
                  <p className={styles.point}>
                    {item.points} <img src="/ic-point.png" alt="포인트" />
                  </p>
                  <p className={styles.date}>{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;
