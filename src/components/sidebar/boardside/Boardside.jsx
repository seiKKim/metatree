// components/SideBar.js
"use client";
import Image from "next/image";
import styles from "../../ui/side.module.css";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from 'next/link'; // Link 컴포넌트 import

const Boardside = () => {
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
        <p className={styles.title}>게시판</p>
        <div className={styles.sideNav}>
  <ul className={styles.navList}>
    <li>
      <Link href="/board/notice">
        <p>
          <span>
            <Image src="/ic-mymap.png" alt="아이콘" width={20} height={20} />
            공지사항
          </span>
        </p>
      </Link>
    </li>
    <li>
      <Link href="/board/faq">
        <p>
          <span>
            <Image src="/ic-object2.png" alt="아이콘" width={20} height={20} />
            FAQ 게시판
          </span>
        </p>
      </Link>
    </li>
    <li>
      <Link href="/board/qna">
        <p>
          <span>
            <Image src="/ic-class2.png" alt="아이콘" width={20} height={20} />
            Q&A 게시판
          </span>
        </p>
      </Link>
    </li>
    <li>
      <Link href="/board/menual">
        <p>
          <span>
            <Image src="/ic-bookmark.png" alt="아이콘" width={20} height={20} />
            메뉴얼
          </span>
        </p>
      </Link>
    </li>
  </ul>
</div>
      </div>
    </div>
  );
};

export default Boardside;
