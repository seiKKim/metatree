// FindPwPopup.js
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // useRouter 임포트
import styles from '../../ui/style.module.css'; // 스타일을 위한 CSS 모듈

const FindPwPopup = ({ onClose, userid }) => {
  const router = useRouter(); // useRouter 훅 사용
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!validatePassword(newPassword)) {
      setErrorMessage("비밀번호는 특수문자, 영문자 또는 숫자를 조합하여 8자 이상 입력하여 주시기 바랍니다.");
      return;
    }

    try {
      // 비밀번호 변경 API 요청
      const response = await fetch("/api/auth/changepassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userid, newPassword }),
      });

      const data = await response.json();

      if (data.success) {
        alert("비밀번호가 변경되었습니다.");
        onClose(); // 팝업 닫기
        // router.push("/"); // 로그인 페이지로 이동
      } else {
        setErrorMessage(data.message); // 에러 메시지 표시
      }
    } catch (error) {
      console.error("비밀번호 변경 에러:", error);
      setErrorMessage("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.pwPopup}>
        <img src="/passwordicon.png" alt="icon" className={styles.icon} /> {/* Add image here */}
        <h2 className={styles.h2}>비밀번호 변경</h2>
        <p>
        비밀번호는 대문자, 소문자, 숫자, 특수문자를<br />
        포함하여 8-12자를 설정해야 합니다.
      </p>
        <input
          className={styles.confirmPasswordInput}
          type="password"
          placeholder="새 비밀번호"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          className={styles.confirmPasswordInput}
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <div>
          <button className={styles.button} onClick={onClose}>취소</button>
          <button className={styles.submitbutton} onClick={handleSubmit}>확인</button>
        </div>
      </div>
    </div>
  );
  
};

export default FindPwPopup;
