"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react"; // signOut 임포트
import styles from "../ui/style.module.css";

const Navbar = ({ onMenuClick }) => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 현재 열려 있는 드롭다운의 인덱스
  const pathname = usePathname();

  // 로그인 페이지에서는 Navbar를 렌더링하지 않음
  if (
    pathname === "/" ||
    pathname === "/auth/register" ||
    pathname === "/auth/usertype" ||
    pathname === "/auth/sigup/student" ||
    pathname === "/auth/sigup/teacher" ||
    pathname === "/auth/sigup/kinder" ||
    pathname === "/auth/emailauth" ||
    pathname === "/auth/findid" ||
    pathname === "/auth/findpw"
  ) {
    return null;
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (index) => {
    setActiveDropdown((prevState) => (prevState === index ? null : index));
  };

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" }); // 로그아웃 후 홈페이지로 리디렉션
  };

  const handleMenuClick = (menuName) => {
    toggleDropdown(menuName);
    onMenuClick(menuName);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
      <div className={styles.leftArea}>
        <h1 className={styles.navLogo}>
          <Link
            href="/dashboard"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/dashboard";
            }}
          >
            <Image
              src="/metatree-logo.png"
              alt="메타트리"
              width={200}
              height={100}
            />
          </Link>
        </h1>

        <div className={styles.navArea}>
          <ul className={styles.mainNav}>
            <li>
              <Link
                href="/contents"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown(0);
                  handleMenuClick("contents");
                }}
              >
                내 작품
              </Link>
            </li>
            {/* 추가 메뉴 항목 */}
            <li>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown(2);
                  handleMenuClick("store");
                }}
              >
                스토어
              </Link>
            </li>
            {/* 추가 메뉴 항목 */}
            <li>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown(3);
                  handleMenuClick("board");
                }}
              >
                게시판
              </Link>
            </li>
            {/* 추가 메뉴 항목 */}
            <li>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown(4);
                  handleMenuClick("event");
                }}
              >
                이벤트
              </Link>
            </li>
            <li>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown(4);
                  handleMenuClick("event");
                }}
              >
                소개
              </Link>
            </li>
            <li>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown(4);
                  handleMenuClick("event");
                }}
              >
                요금
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.headEtc}>
        <div className={styles.userInfo}>
          <div className={styles.userImg}>
            <Image src="/ic-user.png" alt="프로필사진" width={40} height={40} />
          </div>
          <p>
            <span>{session?.user?.mem_username || ""}</span>님
          </p>
        </div>
        <ul className={styles.loginBtn}>
          <li>
            <Link href="/mypage/myinfo">마이페이지</Link>
          </li>
          <li>
            <Link href="#" onClick={handleLogout}>
              로그아웃
            </Link>
          </li>{" "}
          {/* 로그아웃 기능 추가 */}
        </ul>
      </div>
      </div>
    </header>
  );
};

export default Navbar;
