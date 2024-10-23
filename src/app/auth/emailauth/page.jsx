"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import styles from "../../../components/ui/style.module.css";

const EmailAuth = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleEmailVerification = async () => {
    if (email) {
      try {
        const response = await axios.post("/api/send-verification", { email });
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

  const handleVerifyCode = async () => {
    if (verificationCode) {
      try {
        const response = await axios.post("/api/verify-code", {
          email,
          code: verificationCode,
        });
        if (response.data.success) {
          setVerificationMessage("이메일 인증이 완료되었습니다.");
          // 인증 완료 후 처리 (예: 메인 페이지로 리다이렉트)
          setTimeout(() => {
            router.push("/");
          }, 2000);
        } else {
          setVerificationMessage("잘못된 인증번호입니다.");
        }
      } catch (error) {
        console.error("Error verifying code:", error);
        setVerificationMessage("인증 과정에서 오류가 발생했습니다.");
      }
    } else {
      setVerificationMessage("인증번호를 입력해 주세요.");
    }
  };

  return (
    <div className={styles.contentWrap}>
      <div className={`${styles.contentArea} ${styles.myInfoArea}`}>
        <img src="/logo.png" alt="메타클래스룸" className={styles.logo} />
        <div className={styles.emailWhiteBg}>
          <div className={styles.mainTit}>
            <h3>이메일 인증을 진행해주세요</h3>
            <img
              src="/email-icon.png"
              alt="이메일 아이콘"
              className={styles.emailIcon}
            />
          </div>
          <div className={styles.emailInputWrap}>
            <p className={styles.inputTit}>
              {" "}
              이메일 확인을 위한 메일이 발송되었습니다.
            </p>
            <p className={styles.inputTit}>
              가입을 완료하시려면 전송된 이메일을 확인하여 가입 절차를 완료해
              주시기 바랍니다.
            </p>
            <p className={styles.inputTit}>발송된 이메일 주소 : {email}</p>
            <div className={styles.ssoEditBtn}>
              <button onClick={handleEmailVerification} disabled={isCodeSent}>
                인증번호 전송
              </button>
            </div>
          </div>
          <p>{verificationMessage}</p>
          <div className={styles.emailInputWrap}>
            {isCodeSent && (
              <div className={styles.inputBox}>
                <input
                  className={styles.ssoInput}
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="인증번호 입력"
                />
                <div className={styles.ssoButton}>
                  <button onClick={handleVerifyCode}>인증하기</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailAuth;
