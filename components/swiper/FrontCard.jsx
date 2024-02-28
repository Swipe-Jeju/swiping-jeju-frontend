import React from "react";
import styled from "styled-components";
import { a } from "@react-spring/web";
import Image from "next/image";

const SwipingFrontSideCard = styled(a.div)`
  position: absolute;
  border-radius: 15px;
  background-image: url(${(props) => props.place.img});
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
  font-size: 30px;
  font-weight: 700;
`;

const SwipingCardKeywordContainer = styled.div``;

const SwipingCardKeyword = styled.p`
  display: inline;
  margin: 0 10px;
  border-radius: 20px;
  padding: 5px 10px;
  background-color: white;
`;

const SwipingCardContentContainer = styled.div`
  position: absolute;
  bottom: 30%;
  left: 10%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SwipingCardTitleContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

const FrontCard = ({ place, opacity, transform }) => {
  return (
    <SwipingFrontSideCard
      place={place}
      style={{
        opacity: opacity.to((o) => 1 - o),
        transform,
      }}
    >
      <SwipingCardGradient />
      <SwipingCardContentContainer>
        <SwipingCardTitleContainer>
          <Image
            src="/svg/locationIcon.svg"
            alt="location"
            width={30}
            height={30}
          />
          <SwipingCardTitle>{place.title}</SwipingCardTitle>
        </SwipingCardTitleContainer>
        <SwipingCardKeywordContainer>
          {place.keyword.map((keyword, index) => (
            <SwipingCardKeyword key={index}>{keyword}</SwipingCardKeyword>
          ))}
        </SwipingCardKeywordContainer>
      </SwipingCardContentContainer>
    </SwipingFrontSideCard>
  );
};

export default FrontCard;
