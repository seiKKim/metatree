"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import styles from "../../../../components/ui/style.module.css"; // CSS 모듈 임포트

import SchoolSearchPopup from "../../../../components/popup/schoolSearchPopup/SchoolSearchPopup"; // 팝업 임포트

const StudentInfo = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [roleState, setRoleState] = useState("학생");
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const [class_, setClass] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isIdAvailable, setIsIdAvailable] = useState(null);
  const [idWarning, setIdWarning] = useState("");
  const [passwordWarning, setPasswordWarning] = useState("");
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);

  useEffect(() => {
    const role = searchParams.get("role");
    if (role === "S") {
      setRoleState("학생");
    }
  }, [searchParams]);

  const handleUIdChange = async (e) => {
    const newUserId = e.target.value;
    setUserid(newUserId);

    // 아이디 유효성 검사
    if (newUserId.length < 5) {
      setIdWarning("아이디는 5자 이상 입력해야 합니다.");
      setIsIdAvailable(null);
      return;
    } else {
      setIdWarning("");
    }

    // 아이디 중복 체크 API 호출
    try {
      const response = await fetch(`/api/member?userid=${newUserId}`);
      const data = await response.json();

      // API 응답 처리
      if (response.ok) {
        setIsIdAvailable(true);
      } else {
        setIsIdAvailable(false);
        setIdWarning(data.error);
      }
    } catch (error) {
      console.error("아이디 중복 체크 오류:", error);
      setIdWarning("아이디 중복 체크에 실패했습니다.");
    }
  };

  const validatePassword = (password) => {
    const isValid =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        password
      );
    return isValid;
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);

    // 비밀번호 유효성 검사
    const isValid = validatePassword(password);
    if (!isValid && password.length > 0) {
      setPasswordWarning(
        "비밀번호는 특수문자, 영문자 또는 숫자를 조합하여 8자 이상 입력하여 주시기 바랍니다."
      );
    } else {
      setPasswordWarning("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);

    // 비밀번호 일치 여부 확인
    const isMatched = password === confirmPassword;
    setIsConfirmPasswordValid(isMatched);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // roleState 값에 따라 role 설정
    const role = roleState === "선생님" ? "T" : "S";

    // 모든 필드 유효성 검사
    if (
      !isIdAvailable ||
      !validatePassword(password) ||
      password !== confirmPassword
    ) {
      alert("입력 정보를 다시 확인해주세요.");
      return;
    }

    // 서버로 데이터 전송
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid,
          password,
          name,
          nickname,
          schoolId, // school 대신 schoolId 사용
          grade,
          class: class_,
          number,
          role,
          email,
        }),
      });

      if (response.ok) {
        alert("회원가입이 완료되었습니다! 이메일 인증 페이지로 이동합니다.");
        // 회원가입 성공 후 이메일 인증 페이지로 리다이렉트
        window.location.href = `/auth/emailauth?email=${encodeURIComponent(
          email
        )}`;
      } else {
        const errorData = await response.json();
        alert(`회원가입 실패: ${errorData.message}`);
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  const handleSchoolClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSelectSchool = (school) => {
    setSelectedSchool(school);
    setSchool(school.school_name);
    setSchoolId(school.school_id); // 학교 ID 저장
    setIsPopupOpen(false);
  };

  return (
    <div className={styles.contentWrap}>
      <div className={`${styles.contentArea} ${styles.myInfoArea}`}>
        <img src="/logo.png" alt="메타클래스룸" className={styles.logo} />
        <div className={styles.sigupWhiteBg}>
          <div className={styles.mainTit}>
            <h3>회원정보 입력</h3>
          </div>
          <div className={styles.formWrap}>
            
            <div className={styles.inputWrap}>
              <p className={styles.inputTitle}>아이디</p>
              <div className={styles.inputBox}>
                <input
                  type="text"
                  placeholder="Jw.jang@globepoint.co.kr"
                  value={userid}
                  onChange={handleUIdChange}
                />
              </div>
            </div>
            {idWarning && (
              <div className={styles.passwordWarning}>
                <span style={{ color: "red", fontWeight: "bold" }}>
                  {idWarning}
                </span>
              </div>
            )}
            {userid.length > 0 && (
              <div className={styles.idAvailabilityMessage}>
                {isIdAvailable === true && (
                  <span
                    style={{
                      color: "#39FF14",
                      fontWeight: "bold",
                      marginLeft: "145px",
                    }}
                  >
                    *사용 가능한 아이디입니다.
                  </span>
                )}

                {isIdAvailable === false && (
                  <span
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    *이미 사용 중인 아이디입니다.
                  </span>
                )}
              </div>
            )}
            <div className={styles.inputWrap}>
              <p className={styles.inputTitle}>비밀번호</p>
              <div className={styles.inputBox}>
                <input
                  type="password"
                  placeholder="******"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
            {passwordWarning && (
              <div className={styles.passwordWarning}>
                <span style={{ color: "red", fontWeight: "bold" }}>
                  {passwordWarning}
                </span>
              </div>
            )}
            <div className={styles.inputWrap}>
              <p className={styles.inputTitle}>비밀번호 확인</p>
              <div className={styles.inputBox}>
                <input
                  type="password"
                  placeholder="******"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
            </div>
            {confirmPassword.length > 0 && !isConfirmPasswordValid && (
              <div className={styles.passwordWarningContainer}>
                <div className={styles.passwordWarning}>
                  비밀번호가 일치하지 않습니다.
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.sigupWhiteBg}>
          <div className={styles.mainTit}>
            <h3>기타 정보</h3>
          </div>
          <div className={styles.formWrap}>
            <div className={styles.inputWrap}>
              <p className={styles.inputTitle}>이름</p>
              <div className={styles.inputBox}>
                <input
                  type="text"
                  placeholder="가든"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.inputWrap}>
              <p className={styles.inputTitle}>닉네임</p>
              <div className={styles.inputBox}>
                <input
                  type="text"
                  placeholder="가든"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.inputWrap} onClick={handleSchoolClick}>
              <p className={styles.inputTitle}>학교</p>
              <div className={styles.inputBox}>
                <input
                  type="text"
                  placeholder="브이알웨어 초등학교"
                  value={selectedSchool ? selectedSchool.school_name : ""} // 선택한 학교 이름 표시
                  onChange={(e) => setSchool(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.sigupInputList}>
              <div className={styles.inputWrap}>
                <p className={styles.inputTitle}>학년</p>
                <div className={styles.inputBox}
                style={{ marginLeft: "15px" }}
                >
                  <input
                    type="text"
                    placeholder="6 학년"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.inputWrap}>
                <p className={styles.inputTitle}>반</p>
                <div className={styles.inputBox}>
                  <input
                    type="text"
                    placeholder="3 반"
                    value={class_}
                    onChange={(e) => setClass(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.inputWrap}>
                <p className={styles.inputTitle}>번호</p>
                <div className={styles.inputBox}>
                  <input
                    type="text"
                    placeholder="15 번"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className={styles.inputWrap}>
              <p className={styles.inputTitle}>등급</p>
              <div className={styles.inputBox}>
                <input
                  type="text"
                  placeholder="등급 입력"
                  value={roleState} // roleState 사용
                  readOnly // 읽기 전용
                />
              </div>
            </div>
            <div className={styles.inputWrap}>
              <p className={styles.inputTitle}>이메일</p>
              <div className={styles.inputBox}>
                <input
                  type="email"
                  placeholder="이메일 주소"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.editBtn}>
          <button onClick={handleSubmit}>가입하기</button>
        </div>
      </div>
      <SchoolSearchPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onSelectSchool={handleSelectSchool}
      />
    </div>
  );
};

export default StudentInfo;
