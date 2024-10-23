// components/SideBar.js
"use client";
import Image from 'next/image';
import styles from '../../ui/side.module.css';
import { usePathname } from 'next/navigation';
import { useSession } from "next-auth/react";
import Link from 'next/link'; // Link 컴포넌트 import

const Eventside = () => {

  const { data: session, status } = useSession();
  
  const pathname = usePathname();
  // 로그인 페이지에서는 Navbar를 렌더링하지 않음
  if (pathname === '/' || pathname === '/auth/register' || pathname === '/auth/usertype' 
    || pathname === '/auth/sigup/student' || pathname === '/auth/sigup/teacher' || pathname === '/auth/emailauth'  
    || pathname === '/auth/findid' || pathname === '/auth/findpw'
    ) {
      return null;
    }

  return (
    <div className={styles.sideBox}>
      <div className={styles.userInfo}>
      <p className={styles.title}>이벤트</p>
        <div className={styles.sideNav}>
          <ul className={styles.navList}>

            <li>
      <Link href="/events">
        <p>
          <span>
          <Image src="/ic-mymap.png" alt="아이콘" width={20} height={20} />
          접속 이벤트
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

export default Eventside;
