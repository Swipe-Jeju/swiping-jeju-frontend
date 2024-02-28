import Image from "next/image";
import React, { useState, useRef, useMemo, useEffect } from "react";
import * as S from "@/components/_styled/swipingStyled";
import Card from "@/components/swiper/Card";
import CustomModal from "@/components/modal/CustomModal";
import { useRouter } from "next/router";

const db = [
  {
    title: "성산어물정",
    img: "/0.jpeg",
    lng: 126.917306236842,
    lat: 33.4395648227551,
    content: `성산일출봉과 섭지코지 사이에 위치한 저희 제주 어물전은 제주도 특산물인 고등어회,딱새우회, 제주 갈치회 전문점으로 싱싱한 활어회와 함께 푸짐한 한상을 준비하였습니다. 주차 편의시설 또한 넓어서 불편함 없이 이용가능하십니다.`,
    keyword: ["성산일출봉", "전통시장", "해변"],
    placeId: "1",
  },
  {
    title: "어조횟집",
    img: "/1.jpeg",
    lng: 126.930809833027,
    lat: 33.4604386103906,
    content: `제주도 맛집 리스트 고민중이셨나요??
    제주 동쪽 가볼만한 곳 검색 후
    성산일출봉을 일정에 추가하셨다면
    꼭 방문해야할 성신맛집입니다!`,
    keyword: ["먹거리", "전통시장", "감귤체험"],
    placeId: "2",
  },
  {
    title: "호랑호랑카페",
    img: "/2.jpeg",
    lng: 126.921633330756,
    lat: 33.4495800115369,
    content: `제주도 핫플레이스 루프탑카페 ! 성산일출봉 오션뷰 카페 호랑호랑 입니다.
    전용비치를 보유하고있어 낮에는 포근한 햇살과, 밤에는 은은한 조명의 야경이 아름다운곳 입니다`,
    keyword: ["카페", "테마파크", "포토스팟"],
    placeId: "3",
  },
  {
    title: "삼다도식당",
    img: "/3.jpeg",
    lng: 126.915845324691,
    lat: 33.4484446960871,
    content: `성산일출봉근처에 위치한 갈치,고등어요리 전문점입니다!
    내 가족들이 먹는다고 생각하고 항상 깨끗하게 재료 손질하여 안심하고 드실 수 있습니다.
    지역주민들이 더 추천하는 로컬맛집!! 밑반찬최고!! 갈치조림맛집을 찾는다면 '삼다도식당'으로 오세요.`,
    keyword: ["먹거리", "전통시장", "한라산"],
    placeId: "4",
  },
];

function Swiping() {
  const [placeId, setPlaceId] = useState([]);
  const [lastDirection, setLastDirection] = useState();
  const [currentIndex, setCurrentIndex] = useState(db?.length - 1);
  const currentIndexRef = useRef(currentIndex);
  const route = useRouter();

  const [isComplete, setIsComplete] = useState(false);
  const [isRunout, setIsRunout] = useState(false);
  const [isFirst, setIsFirst] = useState(false);
  const canGoBack = currentIndex < db?.length - 1;
  const canSwipe = currentIndex >= 0;

  const childRefs = useMemo(
    () =>
      Array(db?.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  // set last direction and decrease current index
  const swiped = async (direction, placeId, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    if (direction === "right") {
      setPlaceId((prev) => [...prev, placeId]);
    }
    if (
      currentIndex === db?.length - 1 &&
      localStorage.getItem("isFirst") === "true"
    ) {
      setIsFirst(true);
      localStorage.setItem("isFirst", false);
    }
  };

  useEffect(() => {
    if (!canSwipe) {
      setIsRunout(true);
    }
  }, [currentIndex]);

  const swipe = async (dir, placeId) => {
    if (canSwipe && currentIndex < db?.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  const outOfFrame = (placeId, idx) => {
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
    setPlaceId((prev) => prev.slice(0, -1));
  };

  const handleMakeList = async () => {
    setIsComplete(false);
    setIsRunout(false);

    setTimeout(() => {
      console.log("placeId", placeId);
    }, 2000);
  };

  const openInGoogleMaps = (name, lat, lng) => {
    const url = `https://map.kakao.com/link/to/${name},${lat},${lng}`;
    window.open(url, "_blank");
  };

  return (
    <S.SwipingWrap>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <S.SwipingNavButton
          width="140px"
          height="40px"
          onClick={() => route.push("/")}
        >
          <Image
            src="/images/nav_logo.png"
            width={140}
            height={40}
            alt="nav_logo"
          />
        </S.SwipingNavButton>
        {canGoBack ? (
          <S.SwipingActionButton
            type="button"
            onClick={async () => await goBack()}
            width="50px"
            height="50px"
            backgroundColor="black"
          >
            <Image
              src="/svg/undo_white.svg"
              alt="like"
              width={25}
              height={25}
            />
          </S.SwipingActionButton>
        ) : (
          <div />
        )}
      </div>

      {/* // ! Swipe Card Deck */}
      <S.SwipingCardContainer>
        {canSwipe ? (
          db.map((place, index) => (
            <Card
              key={place.title}
              ref={childRefs[index]}
              place={place}
              swiped={swiped}
              outOfFrame={outOfFrame}
              index={index}
            />
          ))
        ) : (
          <S.SwipingRunoutContainer>
            <p
              style={{
                fontSize: "20px",
                color: "white",
                textAlign: "center",
              }}
            >
              선택이 모두 완료되었습니다.
            </p>
          </S.SwipingRunoutContainer>
        )}

        <S.SwipingActionButtonContainer>
          <S.SwipingActionButton
            type="button"
            onClick={() =>
              openInGoogleMaps(
                db[currentIndex].title,
                db[currentIndex].lat,
                db[currentIndex].lng
              )
            }
            width="50px"
            height="50px"
          >
            <Image
              src="/svg/fork_right.svg"
              alt="like"
              width={25}
              height={25}
            />
          </S.SwipingActionButton>
          <S.SwipingActionButton
            type="button"
            onClick={() => swipe("left", db[currentIndex].placeId)}
            disabled={!canGoBack}
          >
            <Image
              src="/svg/dislike.svg"
              alt="dislike"
              width={25}
              height={25}
            />
          </S.SwipingActionButton>

          <S.SwipingActionButton
            type="button"
            onClick={() => swipe("right", db[currentIndex].placeId)}
            disabled={!canSwipe}
          >
            <Image src="/svg/like.svg" alt="like" width={40} height={40} />
          </S.SwipingActionButton>
          <div
            style={{
              width: "50px",
              height: "50px",
              position: "relative",
            }}
          >
            <S.SwipingActionButton
              type="button"
              onClick={() => setIsComplete(true)}
              width="50px"
              height="50px"
              disabled={placeId?.length === 0}
            >
              <Image
                src="/svg/swipe_complete.svg"
                alt="like"
                width={25}
                height={25}
              />
              <p
                style={{
                  width: "24px",
                  height: "24px",
                  textAlign: "center",
                  position: "absolute",
                  top: "-10px",
                  right: "-10px",
                  borderRadius: "50%",
                  padding: "4px",
                  color: "white",
                  backgroundColor: "red",
                }}
              >
                {placeId?.length}
              </p>
            </S.SwipingActionButton>
          </div>
        </S.SwipingActionButtonContainer>
      </S.SwipingCardContainer>
      {isComplete && (
        <CustomModal
          onConfirm={handleMakeList}
          onClose={() => setIsComplete(false)}
          bodyText={`진행 중인 스와이핑을 종료하고,\nAI 결과 리스트를 만드시겠습니까?`}
          cancelText={"취소"}
          confirmText={"만들기"}
          isAlert={false}
        />
      )}
      {isRunout && (
        <CustomModal
          onConfirm={handleMakeList}
          bodyText={`선택이 모두 완료되었습니다. AI 결과 리스트를 생성합니다.`}
          confirmText={"만들기"}
          isAlert={true}
        />
      )}
      {isFirst && (
        <CustomModal
          onConfirm={async () => {
            await goBack();
            setIsFirst(false);
          }}
          onClose={async () => {
            setIsFirst(false);
          }}
          bodyText={
            lastDirection === "right"
              ? `사진을 오른쪽으로 미는 것은 이 장소에 관심이 있다는 뜻입니다.`
              : `이 장소에 관심이 없나요? 사진을 왼쪽으로 미는 것은 이 장소에 관심이 없다는 뜻입니다.`
          }
          cancelText={
            lastDirection === "right" ? "알고있어요 !" : "알고있어요 !"
          }
          confirmText={lastDirection === "right" ? "몰랐어요 !" : "몰랐어요 !"}
        />
      )}
    </S.SwipingWrap>
  );
}

export default Swiping;
