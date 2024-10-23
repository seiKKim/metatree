"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../../components/ui/style.module.css"; // CSS 모듈 임포트
import Popup from "../../../components/popup/findid/FindIdPopup"; // 팝업 컴포넌트 임포트

const FindId = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [foundId, setFoundId] = useState(""); // 찾은 아이디 저장 상태
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태
  const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 열림 상태 관리

  const handleFindId = async () => {
    try {
      // 입력값 확인
      if (!username || !email) {
        alert("이름과 이메일을 입력해주세요.");
        return;
      }

      // API 요청
      const response = await fetch("/api/auth/findid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email }),
      });

      const data = await response.json();

      if (data.success) {
        setFoundId(data.id); // 찾은 아이디 설정
        setErrorMessage(""); // 에러 메시지 초기화
        setIsPopupOpen(true); // 팝업 열기
      } else {
        setErrorMessage(data.message); // 에러 메시지 설정
        setFoundId(""); // 아이디 초기화
      }
    } catch (error) {
      console.error("아이디 찾기 에러:", error);
      setErrorMessage("아이디 찾기에 실패했습니다. 다시 시도해주세요.");
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
          <p className={styles.title}>아이디가 기억나지 않으세요?</p>
          <p className={styles.loginalert}>
            회원정보에 등록한 이름 및 이메일을 입력해 주세요
          </p>
          <div className={styles.loginform}>
            <div className={styles.inputwrap}>
              <p className={styles.inputtit}>이름</p>
              <input
                type="text"
                placeholder="이름을 입력해주세요."
                value={username}
                onChange={(e) => setUsername(e.target.value)} // 입력값 변경 처리
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
            <button onClick={handleFindId}>아이디 찾기</button>
          </div>

          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}

          <ul className={styles.loginetc}>
            <li>
              <Link href="/auth/findpw">비밀번호 찾기</Link>
            </li>
            <li>
              <Link href="/">로그인</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* 팝업 표시 */}
      {isPopupOpen && (
        <Popup message={foundId} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default FindId;
