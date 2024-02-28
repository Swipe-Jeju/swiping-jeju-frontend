import React, { useEffect, useState } from "react";
import * as S from "@/components/_styled/homeStyled";
import HomeMapSelction from "@/components/home/homeMapSelection/homeMapSelection";
import HomeStyleInput from "@/components/home/homeStyleInput/HomeStyleInput";
import HomeLanding from "@/components/home/homeLading/HomeLanding";

function Home() {
  const [step, setStep] = useState(0);

  // 에니메이션
  const [animate, setAnimate] = useState(false);

  // object, title이랑 지도 리스트 복수 선택
  const [swipingAlbum, setSwipingAlbum] = useState({
    title: "",
    mapList: [],
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setAnimate(false);
    }, 1000);
    setAnimate(true);
    return () => clearTimeout(timeoutId);
  }, [step]);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  useEffect(() => {
    if (localStorage.getItem("isFirst") === null) {
      localStorage.setItem("isFirst", true);
    }
  }, []);

  return (
    <>
      <S.AnimationContainer animate={animate}>
        <S.MainTitle>Home dsads</S.MainTitle>
        {/* #1 시작 하기 버튼 -> homeSelect 컴포넌트 보이게 하기  */}
        {/* <button onClick={handleNext}>시작하기</button> */}
        {step === 0 && <HomeLanding onNext={handleNext} />}

        {/* #2 시작 하기 버튼 누른 다음, homeSelect 컴포넌트에서 지도 선택하기 컴포넌트 */}
        {step === 1 && (
          <HomeMapSelction
            onNext={handleNext}
            setSwipingAlbum={setSwipingAlbum}
          />
        )}
        {/* #3 지도 선택한 다음 사용자에게 어떤 스타일을 추천받길 원하는지 input으로 입력받는 컴포넌트  */}
        {step === 2 && (
          <HomeStyleInput
            swipingAlbum={swipingAlbum}
            setSwipingAlbum={setSwipingAlbum}
          />
        )}
      </S.AnimationContainer>
    </>
  );
}
export default Home;
