// FindPw.js
"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../../components/ui/style.module.css"; // CSS 모듈 임포트
import FindPwPopup from "../../../components/popup/findpw/FindPwPopup"; // 팝업 컴포넌트 임포트

const FindPw = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [userid, setUserid] = useState("");
  const [email, setEmail] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 열림 상태 관리
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태

  const handleFindPw = async () => {
    try {
      // 입력값 확인
      if (!userid || !email) {
        alert("아이디와 이메일을 입력해주세요.");
        return;
      }

      // API 요청
      const response = await fetch("/api/auth/findpw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userid, email }),
      });

      const data = await response.json();

      if (data.success) {
        setErrorMessage(""); // 에러 메시지 초기화
        setIsPopupOpen(true); // 팝업 열기
      } else {
        setErrorMessage(data.message); // 에러 메시지 설정
      }
    } catch (error) {
      console.error("비밀번호 찾기 에러:", error);
      setErrorMessage("비밀번호 찾기에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // 팝업 닫기
  };

  return (
    <div className="content-wrap">
      <div className={`white-bg ${styles.loginwrap}`}>
        <div className={styles.inner}>
        <h1 className={styles.logo}>
              <Link href="/"> 
                <Image
                  src="/logo.png"
                  alt="메타클래스룸"
                  width={500}
                  height={200}
                  style={{ cursor: 'pointer' }}
                />
              </Link>
            </h1>
          <p className={styles.title}>비밀번호가 기억나지 않으세요?</p>
          <p className={styles.loginalert}>
            회원정보에 등록한 아이디 및 이메일을 입력해 주세요
          </p>
          <div className={styles.loginform}>
            <div className={styles.inputwrap}>
              <p className={styles.inputtit}>아이디</p>
              <input
                type="text"
                placeholder="아이디를 입력해주세요."
                value={userid}
                onChange={(e) => setUserid(e.target.value)} // 입력값 변경 처리
              />
            </div>
            <div className={styles.inputwrap}>
              <p className={styles.inputtit}>이메일</p>
              <input
                type="text"
                placeholder="이메일을 입력해 주세요."
                value={email}
                onChange={(e) => setEmail(e.target.value)} // 입력값 변경 처리
              />
            </div>
          </div>

          <div className={styles.loginbtn}
              style={{ margin: "30px 0 30px" }}
          >
            <button onClick={handleFindPw}>비밀번호 찾기</button>
          </div>

          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}

          <ul className={styles.loginetc}>
            <li>
              <Link href="/auth/findid">아이디 찾기</Link>
            </li>
          </ul>
        </div>
      </div>
      {/* 팝업 표시 */}
      {isPopupOpen && (
        <FindPwPopup 
          onClose={handleClosePopup} 
          userid={userid} // userid를 팝업에 전달
        />
      )}
    </div>
  );
};

export default FindPw;
