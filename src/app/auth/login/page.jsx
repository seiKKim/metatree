"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../../components/ui/style.module.css"; // CSS 모듈 임포트

const LoginPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [rememberMe, setRememberMe] = useState(false); // 아이디 저장 상태
  const [savePassword, setSavePassword] = useState(false); // 비밀번호 저장 상태

  useEffect(() => {
    // 페이지 로드 시 로컬 스토리지에서 아이디와 비밀번호 불러오기
    const savedUsername = localStorage.getItem("savedUsername");
    const savedPassword = localStorage.getItem("savedPassword");
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true); // 체크박스 상태를 true로 설정
    }
    if (savedPassword) {
      setPassword(savedPassword);
      setSavePassword(true); // 체크박스 상태를 true로 설정
    }
  }, []);

  useEffect(() => {
    // rememberMe 또는 savePassword 상태가 변경될 때 로컬 스토리지에 반영
    if (rememberMe) {
      localStorage.setItem("savedUsername", username);
    } else {
      localStorage.removeItem("savedUsername");
    }

    if (savePassword) {
      localStorage.setItem("savedPassword", password);
    } else {
      localStorage.removeItem("savedPassword");
    }
  }, [rememberMe, savePassword, username, password]);

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSavePasswordChange = (e) => {
    setSavePassword(e.target.checked);
  };
 
  const handleLogin = async () => {
    try {
      if ( !username || !password) {
        alert("모든 필드를 입력해주세요.");
        return;
      }

      const result = await signIn("credentials", {
        redirect: false,
        mem_userid: username,
        mem_password: password,
      });

      if (result.error) {
        alert(result.error);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className={styles.contentWrap}>
      <div className={styles.loginwrap}>
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
          <div className={styles.loginform}>
            <div className={styles.inputwrap}>
              <p className={styles.inputtit}>아이디</p>
              <input
                type="text"
                placeholder="아이디를 입력해 주세요."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={styles.inputwrap}>
              <p className={styles.inputtit}>비밀번호</p>
              <input
                type="password"
                placeholder="비밀번호를 입력해 주세요."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.checklist}>
            <label className={styles.checkwrap}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMeChange} // 체크박스 변경 핸들러
              />
              <span className={styles.checkbox}></span>
              <span>아이디저장</span>
            </label>
            <label className={styles.checkwrap}>
              <input
                type="checkbox"
                checked={savePassword}
                onChange={handleSavePasswordChange} // 비밀번호 저장 체크박스 핸들러
              />
              <span className={styles.checkbox}></span>
              <span>비밀번호 저장</span>
            </label>
          </div>
          <div className={styles.loginbtn}>
            <button onClick={handleLogin}>로그인</button>
          </div>
          <ul className={styles.loginsite}>
            <li>
              <button>VRWARE 로그인</button>
            </li>
            <li>
              <button>카카오톡 로그인</button>
            </li>
            <li>
              <button>네이버 로그인</button>
            </li>
          </ul>
          <ul className={styles.loginetc}>
            <li>
              <Link href="/auth/findid">아이디/비밀번호 찾기</Link>
            </li>
            <li>
              <Link href="/auth/register">회원가입</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
