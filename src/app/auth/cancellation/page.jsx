"use client"

import { useState } from 'react';
import styles from '../../../components/ui/style.module.css'; // CSS 파일 임포트

export default function WithdrawConfirmation() {
  const [email] = useState("jw.jang@globepoint.co.kr");

  const handleCancel = () => {
    // 취소 처리 로직 추가
  };

  const handleContinue = () => {
    // 계정 삭제 처리 로직 추가
    console.log("계정 삭제 진행:", email);
  };

  return (
    <div className={styles.contentwrap}>
      <div className={`${styles.contentArea} ${styles.withdrawArea}`}>
        <div className={styles.whiteBg}>
          <img src="/logo.png" alt="메타클래스룸" className={styles.logo} />
          <p className={styles.withAlert}>
            계정 <span>{email}</span> 을(를) <br />
            정말로 삭제하시겠습니까?
          </p>
          <div className={styles.withInfo}>
            <h3>계정을 삭제하는 경우</h3>
            <ul>
              <li>더 이상 해당 계정으로 METACLASSROOM에 로그인할 수 없게 됩니다.</li>
              <li>스토어에 게시한 모든 항목에 대한 액세스 권한이 사라집니다.</li>
              <li>획득한 포인트가 영구적으로 소멸됩니다.</li>
              <li>구입한 아이템이 영구적으로 소멸됩니다.</li>
              <li>계정에 대한 재사용 및 복구가 불가합니다.</li>
            </ul>
            <p>계속하시겠습니까?</p>
          </div>
        </div>
        <div className={styles.btnWrap}>
          <button onClick={handleCancel}>취소하기</button>
          <button className={`${styles.on}`} onClick={handleContinue}>계속하기</button>
        </div>
      </div>
    </div>
  );
}
