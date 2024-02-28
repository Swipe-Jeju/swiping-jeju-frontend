import React, { useState, forwardRef } from "react";
import { useSpring, a } from "@react-spring/web";
import BackCard from "./BackCard";
import FrontCard from "./FrontCard";
import * as S from "../../pages/swiping/style";

const Card = forwardRef(({ character, swiped, outOfFrame, index }, ref) => {
  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <S.SwipingCardDeck
      onSwipe={(dir) => swiped(dir, character.placeId, index)}
      onCardLeftScreen={() => outOfFrame(character.placeId, index)}
      ref={ref}
    >
      <S.SwipingCard
        onClick={() => set((prev) => !prev)}
        onTouchEnd={() => set((prev) => !prev)}
      >
        <BackCard
          character={character}
          opacity={opacity}
          transform={transform}
        />
        <FrontCard
          character={character}
          opacity={opacity}
          transform={transform}
        />
      </S.SwipingCard>
    </S.SwipingCardDeck>
  );
});

export default Card;
