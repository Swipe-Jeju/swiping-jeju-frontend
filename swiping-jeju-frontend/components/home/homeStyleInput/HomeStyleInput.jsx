import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as S from "./style";
import * as SM from "../homeMapSelection/style";
import { GrPowerReset } from "react-icons/gr";
import Loading from "@/components/loading/Loading";
import axios from "axios";
import {
    getFirestore,
    collection,
    addDoc,
    query,
    where,
    getDocs,
} from "firebase/firestore";
import { dbService } from "@/firebase/firebase";

// 전체 키워드 리스트
const keywordList = [
    "바다",
    "카페",
    "힐링",
    "오름",
    "해변",
    "한라산",
    "돌하르방",
    "성산일출봉",
    "숲길",
    "먹거리",
    "전통시장",
    "미술관",
    "테마파크",
    "스쿠버다이빙",
    "서핑",
    "요트투어",
    "올레길",
    "포토스팟",
    "야경",
    "감귤체험",
    "동굴탐험",
    "민속촌",
    "워터파크",
    "곶자왈",
    "말타기체험",
    "비자림",
    "에코랜드",
    "우도",
    "천지연폭포",
    "테디베어뮤지엄",
];

const mapOptions = [
    { id: 1, name: "제주시", status: "disabled" },
    { id: 2, name: "조천읍", status: "disabled" },
    { id: 3, name: "구좌읍", status: "disabled" },
    { id: 4, name: "성산읍", status: "enabled" },
    { id: 5, name: "표선면", status: "enabled" },
    { id: 6, name: "남원읍", status: "enabled" },
    { id: 7, name: "서귀포", status: "enabled" },
    { id: 8, name: "중문", status: "disabled" },
    { id: 9, name: "안덕면", status: "disabled" },
    { id: 10, name: "대정읍", status: "disabled" },
    { id: 11, name: "한경면", status: "disabled" },
    { id: 12, name: "한림읍", status: "disabled" },
    { id: 13, name: "애월읍", status: "disabled" },
];

// 랜덤 키워드 추출 함수
function getRandomKeywords(keywordList, count) {
    // 결과 리스트 초기화
    const resultList = [];
    // 중복 선택을 방지하기 위한 인덱스 집합 생성
    const indexSet = new Set();

    // resultList의 길이가 count보다 작고, indexSet의 크기가 keywordList의 길이보다 작을 때까지 반복
    while (resultList.length < count && indexSet.size < keywordList.length) {
        // keywordList의 길이 내에서 랜덤 인덱스 생성
        const randomIndex = Math.floor(Math.random() * keywordList.length);

        // 해당 인덱스가 아직 선택되지 않았다면
        if (!indexSet.has(randomIndex)) {
            // 인덱스 집합에 추가
            indexSet.add(randomIndex);
            // 결과 리스트에 해당 키워드 추가
            resultList.push(keywordList[randomIndex]);
        }
    }

    return resultList;
}

function HomeStyleInput({ swipingAlbum, setSwipingAlbum }) {
    const [inputText, setInputText] = useState("");
    const [randomKeywords, setRandomKeywords] = useState([]);

    const [docId, setDocId] = useState("");
    const [keywords, setKeywords] = useState([]);
    const [myAlbumList, setMyAlbumList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // 랜덤 키워드 추출
    useEffect(() => {
        // 랜덤 키워드 추출
        const randomKeywords = getRandomKeywords(keywordList, 10);
        setRandomKeywords(randomKeywords);
    }, []);

    const handleSubmit = async () => {
        // API 호출을 위해 새로운 상태를 설정하고, 설정된 상태를 바로 사용하여 API 호출
        const updatedAlbum = {
            ...swipingAlbum,
            title: inputText,
        };

        // 상태 업데이트
        setSwipingAlbum(updatedAlbum);

        // 업데이트된 swipingAlbum 상태를 사용하여 API 호출
        await postAlbumToAPI(updatedAlbum);

        // 스와이핑 페이지로 이동
        // router.push(`/result`);

        // const id = 3;
        // 일단은 결과 페이지로 이동
        // router.push(`/result/${id}`);
    };

    // API에 데이터를 POST하는 함수
    const postAlbumToAPI = async (album) => {
        setIsLoading(true);
        try {
            console.log("API 호출 시작:", album);

            // 키워드 추출 API 호출
            const res = await axios
                .post("/api/get-keyword", {
                    question: inputText,
                })
                .then((res) => res.data);

            const keywords = res.response.split(", ");
            setKeywords(keywords);
            // -> 키워드 가지고 있어

            // Save to Firestore
            const docRef = await addDoc(collection(dbService, "albums"), {
                ...album,
            });
            setDocId(docRef.id);

            const array = mapOptions
                .filter(
                    (option) =>
                        album.mapList.find((map) => map === option.id) !==
                        undefined
                )
                .map((v) => v.name);

            // 전체 컬렉션에서 키워드와 지역을 비교해서 교집합 추출
            if (array.length > 0) {
                const q = query(collection(dbService, "hotplace"));

                try {
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        // console.log(doc.id, " => ", doc.data());
                        const data = doc.data();
                        setMyAlbumList((prev) => [...prev, data]);
                    });

                    //setMyAlbumList
                } catch (error) {
                    console.error("Error fetching documents: ", error);
                }
            } else {
                console.log(
                    "myMapList 배열이 비어 있어 쿼리를 실행할 수 없습니다."
                );
            }

            // 전체 앨범이랑 키워드 그리고 지역 비교해서 교집합 추출하는 앨범추천 알고리즘
            // albbum의 mapList와 keywords를 가지고 전체 앨범 중에서 추출해내기
            // swipingAlbum.mapList.forEach((map) => {
            //     console.log(map.isMapLis);
            // });

            // Navigate to the results page with the new document ID

            // firebase랑 통신해서 hotplace에서 recommand Place keyword&Location  => Almbum에 저장

            // 키워드, album 정보를 firebase db에 저장해서 id를 받아오기
            // collection에 album 이라는 collection 만들기

            // const response = await fetch("YOUR_API_ENDPOINT", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify(album),
            // });

            // if (!response.ok) {
            //     throw new Error("API 호출 실패");
            // }
            return { docId: docRef.id, keywords: keywords };
            // const data = await response.json();
            // console.log("API 호출 결과:", data);
        } catch (error) {
            console.error("API 호출 중 에러 발생:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (myAlbumList.length > 0) {
            router.push({
                pathname: "/swiping",
                query: {
                    id: docId,
                    keywords: JSON.stringify(keywords),
                    album: JSON.stringify(myAlbumList),
                },
            });
        }
    }, [myAlbumList]);

    return (
        <>
            <S.StyleInputContainer>
                <S.StyleInputTitleContainer>
                    <S.StyleInputTitle>
                        어떤 장소를{" "}
                        <strong style={{ color: "#00FF66" }}>추천</strong>{" "}
                        <br />
                        받고싶으세요?
                    </S.StyleInputTitle>
                </S.StyleInputTitleContainer>
                <S.InputContainer>
                    <S.StyledInput
                        type="text"
                        placeholder="ex. 맛있는 고기국수가 있다고 해서 먹어보고 싶어"
                        onChange={(e) => setInputText(e.target.value)}
                        value={inputText}
                        maxLength={30}
                    />
                    {/* 글자수 - 30글자 이하 */}
                    <S.StyledInputCounter>
                        <strong style={{ color: "#969696" }}>
                            {inputText.length}
                        </strong>{" "}
                        /30
                    </S.StyledInputCounter>
                </S.InputContainer>
                {/* 키워드 랜덤 추천 다시하기 버튼  */}
                <S.MapOptionContainer>
                    {randomKeywords.map((keyword, idx) => (
                        <S.MapOption
                            key={idx}
                            onClick={() => {
                                // StyledInput
                                // InputText에 이어 붙이기
                                // 넣었을때 30자 이하일때만 추가하기
                                if (inputText.length + keyword.length > 30) {
                                    alert("30자 이하로 입력해주세요");
                                    return;
                                }
                                setInputText(inputText + keyword);
                            }}
                        >
                            {keyword}
                        </S.MapOption>
                    ))}
                </S.MapOptionContainer>
                <S.ResetKeywordBtnContainer>
                    <S.ResetKeywordBtn
                        onClick={() => {
                            const randomKeywords = getRandomKeywords(
                                keywordList,
                                10
                            );
                            setRandomKeywords(randomKeywords);
                        }}
                    >
                        <GrPowerReset />
                        &nbsp;새로 고침
                    </S.ResetKeywordBtn>
                </S.ResetKeywordBtnContainer>
                <S.NextButtonContainer>
                    <SM.SelectionButton onClick={handleSubmit}>
                        추천 받기
                    </SM.SelectionButton>
                </S.NextButtonContainer>
            </S.StyleInputContainer>
            {isLoading && <Loading />}
        </>
    );
}

export default HomeStyleInput;
