import React, { useEffect, useState } from "react";
// import Char1 from "../../../public/images/background/char_gereen.png";
// import Char2 from "../../../public/images/background/char_orange.png";
import Char3 from "../../../public/images/background/char_3.png";
import Char4 from "../../../public/images/background/nocap.png";
import Logo from "../../../public/images/background/logo.png";
import * as S from "./style";
import Image from "next/image";

function HomeLanding({ onNext }) {
    const [isClicked, setIsClicked] = useState(false); // 클릭 상태

    const handleClick = () => {
        setIsClicked(true); // 버튼 클릭 시 상태 업데이트
    };

    // isClicked 상태가 true로 변경될 때 handleNext 함수 호출
    useEffect(() => {
        if (isClicked) {
            // 1초 후에 handleNext 함수 호출
            const timeoutId = setTimeout(() => {
                onNext();
            }, 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [isClicked, onNext]); // 의존성 배열에 isClicked와 handleNext 추가

    return (
        <>
            <S.LogoContainer>
                <Image src={Logo} alt="Logo" width={258} height={157} />
            </S.LogoContainer>
            <S.LogoContentContainer>
                <S.LogoContent>
                    원하는 장소를 스와이프 하여
                    <br /> 나만의 핀을 만들어 보세요
                </S.LogoContent>
            </S.LogoContentContainer>
            <S.CharacterContainer>
                <Image src={Char3} alt="Character3" width={277} height={155} />
            </S.CharacterContainer>
            <S.ButtonContainer>
                <S.MainButton onClick={handleClick}>
                    스와이프 하러가기
                    <S.SlideImageContainer isClicked={isClicked}>
                        <S.TrailEffect /> {/* 흔적 요소 */}
                        <Image
                            src={Char4}
                            alt="Character4"
                            width={55}
                            height={47}
                        />
                    </S.SlideImageContainer>
                </S.MainButton>
            </S.ButtonContainer>
            <S.CountTextContainer>
                <S.CountText>00개의 앨범이 탄생했어요!</S.CountText>
            </S.CountTextContainer>
        </>
    );
}

export default HomeLanding;
