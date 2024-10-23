"use client";

import React, { useState, useEffect } from 'react';
import styles from "../../ui/style.module.css"; // CSS 모듈 임포트

const SchoolSearchPopup = ({ isOpen, onClose, onSelectSchool }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm) return; // 검색어가 없을 경우 검색하지 않음
    setLoading(true);
    setNoResults(false);
    setSchools([]); // 검색 시작 시 결과 초기화

    try {
      const response = await fetch(`/api/schools?name=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) {
        throw new Error('학교 검색에 실패했습니다.');
      }
      const data = await response.json();
      setSchools(data);

      if (data.length === 0) {
        setNoResults(true); // 결과가 없을 경우 상태 업데이트
      }
    } catch (error) {
      console.error('Error during search:', error);
    } finally {
      setLoading(false);
      setSearchTerm(''); // 검색 완료 후 검색어 초기화
    }
  };

  const handleSelectSchool = (school) => {
    onSelectSchool(school);
    handleClose(); // 학교 선택 후 팝업 닫기
  };

  const handleClose = () => {
    setSchools([]);  // 팝업 닫기 전 결과 초기화
    onClose();
  };

  // ESC 키로 팝업 닫기
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.findschoolpopup}>
        <h2 className={styles.title}>학교 검색</h2>
        <input 
          className={styles.searchInput}
          type="text" 
          placeholder="학교 이름을 입력하세요." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <button 
          onClick={handleSearch}
          className={styles.searchBtn}
        >{loading ? '검색 중...' : '검색'}</button>
        <ul className={styles.list}>
          {schools.map((school) => (
            <li
              key={school.school_id}
              className={styles.listItem}
              onClick={() => handleSelectSchool(school)}
            >
              {school.school_name} - {school.address} {/* 학교명과 주소를 함께 표시 */}
            </li>
          ))}
        </ul>
        {noResults && <p className={styles.noResults}>검색 결과가 없습니다.</p>}
        <button className={styles.searchBtn} onClick={handleClose}>닫기</button>
      </div>
    </div>
  );
};

export default SchoolSearchPopup;
