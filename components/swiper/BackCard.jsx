import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { a } from "@react-spring/web";

const SwipingBackSideCard = styled(a.div)`
  position: absolute;
  border-radius: 15px;
  background-color: lightgray;
  background-size: cover;
  width: 100%;
  max-width: 100%;
  height: calc(100vh - 116px);
  max-width: 100%;
  padding: 10px;
`;

const BackCard = ({ character, opacity, transform }) => {
  return (
    <SwipingBackSideCard
      character={character}
      style={{
        opacity,
        transform: transform.to((t) => `${t} rotateY(180deg)`),
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          style={{
            border: "none",
            background: "none",
            padding: "0",
            whiteSpace: "nowrap",
          }}
        >
          <Image src="/svg/close.svg" alt="close" width={30} height={30} />
        </button>
      </div>

      <p
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          lineHeight: "28px",
          color: "#000000",
          marginBottom: "10px",
        }}
      >
        {character.title}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: "10px",
          gap: "10px",
        }}
      >
        {character.keyword.map((keyword, index) => (
          <p
            style={{
              fontSize: "16px",
              lineHeight: "19px",
              backgroundColor: "#FFFFFF",
              color: "#000000",
              marginBottom: "5px",
              padding: "5px",
              borderRadius: "2px",
            }}
            key={index}
          >
            {keyword}
          </p>
        ))}
      </div>
      <p
        style={{
          fontSize: "16px",
          height: "auto",
          maxHeight: "70px",
          color: "#000000",
          backgroundColor: "#FFFFFF",
          lineHeight: "20px",
          marginBottom: "10px",
          borderRadius: "10px",
          padding: "8px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 3 /* number of lines to show */,
          lineClamp: 3,
          WebkitBoxOrient: "vertical",
        }}
      >
        {character.content}
      </p>
      <div
        style={{
          width: "100%",
          height: "200px",
          backgroundColor: "red",
        }}
      ></div>
    </SwipingBackSideCard>
  );
};

export default BackCard;
