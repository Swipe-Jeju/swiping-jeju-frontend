import Image from "next/image";
import React, { useState, useRef, useMemo, useEffect } from "react";
import * as S from "@/components/_styled/swipingStyled";
import Card from "@/components/swiper/Card";
import CustomModal from "@/components/modal/CustomModal";
import { useRouter } from "next/router";

const db = [
  {
    title: "Richard Hendricks",
    img: "/0.jpeg",
    lng: 126.9408234,
    lat: 33.45888279999969,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    keyword: ["vibe", "ocean", "party"],
    placeId: "placeId1",
  },
  {
    title: "Erlich Bachman",
    img: "/1.jpeg",
    lng: 126.9408234,
    lat: 33.45888279999969,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    keyword: ["cafe", "nature", "adventure"],
    placeId: "placeId2",
  },
  {
    title: "Monica Hall",
    img: "/2.jpeg",
    lng: 126.9408234,
    lat: 33.45888279999969,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    keyword: ["beach", "relaxation", "food"],
    placeId: "placeId3",
  },
  {
    title: "Jared Dunn",
    img: "/3.jpeg",
    lng: 126.9408234,
    lat: 33.45888279999969,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    keyword: ["culture", "history", "sightseeing"],
    placeId: "placeId4",
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

  return (
    <S.SwipingWrap>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "start",
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
            onClick={async () => await goBack()}
            width="50px"
            height="50px"
            disabled={!canGoBack}
          >
            <Image src="/svg/undo.svg" alt="dislike" width={25} height={25} />
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
          <S.SwipingActionButton
            type="button"
            onClick={() => setIsComplete(true)}
            width="50px"
            height="50px"
            disabled={placeId?.length === 0}
          >
            <Image src="/svg/pause.svg" alt="like" width={25} height={25} />
          </S.SwipingActionButton>
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
