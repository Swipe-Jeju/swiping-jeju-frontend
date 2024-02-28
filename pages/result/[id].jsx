"use client";

import { useRouter } from "next/router";
import * as S from "@/components/_styled/resultStyled";
import MainImg from "@/public/images/background/char_3.png";
import { useEffect, useState } from "react";
import ResultHotplaceList from "@/components/result/ResultHotplaceList";
import KakaoMap from "./KakaoMap";
import KakaoShareButton from "@/components/result/ResultKakaoShareBtn";
import Image from "next/image";
import Char4 from "@/public/images/background/nocap.png";
// import { API } from "@/pages/axios";

function Result() {
    const router = useRouter();
    const { id } = router.query;
    const [result, setResult] = useState();
    const [isLoaded, setIsLoaded] = useState(true);
    const [isClicked, setIsClicked] = useState(false); // 클릭 상태

    const handleClick = () => {
        setIsClicked(true);
    };

    // isClicked 상태가 true로 변경될 때 handleNext 함수 호출
    useEffect(() => {
        if (isClicked) {
            // 1초 후에 handleNext 함수 호출
            const timeoutId = setTimeout(() => {
                router.push("/");
            }, 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [isClicked]); // 의존성 배열에 isClicked와 handleNext 추가

    const fetchNotice = async () => {
        setIsLoaded(true);
        try {
            console.log("해당 게시글 id : ", id);
            // todo : next 설정 하기
            // 아이디 3인거 요청
            // const response = await API.get(`/result/id/${id}`);
            // const resultData = response.data;

            // 일단은 더미 데이터

            const DummyData = {
                // 앨범 아이디, 쿼리 아이디
                id: 3,
                // ai가 만들어주는 제목
                title: "성산이 만든 제주도",
                // ai가 만들어주는 내용물
                content:
                    "너의 여행 리스트를 보니까 산, 바다, 카페라는 여행 목적에 아주 잘 부합하고 있어!\n만장굴에서는 자연 속 아름다운 산의 경관을, 중문 색달 해변과 섭지코지에서는 아름다운 바다..",
                // 핫플레이스 지도 위도 경도 리스트
                hotPlace: [
                    {
                        id: 1,
                        name: "성산일출봉",
                        lat: 33.45914752593695,
                        lng: 126.94039767700909,
                    },
                    {
                        id: 2,
                        name: "성산일출봉 아시횟집",
                        lat: 33.4652923722517,
                        lng: 126.93234696830558,
                    },
                    {
                        id: 3,
                        name: "우도 잠수함",
                        lat: 33.471982703373556,
                        lng: 126.93307332647784,
                    },
                    {
                        id: 4,
                        name: "성산 포항",
                        lat: 33.47362374548788,
                        lng: 126.9332872326622,
                    },
                ],
            };

            // 일단은 더미
            const resultData = DummyData;
            setResult(resultData);
            console.log("결과 데이터는요!! : ", result);
            setIsLoaded(false);
        } catch (error) {
            setIsLoaded(false);
        }
    };

    // 처음 렌더링 될 때 실행
    useEffect(() => {
        fetchNotice();
    }, []);

    // 지도 렌더링

    return isLoaded ? (
        <>로딩중</>
    ) : (
        <>
            <S.ResultWrapper>
                <S.Title>{result.title}</S.Title>
                <S.ImageContainer>
                    <Image
                        src={MainImg}
                        alt="mainImg"
                        width={277}
                        height={155}
                    />
                </S.ImageContainer>
                <S.ContentContainer>
                    <S.Content>{result.content}</S.Content>
                </S.ContentContainer>
                <ResultHotplaceList hotplaces={result.hotPlace} />
                <KakaoMap hotplaces={result?.hotPlace || []} />

                {/* 카카오 공유하기 버튼 */}
                <KakaoShareButton description={result.content} />
                {/* 스와이프 다시 하러가기  */}
                <S.ButtonContainer>
                    <S.MainButton onClick={handleClick}>
                        스와이프 다시 하러가기
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
            </S.ResultWrapper>
        </>
    );
}
export default Result;
