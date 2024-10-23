'use client'

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Inter } from "next/font/google";
import { SessionProvider } from 'next-auth/react';
import "./globals.css";
import { Noto_Sans_KR } from "next/font/google";
import Navbar from "../components/navbar/Navbar";
import Footer from '../components/footer/Footer';
import StuSidebar from '../components/sidebar/stuside/Stuside';
import ContentSidebar from '../components/sidebar/contentside/Contentside';
import LearningSidebar from '../components/sidebar/learningside/Learningside';
import StoreSidebar from '../components/sidebar/storeside/Storeside';
import BoardSidebar from '../components/sidebar/boardside/Boardside';
import EventSidebar from '../components/sidebar/eventside/Eventside';

const inter = Inter({ subsets: ["latin"] });
const notoSansKR = Noto_Sans_KR({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [currentMenu, setCurrentMenu] = useState('default');

  const handleMenuClick = (menuName) => {
    setCurrentMenu(menuName);
  };

  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith('/contents')) {
      setCurrentMenu('contents');
    } else if (pathname.startsWith('/learning')) {
      setCurrentMenu('learning');
    } else if (pathname.startsWith('/store')) {
      setCurrentMenu('store');
    } else if (pathname.startsWith('/board')) {
      setCurrentMenu('board');
    } else if (pathname.startsWith('/event')) {
      setCurrentMenu('event');
    } else {
      setCurrentMenu('default');
    }
  }, [pathname]);

  const renderSidebar = () => {
    switch(currentMenu) {
      case 'contents':
        return <ContentSidebar />;
      case 'learning':
        return <LearningSidebar />;
      case 'store':
        return <StoreSidebar />;
      case 'board':
        return <BoardSidebar />;
      case 'event':
        return <EventSidebar />;
      default:
        return <StuSidebar />;
    }
  };
return (
  <SessionProvider>
    <html lang="en">
      <body className={`${inter.className} ${notoSansKR.className}`}>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar onMenuClick={handleMenuClick} />
          <div style={{ display: 'flex', flex: 1 }}>
            {renderSidebar()}
            <main style={{ flex: 1, overflow: 'auto' }}>
              {children}
            </main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  </SessionProvider>
);
}
