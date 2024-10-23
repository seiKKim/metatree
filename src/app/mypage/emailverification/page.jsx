// src/app/myinfo/EmailVerification.js
"use client";
import React, { useState } from "react";
import axios from 'axios';
import styles from "../../auth/sigup/student/Student.module.css";

const EmailVerification = ({ onVerified }) => {
  const [email, setEmail] = useState(""); // 이메일 상태
  const [verificationCode, setVerificationCode] = useState(""); // 인증번호 상태
  const [isCodeSent, setIsCodeSent] = useState(false); // 인증번호 전송 여부
  const [verificationMessage, setVerificationMessage] = useState(""); // 인증 메시지 상태
  const [isVerified, setIsVerified] = useState(false); // 인증 여부
  const [timer, setTimer] = useState(300); // 5분 타이머
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };


  const handleEmailVerification = async () => {
    if (email) {
      try {
        const response = await axios.post('/api/send-verification', { email });
        if (response.data.success) {
          setIsCodeSent(true);
          setVerificationMessage("인증번호가 전송되었습니다.");
        } else {
          setVerificationMessage("인증번호 전송에 실패했습니다.");
        }
      } catch (error) {
        console.error("Error sending verification code:", error);
        setVerificationMessage("인증번호 전송 중 오류가 발생했습니다.");
      }
    } else {
      setVerificationMessage("이메일을 입력해 주세요.");
    }
  };

  const handleCodeVerification = async () => {
    try {
      const response = await axios.post('/api/verify-code', { email, code: verificationCode });
      if (response.data.success) {
        setIsVerified(true);
        setVerificationMessage("인증이 확인되었습니다.");
        onVerified();
      } else {
        setVerificationMessage("인증번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      setVerificationMessage("인증 확인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.inputWrapEmail}>
      <p className={styles.inputTit}>이메일 인증</p>
      <div className={styles.inputBox}>
        <input
          type="text"
          placeholder="이메일 입력"
          value={email}
          onChange={handleEmailChange}
        />
        <button className={styles.inputBtn} onClick={handleEmailVerification}>
          인증 요청
        </button>
      </div>
      {verificationMessage && (
        <div className={styles.passwordWarning}>
          <span style={{ color: isVerified ? "green" : "red", fontWeight: "bold" }}>
            {verificationMessage}
          </span>
        </div>
      )}
      {isCodeSent && (
        <div className={styles.inputBox}>
          <input
            type="text"
            placeholder="인증번호 입력"
            value={verificationCode}
            onChange={handleVerificationCodeChange}
          />
          <button className={styles.inputBtn} onClick={handleCodeVerification}>
            인증 확인
          </button>
        </div>
      )}
    </div>
  );  
};

export default EmailVerification;
