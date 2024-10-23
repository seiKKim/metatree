// components/SideBar.js
"use client";
import Image from "next/image";
import styles from "../../ui/side.module.css";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const ContentSideBar = () => {
  const { data: session, status } = useSession();

  const pathname = usePathname();
  // 로그인 페이지에서는 Navbar를 렌더링하지 않음
  if (
    pathname === "/" ||
    pathname === "/auth/register" ||
    pathname === "/auth/usertype" ||
    pathname === "/auth/sigup/student" ||
    pathname === "/auth/sigup/teacher" ||
    pathname === "/auth/emailauth" ||
    pathname === "/auth/findid" ||
    pathname === "/auth/findpw"
  ) {
    return null;
  }

  return (
    <div className={styles.sideBox}>
      <div className={styles.userInfo}>
        <p className={styles.title}>내 작품</p>
        <div className={styles.sideNav}>
          <ul className={styles.navList}>
            <li>
              <p>
                <span>
                  <Image
                    src="/ic-mymap.png"
                    alt="아이콘"
                    width={20}
                    height={20}
                  />
                  나의 포트폴리오
                  <Image
                    src="/ic-arrow.png"
                    alt="화살표"
                    className={styles.arrow}
                    width={20}
                    height={20}
                  />
                </span>
                <ul className={`${styles.sideDepth2} ${styles.purple}`}>
                  <li>
                    <a href="#">포트폴리오 리스트</a>
                  </li>
                  <li>
                    <a href="#">포트폴리오 만들기</a>
                  </li>
                  <li>
                    <a href="#">포트폴리오 수정</a>
                  </li>
                  <li>
                    <a href="#">포트폴리오 다운로드</a>
                  </li>
                </ul>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContentSideBar;
