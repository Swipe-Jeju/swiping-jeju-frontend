import styled, { keyframes, css } from "styled-components";

// 슬라이드 애니메이션 정의
const slideRightAnimation = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-385%); // 오른쪽 끝으로 이동
  }
`;

// 슬라이드 애니메이션 정의
const MaskslideRightAnimation = keyframes`
  from {
    transform: translateX(120%);
  }
  to {
    transform: translateX(-7%); // 오른쪽 끝으로 이동
  }
  `;

export const ResultWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 2.5rem 0 2.5rem;
    margin-bottom: 2rem;
`;

export const Title = styled.h1`
    font-family: "Bagel Fat One", system-ui;
    font-weight: 400;
    font-style: normal;
    color: #00ff66;
    font-size: 30px;
`;
export const Content = styled.p`
    text-align: center;
    font-size: 1rem;
    color: #fff;
    line-height: 1.5;
    font-weight: 400;
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
`;

export const ImageContainer = styled.div`
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 27px;
`;

export const TrailEffect = styled.div`
    position: absolute;
    margin-left: 10px;
    margin-top: 5px;
    height: 60%;
    width: 400%;
    left: 100%; // 시작 위치
    background: #ffffff; // 배경과 같은 색으로 설정
    animation: ${MaskslideRightAnimation} 1s forwards;
`;

export const SlideImageContainer = styled.div`
    margin-left: 10px;
    margin-top: 4px;
    position: absolute;
    right: 0;
    top: 0;
    transition: transform 1s ease; // 부드러운 이동을 위한 transition

    // 애니메이션 적용
    ${(props) =>
        props.isClicked &&
        css`
            animation: ${slideRightAnimation} 1s forwards; // 애니메이션 실행
        `}
`;

export const MainButton = styled.div`
    position: relative;
    border-radius: 30px;
    border: 1px solid #00ff66;
    background-color: #fff;
    padding: 1.2rem 4rem;
    font-size: 1rem;
    font-weight: 600;
    overflow: hidden; // 버튼 밖으로 나가는 컨텐츠 숨기기
    cursor: pointer;
`;
