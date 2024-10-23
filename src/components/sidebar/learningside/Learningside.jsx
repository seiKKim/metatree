// components/SideBar.js
"use client";
import Image from "next/image";
import styles from "../../ui/side.module.css";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from 'next/link'; // Link 컴포넌트 import

const Learningside = () => {
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
        <p className={styles.title}>학습관리</p>
        <div className={styles.sideNav}>
          <ul className={styles.navList}>
            <li>
              <Link href="/learning/classschedule">
                <p>
                  <span>
                    <Image
                      src="/ic-mymap.png"
                      alt="아이콘"
                      width={20}
                      height={20}
                    />
                    학교 시간표
                  </span>
                </p>
              </Link>
            </li>
            <li>
            <Link href="/learning/classboard">
                <p>
                  <span>
                    <Image
                      src="/ic-mymap.png"
                      alt="아이콘"
                      width={20}
                      height={20}
                    />
                    학교 게시판
                  </span>
                </p>
              </Link>
            </li>
            <li>
              <div>
                <p>
                  <span>
                    <Image
                      src="/ic-class2.png"
                      alt="아이콘"
                      width={20}
                      height={20}
                    />
                    학급관리
                    <Image
                      src="/ic-arrow.png"
                      alt="화살표"
                      className={styles.arrow}
                      width={20}
                      height={20}
                    />
                  </span>

                  <ul className={`${styles.sideDepth2} ${styles.orange}`}>
                    <li>
                      <a href="/learning/students">학생관리</a>
                    </li>
                    <li>
                      <a href="/learning/attendance">출석관리</a>
                    </li>
                    <li>
                      <a href="/learning/class">반 그룹관리</a>
                    </li>
                    <li>
                      <a href="/learning/groups">모둠관리</a>
                    </li>
                    <li>
                      <a href="/learning/assignments">과제관리</a>
                    </li>
                    <li>
                      <a href="/learning/grades">성적관리</a>
                    </li>
                  </ul>
                </p>
              </div>
            </li>
            <li>
              <div>
                <p>
                  <span>
                    <Image
                      src="/ic-bookmark.png"
                      alt="아이콘"
                      width={20}
                      height={20}
                    />
                    수업관리
                    <Image
                      src="/ic-arrow.png"
                      alt="화살표"
                      className={styles.arrow}
                      width={20}
                      height={20}
                    />
                  </span>

                  <ul className={`${styles.sideDepth2} ${styles.green}`}>
                    <li>
                      <a href="/classroom/myclass">내 수업</a>
                    </li>
                    <li>
                      <a href="/classroom/">수업콘텐츠관리</a>
                    </li>
                  </ul>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Learningside;
