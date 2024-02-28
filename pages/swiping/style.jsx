import styled from "styled-components";
import TinderCard from "react-tinder-card";
import { useSpring, a, animated } from "@react-spring/web";

export const SwipingWrap = styled.div`
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 0 10px 0 10px;

  width: 100%;
  height: 100vh;
`;

export const SwipingNavContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SwipingNavButton = styled.button`
  border: none;
  background: none;
  padding: 0;
  white-space: nowrap;
  width: ${(props) => props.width || "28px"};
  height: ${(props) => props.height || "28px"};
`;

export const SwipingCardContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  height: calc(100vh - 116px);
`;

export const SwipingCardDeck = styled(TinderCard)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  items-align: center;
  position: absolute;
`;

export const SwipingCard = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
`;


export const SwipingActionButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  transform: translateY(50%);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const SwipingActionButton = styled.button`
  border: none;
  background: white;
  border-radius: 50%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
