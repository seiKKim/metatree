"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // useRouter 임포트
import styles from "../../../components/ui/style.module.css"; // CSS 모듈 임포트

export default function Registration() {
  const router = useRouter(); // useRouter 훅 사용
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [adsAccepted, setAdsAccepted] = useState(false);
  const [allAccepted, setAllAccepted] = useState(false);

  const handleCancel = () => {
    router.push('/'); // 메인 페이지로 이동
  };

  const handleContinue = () => {
    // 유효성 검사
    if (!termsAccepted) {
      alert("필수 항목인 '이용약관 동의'를 체크해 주세요."); // 경고 메시지
      return;
    }

    // 모든 체크박스가 선택되지 않은 경우
    if (!termsAccepted && !termsAccepted) {
      alert("최소한 하나의 선택 항목을 선택해 주세요."); // 경고 메시지
      return;
    }

    // 유효성 검사를 통과하면 /auth/usertype로 이동
    router.push("/auth/usertype");
  };

  const handleAllAcceptedChange = (e) => {
    const checked = e.target.checked;
    setAllAccepted(checked);
    setTermsAccepted(checked);
    setAdsAccepted(checked);
  };

  return (
    <div className={styles.contentWrap}>
      <div className={`${styles.contentArea} ${styles.myInfoArea}`}>
      <div className={styles.sigupWhiteBg}>
      <img src="/logo.png" alt="메타클래스룸" 
           className={styles.logo} 
      />
          <div className={styles.withInfo}>
            <div className={styles.customCheckbox}>
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
              />
              <label htmlFor="terms">이용약관 동의 (필수)</label>
            </div>
            <ul>
              <li>더 이상 해당 계정으로 METACLASSROOM에 로그인할 수 없게 됩니다.</li>
              <li>스토어에 게시한 모든 항목에 대한 액세스 권한이 사라집니다.</li>
              <li>획득한 포인트가 영구적으로 소멸됩니다.</li>
              <li>구입한 아이템이 영구적으로 소멸됩니다.</li>
              <li>계정에 대한 재사용 및 복구가 불가합니다.</li>
            </ul>
          </div>
          <div className={styles.withInfo}>
          <div className={styles.customCheckbox}>
          <input
                type="checkbox"
                id="ads"
                checked={adsAccepted}
                onChange={() => setAdsAccepted(!adsAccepted)}
              />
              <label htmlFor="ads">광고 수신 동의 (선택)</label>
            </div>
            <ul>
              <li>더 이상 해당 계정으로 METACLASSROOM에 로그인할 수 없게 됩니다.</li>
              <li>스토어에 게시한 모든 항목에 대한 액세스 권한이 사라집니다.</li>
              <li>획득한 포인트가 영구적으로 소멸됩니다.</li>
              <li>구입한 아이템이 영구적으로 소멸됩니다.</li>
              <li>계정에 대한 재사용 및 복구가 불가합니다.</li>
            </ul>
          </div>
          <div className={styles.withInfo}>
            <div className={styles.customCheckbox}>
              <input
                type="checkbox"
                id="all-accepted"
                checked={allAccepted}
                onChange={handleAllAcceptedChange}
              />
              <label htmlFor="all-accepted">모두 동의</label>
            </div>
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
