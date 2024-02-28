import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as S from "./style";
import * as SM from "../homeMapSelection/style";
import { GrPowerReset } from "react-icons/gr";
import axios from "axios";

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
    try {
      console.log("API 호출 시작:", album);

      const res = await axios
        .post("/api/get-keyword", {
          question: inputText,
        })
        .then((res) => res.data);

      const keywords = res.response.split(", ");

      console.log("API 호출 결과:", keywords);

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

      // const data = await response.json();
      // console.log("API 호출 결과:", data);
    } catch (error) {
      console.error("API 호출 중 에러 발생:", error);
    }
  };

  return (
    <>
      <S.StyleInputContainer>
        <S.StyleInputTitleContainer>
          <S.StyleInputTitle>
            어떤 장소를 <strong style={{ color: "#00FF66" }}>추천</strong>{" "}
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
            <strong style={{ color: "#969696" }}>{inputText.length}</strong> /30
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
              const randomKeywords = getRandomKeywords(keywordList, 10);
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
    </>
  );
}

export default HomeStyleInput;
