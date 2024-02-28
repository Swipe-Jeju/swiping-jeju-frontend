import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { a } from "@react-spring/web";
import KakaoMap from "./kakaoMap";

const SwipingBackSideCard = styled(a.div)`
  position: absolute;
  border-radius: 15px;
  background-color: lightgray;
  background-size: cover;
  width: 100%;
  max-width: 100%;
  height: calc(100vh - 116px);

  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 20px;
  align-items: center;

  padding: 80px 20px 20px 20px;
`;

const StyledButton = styled.button`
  border: none;
  background: none;
  padding: 0;
  white-space: nowrap;
`;

const StyledParagraph = styled.p`
  font-size: 24px;
  font-weight: bold;
  line-height: 28px;
  color: #000000;
  margin-bottom: 10px;
`;

const StyledKeyword = styled.p`
  font-size: 16px;
  line-height: 19px;
  background-color: #000000;
  color: #ffffff;
  margin-bottom: 5px;
  padding: 5px 10px;
  border-radius: 20px;
`;

const StyledContent = styled.p`
  border: 1px solid #000000;
  font-size: 16px;
  height: auto;
  max-height: 70px;
  color: #000000;
  background-color: #ffffff;
  line-height: 20px;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 4px 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const StyledKeywordContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  gap: 10px;
`;

const BackCard = ({ place, opacity, transform }) => {
  return (
    <SwipingBackSideCard
      place={place}
      style={{
        opacity,
        transform: transform.to((t) => `${t} rotateY(180deg)`),
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          display: "flex",
          width: "100%",
          padding: "0 20px",
          justifyContent: "flex-start",
          position: "absolute",
        }}
      >
        <StyledButton>
          <Image src="/svg/undo.svg" alt="close" width={30} height={30} />
        </StyledButton>
      </div>

      <div
        style={{
          width: "100%",
          height: "100px",
        }}
      >
        <KakaoMap place={place} />
      </div>

      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image
            src="/svg/locationIcon.svg"
            alt="location"
            width={30}
            height={30}
          />
          <StyledParagraph>{place.title}</StyledParagraph>
        </div>

        <StyledKeywordContainer>
          {place.keyword.map((keyword, index) => (
            <StyledKeyword key={index}>{keyword}</StyledKeyword>
          ))}
        </StyledKeywordContainer>
        <StyledContent>{place.content}</StyledContent>
      </div>
    </SwipingBackSideCard>
  );
};

export default BackCard;
