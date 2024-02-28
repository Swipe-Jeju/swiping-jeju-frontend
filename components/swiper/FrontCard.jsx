import React from "react";
import styled from "styled-components";
import { a } from "@react-spring/web";

const SwipingFrontSideCard = styled(a.div)`
  position: absolute;
  border-radius: 15px;
  background-color: red;
  background-image: url(${(props) => props.character.img});
  background-size: cover;
  width: 100%;
  max-width: 100%;
  height: calc(100vh - 116px);
  max-width: 100%;
`;

const SwipingCardGradient = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: start;
  border-radius: 0 0 15px 15px;
`;

const SwipingCardTitle = styled.p`
  color: white;
  font-size: 20px;
  font-weight: 700;
  margin: 0 10px;
`;

const SwipingCardKeywordContainer = styled.div``;

const SwipingCardKeyword = styled.p`
  display: inline;
  margin: 0 10px;
  border-radius: 2px;
  padding: 5px;
  background-color: white;
`;

const FrontCard = ({ character, opacity, transform }) => {
  return (
    <SwipingFrontSideCard
      character={character}
      style={{
        opacity: opacity.to((o) => 1 - o),
        transform,
      }}
    >
      <SwipingCardGradient>
        <SwipingCardTitle>{character.title}</SwipingCardTitle>
        <SwipingCardKeywordContainer>
          {character.keyword.map((keyword, index) => (
            <SwipingCardKeyword key={index}>{keyword}</SwipingCardKeyword>
          ))}
        </SwipingCardKeywordContainer>
      </SwipingCardGradient>
    </SwipingFrontSideCard>
  );
};

export default FrontCard;
