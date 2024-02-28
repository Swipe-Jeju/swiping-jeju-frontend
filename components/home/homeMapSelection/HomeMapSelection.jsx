import React, { useState } from "react";
import * as S from "./style";
import Image from "next/image";
import Map0 from "../../../public/images/map/map_0.png";
import Map4567 from "../../../public/images/map/map_4_5_6_7.png";
import Map456 from "../../../public/images/map/map_4_5_6.png";
import Map457 from "../../../public/images/map/map_4_5_7.png";
import Map45 from "../../../public/images/map/map_4_5.png";
import Map467 from "../../../public/images/map/map_4_6_7.png";
import Map46 from "../../../public/images/map/map_4_6.png";
import Map47 from "../../../public/images/map/map_4_7.png";
import Map4 from "../../../public/images/map/map_4.png";
import Map567 from "../../../public/images/map/map_5_6_7.png";
import Map56 from "../../../public/images/map/map_5_6.png";
import Map57 from "../../../public/images/map/map_5_7.png";
import Map5 from "../../../public/images/map/map_5.png";
import Map67 from "../../../public/images/map/map_6_7.png";
import Map6 from "../../../public/images/map/map_6.png";
import Map7 from "../../../public/images/map/map_7.png";

// 지도 이미지
const mapImageMapping = {
    0: Map0,
    45: Map45,
    456: Map456,
    4567: Map4567,
    457: Map457,
    46: Map46,
    467: Map467,
    47: Map47,
    4: Map4,
    5: Map5,
    56: Map56,
    567: Map567,
    57: Map57,
    6: Map6,
    67: Map67,
    7: Map7,
};

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

// 지도 이미지 선택 함수
const selectMapImage = (selectedMaps) => {
    // 선택된 맵 ID 정렬
    const sortedSelectedMapIds = selectedMaps.sort((a, b) => a - b);
    // 정렬된 ID를 문자열로 결합
    const selectedMapIdsString = sortedSelectedMapIds.join("");
    // 매핑된 이미지 찾기
    const selectedMapImage = mapImageMapping[selectedMapIdsString];

    console.log(`선택된 지도 리스트 ${selectedMapIdsString}`);
    console.log(selectedMapImage);

    return selectedMapImage || Map0; // 기본 이미지로 Map0을 사용
};

function HomeMapSelection({ onNext, setSwipingAlbum }) {
    const [selectedMaps, setSelectedMaps] = useState([]);
    const [selectedImage, setSelectedImage] = useState(Map0); // 초기 상태는 기본 지도 이미지

    // 지도 토글 함수
    const toggleMapSelection = (map) => {
        if (map.status === "disabled") return; // 비활성화된 항목은 클릭 불가능

        const isAlreadySelected = selectedMaps.includes(map.id);
        if (isAlreadySelected) {
            setSelectedMaps(selectedMaps.filter((id) => id !== map.id));
        } else {
            setSelectedMaps([...selectedMaps, map.id]);
        }

        // 선택된 지도 ID 업데이트 후 이미지 업데이트 로직 추가
        const updatedSelectedMaps = isAlreadySelected
            ? selectedMaps.filter((id) => id !== map.id)
            : [...selectedMaps, map.id];

        setSelectedMaps(updatedSelectedMaps);

        // 선택된 이미지 업데이트
        const newSelectedImage = selectMapImage(updatedSelectedMaps); // 이미지 선택 로직 개선 필요
        setSelectedImage(newSelectedImage);
    };

    // 다음 버튼 클릭 시
    const handleNextClick = () => {
        // 지도를 하나도 선택 안했을때 alert
        if (selectedMaps.length === 0) {
            alert("지도를 선택해주세요");
            return;
        }

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
                    <S.MapClickPointer1
                        onClick={() => {
                            toggleMapSelection(mapOptions[3]);
                        }}
                    >
                        &nbsp;
                    </S.MapClickPointer1>
                    <S.MapClickPointer2
                        onClick={() => {
                            toggleMapSelection(mapOptions[4]);
                        }}
                    >
                        &nbsp;
                    </S.MapClickPointer2>
                    <S.MapClickPointer3
                        onClick={() => {
                            toggleMapSelection(mapOptions[5]);
                        }}
                    >
                        &nbsp;
                    </S.MapClickPointer3>
                    <S.MapClickPointer4
                        onClick={() => {
                            toggleMapSelection(mapOptions[6]);
                        }}
                    >
                        &nbsp;
                    </S.MapClickPointer4>
                    <Image
                        src={selectedImage}
                        alt="Selected Jeju Map"
                        height={260}
                        objectFit="contain"
                    />
                </S.MapImageContainer>
                {/* 지도 선택 옵션 */}
                <S.MapOptionSelectionContainer>
                    {selectedMaps.map((selectedMapId) => {
                        const selectedMap = mapOptions.find(
                            (map) => map.id === selectedMapId
                        );
                        return (
                            <S.MapSelectedOption
                                key={selectedMap.id}
                                selected={true} // 선택된 상태이므로 항상 true
                                disabled={selectedMap.status === "disabled"}
                                onClick={() => {
                                    toggleMapSelection(selectedMap);
                                    selectMapImage(selectedMaps);
                                }}
                            >
                                {selectedMap.name}
                            </S.MapSelectedOption>
                        );
                    })}
                </S.MapOptionSelectionContainer>
                <S.MapOptionContainer>
                    {mapOptions.map((map) => (
                        <S.MapOption
                            key={map.id}
                            selected={selectedMaps.includes(map.id)}
                            disabled={map.status === "disabled"}
                            onClick={() => {
                                toggleMapSelection(map);
                                selectMapImage(selectedMaps);
                            }}
                        >
                            {map.name}
                        </S.MapOption>
                    ))}
                </S.MapOptionContainer>
                <S.NextButtonContainer>
                    <S.SelectionButton onClick={handleNextClick}>
                        다음
                    </S.SelectionButton>
                </S.NextButtonContainer>
            </S.MapContainer>
        </>
    );
}

export default HomeMapSelection;
