"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // To navigate programmatically
import styles from "../../../components/ui/style.module.css"; // CSS 모듈 임포트

export default function Usertype() {
  const router = useRouter();
  const [role, setRole] = useState('');

  // Navigation functions with role parameters
  const handleKinderSignup = () => {
    setRole('U');
    router.push("/auth/sigup/kinder");
  };
  const handleStudentSignup = () => {
    setRole('S');
    router.push("/auth/sigup/student");
  };

  const handleTeacherSignup = () => {
    setRole('T');
    router.push("/auth/sigup/teacher");
  };

  return (
    <div className={styles.contentWrap}>
      <div className={`${styles.contentArea} ${styles.myInfoArea}`}>
      <div className={styles.sigupWhiteBg}>
          <img src="/logo.png" alt="메타클래스룸" className={styles.logo} />
          <p className={styles.title}>회원가입 유형을 선택해 주세요.</p>
          <div className={styles.typeOptions}>
            <div className={styles.option} onClick={handleTeacherSignup}>
              <img src="/teacher.png" alt="선생님" className={styles.icon} />
              <p className={styles.description}>선생님</p>
              <button className={styles.typeButton}>가입하기</button>
            </div>
            <div className={styles.option} onClick={handleStudentSignup}>
              <img src="/student.png" alt="학생" className={styles.icon} />
              <p className={styles.description}>학생</p>
              <button className={styles.typeButton}>가입하기</button>
            </div>
            <div className={styles.option} onClick={handleKinderSignup}>
              <img src="/student.png" alt="유아" className={styles.icon} />
              <p className={styles.description}>유아</p>
              <button className={styles.typeButton}>가입하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
