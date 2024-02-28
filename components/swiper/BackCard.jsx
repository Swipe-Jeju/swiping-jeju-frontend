import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { a } from "@react-spring/web";
import KakaoMap from "./kakaoMap";

const SwipingBackSideCard = styled(a.div)`
  position: absolute;
  border-radius: 15px;
  background-color: #242424;
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
  font-size: 34px;
  font-weight: bold;
  line-height: 28px;
  color: #ffffff;
`;

const StyledKeyword = styled.p`
  font-size: 10px;
  line-height: 19px;
  background-color: #000000;
  color: #ffffff;
  margin-bottom: 5px;
  padding: 5px 12px;
  border-radius: 20px;
`;

const StyledContent = styled.p`
  max-width: 80%;
  height: auto;
  max-height: 120px;
  font-size: 16px;
  color: #bababa;
  line-height: 20px;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 4px 10px;
  overflow: auto;
`;

const StyledKeywordContainer = styled.div`
  display: flex;
  justify-content: center;
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
          width: "100%",
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <Image
          src="/svg/locationIcon.svg"
          alt="location"
          width={40}
          height={40}
        />
        <StyledParagraph>{place.title}</StyledParagraph>
      </div>

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
          height: "167px",
        }}
      >
        <KakaoMap place={place} />
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
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
