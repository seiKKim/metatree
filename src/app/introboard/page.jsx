import React from 'react'
import styles from "../../components/ui/style.module.css";

const page = () => {
  return (
    <div className={`${styles.contentWrap} ${styles.introArea}`}>
      <div className={styles.introWrap}>
      <div className={styles.metatreeEvnt}>이벤트배너</div>
      <div className={styles.introLanding}>
        <div className={styles.landingTxt}>
          <span>
            <img src="/user-img.png" alt="캐릭터" /> METATREE</span>
          <h1>
            STEAM 교육 기반의 구독형 서비스,<br/>
            METATREE
          </h1>
          <p>
            맞춤형 커리큘럼과 함께<br/>
            자라나는 사고력, 창의력!
          </p>
          <button className={`${styles.introBtn} ${styles.landingBtn}`}><a href="#">
            METATREE 시작하기
          </a></button>
        </div>
        <div className={styles.landingVid}>
          <img src="/landing.png" alt="랜딩페이지 이미지샘플" />
        </div>
      </div>
      <div className={styles.introContent}>
        <div className={styles.introAdver}>
          <p className={styles.mainTit}>
            우리 아이 창의력,<br/>
            어떻게 키울 수 있을까?
          </p>
          <div className={styles.adverBox}>
            <div className={styles.advertise1}>
              <div className={styles.adverTxt}>
                <p className={styles.innerAdTit}>
                  경험의 차이가<br/>
                  사고방식의 차이를<br/>
                  만듭니다
                </p>
                <p>
                  다양한 콘텐츠를 제공하여<br/>
                  사고의 폭을 넓힙니다.
                </p>
              </div>
              <div className={styles.adverImg}>
                <img src="/adver-books.png" alt="책" />
              </div>
            </div>
            <div className={styles.innerAdverBox}>
              <div className={styles.advertise2}>
                <div className={styles.adverTxt}>
                  <p className={styles.innerAdTit}>
                    체계적인 코스로<br/>
                    쑥쑥 자라나게
                  </p>
                  <p>
                    5세부터 13세까지<br/>
                    매주 새로운 커리큘럼을 제공합니다.
                  </p>
                </div>
                <div className={styles.adverImg}>
                  <img src="/adver-check.png" alt="체크리스트" />
                </div>
              </div>
              <div className={styles.advertise3}>
              <div className={styles.adverTxt}>
                  <p className={styles.innerAdTit}>
                    자라나는 사고력,<br/>
                    한눈에 보이게
                  </p>
                  <p>
                    학습을 완료하면<br/>
                    나무가 쑥쑥 자라납니다.
                  </p>
                </div>
                <div className={styles.adverImg}>
                  <img src="/adver-pot.png" alt="화분" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.introQnA}>
          <p className={styles.mainTit}>
            이런 부분이 궁금해요!
          </p>
          <ul className={styles.qnaList}>
            <li className={styles.questions}>
              <a href="#">
                <p>구독형 서비스를 이용했을 때의 장점은 무엇인가요?</p>
                <img src="/ic-arrow.png" alt="자세히" />
              </a>
              <ul className={styles.answers}>
                <li>
                  구독형 서비스를 이용했을 때의 장점은 ~ 입니다.
                </li>
              </ul>
            </li>
            <li className={styles.questions}>
            <a href="#">
                <p>포트폴리오는 어떻게 만들어지며, 어떻게 활용할 수 있나요?</p>
                <img src="/ic-arrow.png" alt="자세히" />
              </a>
              <ul className={styles.answers}>
                <li>
                  포트폴리오는 ~ 만들어지고, ~ 활용할 수 있습니다.
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className={styles.introBanner}>
          <div className="bannerBox">
            <img src="/intro-banner.png" alt="배너" />
          </div>
          <div className={styles.bannerTxt}>
            <p className={styles.mainTit}>
              METATREE, <br/>
              지금 바로 시작해 보세요!
            </p>
            <button className={`${styles.introBtn} ${styles.bannerBtn}`}><a href="#">
            METATREE 시작하기
          </a></button>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default page