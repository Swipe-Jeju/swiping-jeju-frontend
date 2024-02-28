import styled from "styled-components";
// keyframe
import { keyframes, css } from "styled-components";

export const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 1rem;
`;
// 슬라이드 애니메이션 정의
const slideRightAnimation = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(320%); // 오른쪽 끝으로 이동
  }
`;

// 슬라이드 애니메이션 정의
const MaskslideRightAnimation = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(60%); // 오른쪽 끝으로 이동
  }
  `;

export const LogoContentContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: #fff;
    margin-top: 1.2rem;
`;
export const LogoContent = styled.p``;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 7rem;
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

export const CharacterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 4rem;
`;

export const CountTextContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
`;

export const CountText = styled.p`
    color: #fff;
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
`;

export const SlideImageContainer = styled.div`
    margin-left: 10px;
    margin-top: 5px;
    position: absolute;
    left: 0;
    top: 0;
    transition: transform 1s ease; // 부드러운 이동을 위한 transition

    // 애니메이션 적용
    ${(props) =>
        props.isClicked &&
        css`
            animation: ${slideRightAnimation} 1s forwards; // 애니메이션 실행
        `}
`;

export const Mask = styled.div`
    margin-left: 10px;
    margin-top: 5px;
    position: absolute;
    left: 0;
    top: 0;
    width: 45px;
    height: 40px;
    background-color: #fff; // 배경과 동일한 색상
    ${(props) =>
        props.isClicked &&
        css`
            animation: ${MaskslideRightAnimation} 1s forwards; // 애니메이션 실행
        `}
`;

export const TrailEffect = styled.div`
    position: absolute;
    margin-left: 10px;
    margin-top: 5px;
    height: 60%;
    width: 300%;
    left: -500%; // 시작 위치
    background: #ffffff; // 배경과 같은 색으로 설정
    animation: ${MaskslideRightAnimation} 1s forwards;
`;
