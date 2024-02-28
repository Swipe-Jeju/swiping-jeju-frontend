import React, { useState } from "react";
import * as S from "./style";
import Image from "next/image";
import JejuMapImg from "../../../public/images/jeju_map.png";

function HomeMapSelection({ onNext, setSwipingAlbum }) {
    const mapOptions = [
        { id: 1, name: "제주시", status: "disabled" },
        { id: 2, name: "조천읍", status: "disabled" },
        { id: 3, name: "구좌읍", status: "disabled" },
        { id: 4, name: "성산읍", status: "enabled" },
        { id: 5, name: "표선면", status: "enabled" },
        { id: 6, name: "남원읍", status: "enabled" },
        { id: 7, name: "서귀포시", status: "enabled" },
        { id: 8, name: "중문", status: "disabled" },
        { id: 9, name: "안덕면", status: "disabled" },
        { id: 10, name: "대정읍", status: "disabled" },
        { id: 11, name: "한경면", status: "disabled" },
        { id: 12, name: "한림읍", status: "disabled" },
        { id: 13, name: "애월읍", status: "disabled" },
    ];

    const [selectedMaps, setSelectedMaps] = useState([]);

    // 지도 토글 함수
    const toggleMapSelection = (map) => {
        if (map.status === "disabled") return; // 비활성화된 항목은 클릭 불가능

        const isAlreadySelected = selectedMaps.includes(map.id);
        if (isAlreadySelected) {
            setSelectedMaps(selectedMaps.filter((id) => id !== map.id));
        } else {
            setSelectedMaps([...selectedMaps, map.id]);
        }
    };

    // 다음 버튼 클릭 시
    const handleNextClick = () => {
        // 지도 선택 완료 후 onNext 함수 호출 전에 SwipingAlbum 상태 업데이트
        const selectedMapNames = mapOptions
            .filter((map) => selectedMaps.includes(map.id))
            .map((map) => map.id);
        setSwipingAlbum((prevAlbum) => ({
            ...prevAlbum,
            mapList: selectedMapNames,
        }));
        onNext();
    };

    return (
        <>
            <S.MapContainer>
                {/* 지도 컨테이너  */}
                <S.MapTitleContainer>
                    <S.MapTitle>
                        원하는{" "}
                        <strong style={{ color: "#00FF66" }}>장소</strong>를{" "}
                        <br />
                        선택하세요
                    </S.MapTitle>
                </S.MapTitleContainer>
                {/* 지도 이미지 */}
                <S.MapImageContainer>
                    <Image
                        height={260}
                        src={JejuMapImg}
                        alt="제주도 지도"
                        objectFit="contain"
                    />
                </S.MapImageContainer>
                {/* 지도 선택 옵션 */}
                {mapOptions.map((map) => (
                    <S.MapOption
                        key={map.id}
                        selected={selectedMaps.includes(map.id)}
                        disabled={map.status === "disabled"}
                        onClick={() => toggleMapSelection(map)}
                    >
                        {map.name}
                    </S.MapOption>
                ))}
            </S.MapContainer>
            <S.SelectionButton onClick={handleNextClick}>
                지도 선택하기
            </S.SelectionButton>
        </>
    );
}

export default HomeMapSelection;
