// src/app/point/PointHistory.js
"use client"
import React, { useState } from 'react';
import styles from "../../../components/ui/style.module.css"; // CSS 모듈 임포트

const PointHistory = () => {
  const itemsPerPage = 5; // 페이지당 항목 수
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState('사용'); // 구분 상태
  const [dateRange, setDateRange] = useState({ start: '', end: '' }); // 날짜 범위 상태

  const historyItems = [
    { id: 1, type: '사용', date: '2024.07.17', content: '맵 구매', points: -64540, remainingPoints: 0 },
    { id: 2, type: '사용', date: '2024.07.17', content: '맵 구매', points: -64540, remainingPoints: 0 },
    { id: 3, type: '사용', date: '2024.07.17', content: '맵 구매', points: -64540, remainingPoints: 0 },
    { id: 4, type: '사용', date: '2024.07.17', content: '맵 구매', points: -64540, remainingPoints: 0 },
    { id: 5, type: '사용', date: '2024.07.17', content: '맵 구매', points: -64540, remainingPoints: 0 },
    { id: 6, type: '사용', date: '2024.07.17', content: '맵 구매', points: -64540, remainingPoints: 0 },
    { id: 7, type: '사용', date: '2024.07.17', content: '맵 구매', points: -64540, remainingPoints: 0 },
    { id: 8, type: '사용', date: '2024.07.17', content: '맵 구매', points: -64540, remainingPoints: 0 },
    { id: 9, type: '사용', date: '2024.07.17', content: '맵 구매', points: -64540, remainingPoints: 0 },
    { id: 10, type: '사용', date: '2024.07.17', content: '맵 구매', points: -64540, remainingPoints: 0 },
  ];

  const totalPages = Math.ceil(historyItems.length / itemsPerPage); // 총 페이지 수
  const indexOfLastItem = currentPage * itemsPerPage; // 현재 페이지의 마지막 항목 인덱스
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // 현재 페이지의 첫 번째 항목 인덱스
  const currentItems = historyItems.slice(indexOfFirstItem, indexOfLastItem); // 현재 페이지의 항목

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div className={styles.contentWrap}>
      <div className={`${styles.contentArea} ${styles.pointArea}`}>
        <div className={`${styles.whiteBg} ${styles.boardWrap}`}>
          <p className={styles.pointTitle}>포인트 이용내역</p>
          <div className={styles.pointFilter}>
            <div className={styles.inputWrap}>
              <p className={styles.inputTit}>구분</p>
              <div className={styles.inputBox}>
                <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                  <option value="사용">사용</option>
                  <option value="획득">획득</option>
                </select>
              </div>
            </div>
            <div className={styles.inputWrap}>
              <p className={styles.inputTit}>조회기간</p>
              <div className={styles.inputBox}>
                <select>
                  <option value="전체">전체</option>
                  <option value="조회기간">조회기간</option>
                </select>
                <div className={styles.periodWrap}>
                  <div className={styles.periodInput}>
                    <input type="date" value={dateRange.start} onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })} />
                    <img src="/ic-preiod.png" alt="" />
                  </div>
                  <p>~</p>
                  <div className={styles.periodInput}>
                    <input type="date" value={dateRange.end} onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })} />
                    <img src="/ic-preiod.png" alt="" />
                  </div>
                </div>
                <button>검색</button>
              </div>
            </div>
          </div>
          <div className={styles.boardList}>
            <table>
              <thead>
                <tr>
                  <th className={styles.wid100}>번호</th>
                  <th className={styles.wid100}>구분</th>
                  <th className={styles.wid180}>날짜</th>
                  <th>내용</th>
                  <th className={styles.wid180}>포인트</th>
                  <th className={styles.wid180}>잔여포인트</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.type}</td>
                    <td>{item.date}</td>
                    <td>{item.content}</td>
                    <td>{item.points}</td>
                    <td>{item.remainingPoints}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.pagination}>
            <button className={styles.pageBtn} onClick={handlePrevPage} disabled={currentPage === 1}>
              <img src="/ic-prev.png" alt="" />
            </button>
            <button className={styles.pageBtn} onClick={handlePrevPage} disabled={currentPage === 1}>
              <img src="/ic-prev2.png" alt="" />
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button key={index} className={`${styles.numBtn} ${currentPage === index + 1 ? styles.on : ''}`} onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </button>
            ))}
            <button className={styles.pageBtn} onClick={handleNextPage} disabled={currentPage === totalPages}>
              <img src="/ic-next2.png" alt="" />
            </button>
            <button className={styles.pageBtn} onClick={handleNextPage} disabled={currentPage === totalPages}>
              <img src="/ic-next.png" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointHistory;
