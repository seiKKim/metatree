// components/Footer.js
import Image from 'next/image';
import styles from '../ui/style.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h1 className={styles.footLogo}>
        ㈜글로브포인트
      </h1>
      <p className={styles.address}>
        경기도 고양시 덕양구 삼원로 83, 광양프런티어밸리 6차 111호 (10550)
      </p>
      <ul className={styles.infoList}>
        <li>
          <Image src="/ic-tell.png" alt="전화" width={20} height={20} />
          031-911-0601
        </li>
        <li>
          <Image src="/ic-fax.png" alt="팩스" width={20} height={20} />
          031-922-0602
        </li>
        <li>
          <Image src="/ic-mail.png" alt="메일" width={20} height={20} />
          gpsales@globepoint.co.kr
        </li>
      </ul>
      <p className={styles.copy}>
        Copyrights ⓒ 2019 Globepoint Inc. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
