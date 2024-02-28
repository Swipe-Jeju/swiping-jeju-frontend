import styled, { keyframes, css } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const MainTitle = styled.h1`
    font-size: 2rem;
    margin: 1rem;
    text-align: center;
`;

export const AnimationContainer = styled.div`
    ${(props) =>
        props.animate &&
        css`
            animation: ${fadeIn} 1000ms forwards;
        `}
    margin-top: 3rem;
`;
