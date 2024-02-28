import React from "react";
import * as S from "./style";
import { FaMapMarkerAlt } from "react-icons/fa";
import { RiDirectionLine } from "react-icons/ri";

function ResultHotplaceList({
    hotplaces, // hotplaces prop을 전달 받음
}) {
    // 구조 분해 할당을 사용하여 hotplaces prop 추출
    const openInGoogleMaps = (name, lat, lng) => {
        const url = `https://map.kakao.com/link/to/${name},${lat},${lng}`;
        window.open(url, "_blank");
    };

    return (
        <S.HotPlaceListContainer>
            {hotplaces &&
                hotplaces.map(
                    (
                        place // hotplaces 존재 여부를 확인
                    ) => (
                        <S.HotPlaceBox
                            key={place.id}
                            style={{}}
                            onClick={() =>
                                openInGoogleMaps(
                                    place.name,
                                    place.lat,
                                    place.lng
                                )
                            }
                        >
                            <FaMapMarkerAlt color="#00FF66" />
                            {place.name.slice(0, 5)}...
                            <RiDirectionLine />
                        </S.HotPlaceBox>
                    )
                )}
        </S.HotPlaceListContainer>
    );
}

export default ResultHotplaceList;
