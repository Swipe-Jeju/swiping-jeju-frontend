import React from "react";

function ResultHotplaceList({
    hotplaces, // hotplaces prop을 전달 받음
}) {
    // 구조 분해 할당을 사용하여 hotplaces prop 추출
    const openInGoogleMaps = (name, lat, lng) => {
        const url = `https://map.kakao.com/link/to/${name},${lat},${lng}`;
        window.open(url, "_blank");
    };

    return (
        <div>
            {hotplaces &&
                hotplaces.map(
                    (
                        place // hotplaces 존재 여부를 확인
                    ) => (
                        <div
                            key={place.id}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "10px",
                            }}
                        >
                            <span style={{ marginRight: "10px" }}>
                                {place.name}
                            </span>
                            <button
                                onClick={() =>
                                    openInGoogleMaps(
                                        place.name,
                                        place.lat,
                                        place.lng
                                    )
                                }
                            >
                                지도에서 열기
                            </button>
                        </div>
                    )
                )}
        </div>
    );
}

export default ResultHotplaceList;
