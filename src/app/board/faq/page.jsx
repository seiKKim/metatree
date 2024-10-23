"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import styles from "../../../components/ui/style.module.css";

const Faq = () => {
  const { data: session } = useSession(); // 세션에서 사용자 정보 가져오기
  const [userInfo, setUserInfo] = useState(null);
  

  return (
    <div className={styles.contentWrap}>
      <div className={`${styles.contentArea} ${styles.myInfoArea}`}>
      <div className={styles.dashTitle}>
          <p className={styles.mainTitle}>
            <img className={styles.img} src="/ic-student.png" alt="학생등록" />
            FAQ 게시판
          </p>
        </div>
        <div className={styles.whiteBg}>
            
        </div>
      </div>
    </div>
  );
};

export default Faq;

