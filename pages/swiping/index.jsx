import Image from "next/image";
import React, { useState, useRef, useMemo } from "react";
import * as S from "./style";
import Card from "@/components/swiper/Card";

const db = [
  {
    title: "Richard Hendricks",
    img: "/0.jpeg",
    longtitude: 37.1234,
    langtitude: 127.5678,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    keyword: ["vibe", "ocean", "party"],
    placeId: "placeId1",
  },
  {
    title: "Erlich Bachman",
    img: "/1.jpeg",
    longtitude: 37.4321,
    langtitude: 127.8765,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    keyword: ["cafe", "nature", "adventure"],
    placeId: "placeId2",
  },
  {
    title: "Monica Hall",
    img: "/2.jpeg",
    longtitude: 37.5678,
    langtitude: 127.1234,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    keyword: ["beach", "relaxation", "food"],
    placeId: "placeId3",
  },
  {
    title: "Jared Dunn",
    img: "/3.jpeg",
    longtitude: 37.8765,
    langtitude: 127.4321,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    keyword: ["culture", "history", "sightseeing"],
    placeId: "placeId4",
  },
];

function Swiping() {
  const [placeId, setPlaceId] = useState([]);
  const [lastDirection, setLastDirection] = useState();
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const currentIndexRef = useRef(currentIndex);

  console.log(placeId);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, placeId, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    if (direction === "right") {
      setPlaceId((prev) => [...prev, placeId]);
    }
  };

  const swipe = async (dir, placeId) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  const outOfFrame = (placeId, idx) => {
    console.log(
      `${placeId} (${idx}) left the screen!`,
      currentIndexRef.current
    );
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

  return (
    <S.SwipingWrap>
      {/* // ! Header */}
      <S.SwipingNavContainer>
        {currentIndex !== db.length - 1 ? (
          <S.SwipingNavButton
            width="28px"
            height="28px"
            onClick={() => goBack()}
          >
            <Image src="/svg/undo.svg" alt="undo" width={28} height={28} />
          </S.SwipingNavButton>
        ) : (
          <div />
        )}

        <S.SwipingNavButton width="auto" height="28px">
          완료하기
        </S.SwipingNavButton>
      </S.SwipingNavContainer>

      {/* // ! Swipe Card Deck */}
      <S.SwipingCardContainer>
        {db.map((character, index) => (
          <Card
            key={character.title}
            ref={childRefs[index]}
            character={character}
            swiped={swiped}
            outOfFrame={outOfFrame}
            index={index}
          />
        ))}
        <S.SwipingActionButtonContainer>
          <S.SwipingActionButton
            type="button"
            onClick={() => swipe("left", db[currentIndex].placeId)}
          >
            <Image
              src="/svg/dislike.svg"
              alt="dislike"
              width={20}
              height={20}
            />
          </S.SwipingActionButton>

          <S.SwipingActionButton
            type="button"
            onClick={() => swipe("right", db[currentIndex].placeId)}
          >
            <Image src="/svg/like.svg" alt="like" width={30} height={30} />
          </S.SwipingActionButton>
        </S.SwipingActionButtonContainer>
      </S.SwipingCardContainer>
    </S.SwipingWrap>
  );
}

export default Swiping;
