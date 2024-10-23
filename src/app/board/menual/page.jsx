"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Image from "next/image"; // Image 컴포넌트 가져오기
import styles from "../../../components/ui/style.module.css";

const Menual = () => {
  const { data: session } = useSession(); // 세션에서 사용자 정보 가져오기
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (session) {
      // 세션이 있을 경우 사용자 정보를 설정하는 로직 추가 가능
      setUserInfo(session.user);
    }
  }, [session]);

  return (
    <div className={styles.contentWrap}>
      <div className={`${styles.contentArea} ${styles.myInfoArea}`}>
        <div className={styles.dashTitle}>
          <p className={styles.mainTitle}>
            <img className={styles.img} src="/ic-student.png" alt="메뉴얼" />
            메뉴얼
          </p>
        </div>
        <div className={styles.whiteBg}>
          <div className={styles.inner}>
            <h1 className={styles.logo}>
              <Image
                src="/logo.png"
                alt="메타클래스룸"
                width={500}
                height={200}
              />
            </h1>
            <p className={styles.title}>메뉴얼을 통해 더 자세히 알아보세요!</p>

            <div className={styles.downloadbtn}>
              <button className={styles.dwbutton}>일반/학생용 메뉴얼 다운로드</button>
            </div>
            <div className={styles.downloadbtn}>
              <button className={styles.dwbutton}>교사용 메뉴얼 다운로드</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menual;
