import React, { useState, forwardRef } from "react";
import { useSpring, a } from "@react-spring/web";
import BackCard from "./BackCard";
import FrontCard from "./FrontCard";
import * as S from "@/components/_styled/swipingStyled";

const Card = forwardRef(({ place, swiped, outOfFrame, index }, ref) => {
  const [flipped, setFlipped] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <S.SwipingCardDeck
      onSwipe={(dir) => {
        swiped(dir, place.placeId, index);
        setFlipped(false);
      }}
      onCardLeftScreen={() => {
        setFlipped(false);
        outOfFrame(place.placeId, index);
      }}
      ref={ref}
    >
      <S.SwipingCard
        onClick={() => setFlipped((prev) => !prev)}
        onTouchEnd={() => setFlipped((prev) => !prev)}
      >
        <BackCard place={place} opacity={opacity} transform={transform} />
        <FrontCard place={place} opacity={opacity} transform={transform} />
      </S.SwipingCard>
    </S.SwipingCardDeck>
  );
});

Card.displayName = "Card";

export default Card;
