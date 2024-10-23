"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import styles from "../../../components/ui/style.module.css"; // CSS 모듈 임포트
import FindPwPopup from "../../../components/popup/findpw/FindPwPopup"; // 팝업 컴포넌트 임포트

const MyInfo = () => {
  const { data: session } = useSession(); // 세션에서 사용자 정보 가져오기
  const [userInfo, setUserInfo] = useState(null);
  const [nickname, setNickname] = useState("");
  const [grade, setGrade] = useState("");
  const [gradeClass, setGradeClass] = useState("");
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
  const [isPasswordChangePopupOpen, setIsPasswordChangePopupOpen] =
    useState(false); //패스워드 변경 팝업

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          `/api/myinfo?userid=${session.user.mem_userid}&schoolid=${session.user.mem_school_id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }
        const data = await response.json();
        setUserInfo(data);
        setNickname(data.mem_nickname); // 초기 닉네임 설정
        setGrade(data.mem_grade);
        setGradeClass(data.mem_class); // 초기 반 설정
        console.log("사용자정보:", data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    if (session?.user) {
      fetchUserInfo();
    }
  }, [session]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/myinfo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: session.user.mem_userid,
          nickname,
          grade,
          gradeClass,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user info");
      }

      const updatedData = await response.json();
      setUserInfo(updatedData);
      setIsEditing(false); // 수정 모드 종료
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  const handlePasswordChangeClick = () => {
    setIsPasswordChangePopupOpen(true);
  };

  return (
    <div className={styles.contentWrap}>
      <div className={`${styles.contentArea} ${styles.myInfoArea}`}>
        <div className={styles.whiteBg}>
          <div className={styles.mainTit}>
            <h3>내정보</h3>
          </div>
          <div className={styles.formWrap}>
            <div className={styles.inputWrap}>
              <p className={styles.inputTitle}>아이디</p>
              <div className={styles.inputBox}>
                <input
                  type="text"
                  value={userInfo?.mem_userid || ""}
                  readOnly
                />
              </div>
            </div>
            <div className={styles.inputWrap}>
              <p className={styles.inputTitle}>비밀번호</p>
              <div className={styles.inputBox}>
                <input type="password" placeholder="******" readOnly />
                <button
                  className={styles.inputBtn}
                  onClick={handlePasswordChangeClick}
                >
                  비밀번호 변경
                </button>
              </div>
            </div>
            {isPasswordChangePopupOpen && (
              <FindPwPopup
                onClose={() => setIsPasswordChangePopupOpen(false)}
                userid={userInfo?.mem_userid}
              />
            )}
            <div className={styles.inputWrap}>
              <p className={styles.inputTitle}>닉네임</p>
              <div className={styles.inputBox}>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  readOnly={!isEditing} // 수정 모드일 때만 수정 가능
                />
              </div>
            </div>
            <div className={styles.inputWrap}>
              <p className={styles.inputTitle}>학교</p>
              <div className={styles.myInputBox}>
                <input
                  type="text"
                  value={userInfo?.school?.school_name || ""}
                  readOnly
                />
              </div>
            </div>
            <div className={styles.myInputList}>
              <div className={styles.inputWrap}>
                <p className={styles.inputTitle}>학년</p>
                <div className={styles.myInputBox}>
                  <input
                    type="text"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    readOnly={!isEditing} // 수정 모드일 때만 수정 가능
                  />
                </div>
              </div>
              <div className={styles.inputWrap}>
                <p className={styles.inputTitle}>반</p>
                <div className={styles.myInputBox}>
                  <input
                    type="text"
                    value={gradeClass}
                    onChange={(e) => setGradeClass(e.target.value)}
                    readOnly={!isEditing} // 수정 모드일 때만 수정 가능
                  />
                </div>
              </div>
              {userInfo?.mem_is_role === "S" && (
                <div className={styles.inputWrap}>
                  <p className={styles.inputTitle}>번호</p>
                  <div className={styles.myInputBox}>
                    <input
                      type="text"
                      value={userInfo?.mem_number || ""}
                      readOnly
                    />
                  </div>
                </div>
              )}
            </div>
            {userInfo?.mem_is_role === "T" && (
              <div className={styles.inputWrap}>
                <p className={styles.inputTitle}>교원번호</p>
                <div className={styles.myInputBox}>
                  <input
                    type="text"
                    value={userInfo?.mem_teacher_number || ""}
                    readOnly
                  />
                </div>
              </div>
            )}
            <div className={styles.inputWrap}>
              <p className={styles.inputTitle}>등급</p>
              <div className={styles.myInputBox}>
                <input
                  type="text"
                  value={
                    userInfo?.mem_is_role === "T"
                      ? "선생님"
                      : userInfo?.mem_is_role === "S"
                      ? "학생"
                      : ""
                  }
                  readOnly
                />
              </div>
            </div>
            <div className={styles.cancleBtn}>
              <button>회원탈퇴</button>
            </div>
          </div>
        </div>
        <div className={styles.editBtn}>
          {isEditing ? (
            <>
              <button style={{ marginRight: "20px" }} onClick={handleSave}>
                저장
              </button>
              <button onClick={handleEditToggle}>취소</button>
            </>
          ) : (
            <button onClick={handleEditToggle}>수정</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyInfo;
