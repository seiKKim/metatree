import React from "react";

import styles from "../../components/ui/style.module.css";

const Mainpage = () => {
  return (
    <div className={`${styles.contentWrap} ${styles.mainWrap}`}>
      <div className={styles.mainArea}>
        <div className={styles.noticeWrap}>
          <div>
            <img src="/ic-notice.png" alt="" />
            <p className={styles.noticeTit}>신학기 이벤트 '책가방을 잡아라'</p>
          </div>
          <span className={styles.noticeDate}>(08.20 ~08.31)</span>
        </div>
        <div className={styles.leftArea}>
          <div className={styles.leftUpper}>
            <div className={styles.upperLeft}>
              <div className={styles.profileWrap}>
                <div className={styles.greeting}>
                  <p className={styles.wrapTit}>환영합니다!!</p>
                  <img src="/koala.png" alt="코알라" />
                </div>
                <div className={styles.myInfo}>
                  <p>장정원님</p>
                  <a href="#">
                    <img src="/ic-setup.png" alt="설정" />
                  </a>
                </div>
                <div className={styles.badges}>
                  <a href="#">
                    <img src="/crown-badge.png" alt="왕관배지" />
                  </a>
                  <a href="#">
                    <img src="ant-badge.png" alt="개미배지" />
                  </a>
                  <a href="">
                    <img src="tree-badge.png" alt="나무배지" />
                  </a>
                </div>
                <div className={styles.progBar}>
                  <div>
                    <label for="progCont">콘텐츠 용량</label>
                    <progress id={styles.progCont} max="100" value="30">
                      30%
                    </progress>
                  </div>
                  <div>
                    <label for="progCredit">AI 크레딧</label>
                    <progress id={styles.progCredit} max="100" value="90">
                      90%
                    </progress>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.upperRight}>
              <div className={styles.missionWrap}>
                <p className={styles.wrapTit}>6월 3주 미션</p>
                <ul>
                  <li>
                    <img
                      src="/ic-unchecked.png"
                      alt=""
                      className={styles.checkboxImg}
                    />
                    <input type="checkbox" />
                    <p>명작동화 '잭과 콩나무' 읽기</p>
                    <button className={styles.shortcutBtn}>
                      <a href="#">
                        이동하기 <img src="/ic-rightarrow.png" alt="" />
                      </a>
                    </button>
                  </li>
                  <li>
                    <img
                      src="/ic-unchecked.png"
                      alt=""
                      className={styles.checkboxImg}
                    />
                    <input type="checkbox" />
                    <p>'잭과 콩나무'를 읽고 독후감 작성하기</p>
                    <button className={styles.shortcutBtn}>
                      <a href="#">
                        이동하기 <img src="/ic-rightarrow.png" alt="" />
                      </a>
                    </button>
                  </li>
                  <li>
                    <img
                      src="/ic-checked.png"
                      alt=""
                      className={styles.checkboxImg}
                    />
                    <input type="checkbox" checked />
                    <p>'잭과 콩나무'의 독후감을 친구에게 공유하기</p>
                    <button className={styles.shortcutBtn}>
                      <a href="#">
                        이동하기 <img src="/ic-rightarrow.png" alt="" />
                      </a>
                    </button>
                  </li>
                  <li>
                    <img
                      src="/ic-checked.png"
                      alt=""
                      className={styles.checkboxImg}
                    />
                    <input type="checkbox" checked />
                    <p>내가 그린 그림을 메타버스에 전시하기</p>
                    <button className={styles.shortcutBtn}>
                      <a href="#">
                        이동하기 <img src="/ic-rightarrow.png" alt="" />
                      </a>
                    </button>
                  </li>
                  <li>
                    <img
                      src="/ic-unchecked.png"
                      alt=""
                      className={styles.checkboxImg}
                    />
                    <input type="checkbox" />
                    <p>친구의 그림에 좋아요 누르기</p>
                    <button className={styles.shortcutBtn}>
                      <a href="#">
                        이동하기 <img src="/ic-rightarrow.png" alt="" />
                      </a>
                    </button>
                  </li>
                  <li>
                    <img
                      src="/ic-unchecked.png"
                      alt=""
                      className={styles.checkboxImg}
                    />
                    <input type="checkbox" />
                    <p>새로운 이야기 만들어보기</p>
                    <button className={styles.shortcutBtn}>
                      <a href="#">
                        이동하기 <img src="/ic-rightarrow.png" alt="" />
                      </a>
                    </button>
                  </li>
                  <li>
                    <img
                      src="/ic-unchecked.png"
                      alt=""
                      className={styles.checkboxImg}
                    />
                    <input type="checkbox" />
                    <p>내가 그린 그림을 메타버스에 전시하기</p>
                    <button className={styles.shortcutBtn}>
                      <a href="#">
                        이동하기 <img src="/ic-rightarrow.png" alt="" />
                      </a>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.leftLower}>
            <div className={styles.portfolioWrap}>
              <p className={styles.wrapTit}>나의 포트폴리오</p>
              <ul className={styles.mypfList}>
                <li className={styles.mypfBox}>
                  <p>도시</p>
                  <div className={styles.pfImgBox}>
                    <img src="/map-thumb2.png" alt="맵 썸네일" />
                  </div>
                  <div className={styles.madeBy}>
                    <img src="/ic-world-blue.png" alt="" />
                    <p>
                      VRWARE Edu School <br />
                      <span>2024. 06. 01</span>
                    </p>
                  </div>
                </li>
                <li className={styles.mypfBox}>
                  <p>도시</p>
                  <div className={styles.pfImgBox}>
                    <img src="/map-thumb2.png" alt="맵 썸네일" />
                  </div>
                  <div className={styles.madeBy}>
                    <img src="/ic-world-blue.png" alt="" />
                    <p>
                      VRWARE Edu School <br />
                      <span>2024. 06. 01</span>
                    </p>
                  </div>
                </li>
                <li className={styles.mypfBox}>
                  <p>도시</p>
                  <div className={styles.pfImgBox}>
                    <img src="/map-thumb2.png" alt="맵 썸네일" />
                  </div>
                  <div className={styles.madeBy}>
                    <img src="/ic-world-blue.png" alt="" />
                    <p>
                      VRWARE Edu School <br />
                      <span>2024. 06. 01</span>
                    </p>
                  </div>
                </li>
              </ul>
              <a href="#" className={styles.moreBtn}>
                더보기
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.8753 9.59949C22.324 10.3096 22.324 12.3746 20.8753 13.0847L3.65253 21.5268C2.3631 22.1588 0.85765 21.2201 0.85765 19.7841L0.857651 2.90009C0.857651 1.46409 2.36311 0.525429 3.65253 1.15746L20.8753 9.59949Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className={styles.rightArea}>
          <div className={styles.plantWrap}>
            <div className={styles.plantUpperBox}>
              <div className={styles.plantInfo}>
                <span className={styles.plantLv}>Lv 1</span>
                <p className={styles.plantName}>쑥쑥이</p>
                <img
                  src="/ic-edit.png"
                  alt="수정 아이콘"
                  className={styles.nameEdit}
                />
              </div>
              <div className={styles.progBar}>
                <div className={styles.progressBar}>
                  <span></span>
                </div>
              </div>
            </div>
            <div className={styles.plantPot}>
              <img src="" alt="화분" />
            </div>
            <div className={styles.btnWrap}>
              <button className={styles.pushBtn}>
                <img src="/ic-water.png" alt="물주기" />
                <p>물주기</p>
              </button>
              <button className={styles.pushBtn}>
                <img src="/ic-phraise.png" alt="칭찬하기" />
                <p>칭찬하기</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
