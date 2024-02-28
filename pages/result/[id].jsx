"use client";

import { useRouter } from "next/router";
import * as S from "./style";
import { useEffect, useState } from "react";
import ResultHotplaceList from "@/components/result/ResultHotplaceList";
import KakaoMap from "./KakaoMap";
import KakaoShareButton from "@/components/result/ResultKakaoShareBtn";
// import { API } from "@/pages/axios";

function Result() {
    const router = useRouter();
    const { id } = router.query;
    const [result, setResult] = useState();
    const [isLoaded, setIsLoaded] = useState(true);

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
                content: "이 코스는 블라 블라 블라블라합니다.",
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
                카카오 지도가 쾅 하고 아래 있음~
                <KakaoMap hotplaces={result?.hotPlace || []} />
                <S.Content>{result.content}</S.Content>
                <ResultHotplaceList hotplaces={result.hotPlace} />
                {/* 카카오 공유하기 버튼 */}
                <KakaoShareButton description={result.content} />
            </S.ResultWrapper>
        </>
    );
}
export default Result;
