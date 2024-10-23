// src/app/license/page.js
import React from 'react';
import styles from "../../../components/ui/style.module.css"; // CSS 모듈 임포트

const License = () => {
  return (
    <div className={styles.contentWrap}>
      <div className={styles.mylicenArea}>
        <div className={styles.inuseWrap}>
          <p className={styles.inuseTxt}>
            현재 이용중인 라이선스는
            <span>000</span> 입니다.
          </p>
          <p className={styles.inuseDate}>
            이용 기간 : 2022.04.01 ~ 2023.03.31
          </p>
        </div>
        <div className={styles.licenWrap}>
          <div className={styles.mainTit}>
            <h3>라이선스</h3>
          </div>
          <div className={styles.licenList}>
            {/* 라이선스 박스 반복 */}
            {Array(8).fill().map((_, index) => (
              <div key={index} className={`${styles.licenBox} ${styles.green}`}>
                <h3 className={styles.color}>VRWARE Edu School</h3>
                <p>
                  현재 VRWARE Edu School (을)를
                  <span className={styles.color}>사용중</span> 입니다.
                </p>
                <ul>
                  <li>구매일자: 2023-08-04</li>
                  <li>구매일자: 2023-08-04</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default License;
