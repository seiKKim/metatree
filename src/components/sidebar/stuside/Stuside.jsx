// components/SideBar.js
"use client";
import Image from "next/image";
import styles from "../../ui/side.module.css";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from 'next/link'; // Link 컴포넌트 import

const SideBar = () => {
  const { data: session, status } = useSession();

  const pathname = usePathname();
  // 로그인이 필요 없는 경로에서는 Sidebar를 렌더링하지 않습니다.
  if (
    pathname === "/" ||
    pathname === "/auth/register" ||
    pathname === "/auth/usertype" ||
    pathname === "/auth/sigup/student" ||
    pathname === "/auth/sigup/teacher" ||
    pathname === "/auth/sigup/kinder" ||
    pathname === "/auth/emailauth" ||
    pathname === "/auth/findid" ||
    pathname === "/auth/findpw"||
    pathname === "/dashboard" ||//메인화면에서 사이드바 없애기
    pathname === "/introboard" //소개화면에서 사이드바 없애기
  ) {
    return null;
  }

  return (
    <div className={styles.sideBox}>
      <div className={styles.imgBox}>
        <Image src="/user-img.png" alt="유저이미지" width={164} height={164} />
      </div>
      <div className={styles.userInfo}>
        <ul className={styles.infoList}>
          <li>{session?.user?.mem_username || ""}</li>
          <li>{session?.user?.mem_email || ""}r</li>
        </ul>
        <div className={styles.sideNav}>
          <p className={styles.title}>마이페이지</p>
          <ul className={styles.navList}>
            <li>
              <div>
                <p>
                  <span>
                    <Image
                      src="/ic-my.png"
                      alt="아이콘"
                      width={20}
                      height={20}
                    />
                    내 정보
                    <Image
                      src="/ic-arrow.png"
                      alt="화살표"
                      className={styles.arrow}
                      width={20}
                      height={20}
                    />
                  </span>
                </p>
                <ul className={`${styles.sideDepth2} ${styles.purple}`}>
                  <li>
                    <a href="">라이선스 현황</a>
                  </li>
                  <li>
                    <a href="#">배지</a>
                  </li>
                  <li>
                    <a href="#">정보수정</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
            <Link href="#">
                <p>
                  <span>
                    <Image
                      src="/ic-list2.png"
                      alt="아이콘"
                      width={20}
                      height={20}
                    />
                    회원 탈퇴
                    <Image
                      src="/ic-arrow.png"
                      alt="화살표"
                      className={styles.arrow}
                      width={20}
                      height={20}
                    />
                  </span>
                </p>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.sideBottom}>
          <p className={styles.memberName}>
            <span>{session?.user?.mem_username || ""}</span> 님 환영합니다!
          </p>
          <a href="#" className={styles.withdrawBtn}>
            회원탈퇴
          </a>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
