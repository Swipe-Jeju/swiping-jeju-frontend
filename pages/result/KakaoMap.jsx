import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";

const KakaoMap = ({ hotplaces }) => {
    if (typeof hotplaces === "undefined" || hotplaces.length === 0) {
        return <div>지도를 불러오는 중입니다...</div>;
    }
    // 모든 핫플레이스의 위도와 경도를 더한 뒤, 개수로 나눠 평균을 구함
    const averageLat =
        hotplaces.reduce((acc, curr) => acc + curr.lat, 0) / hotplaces.length;
    const averageLng =
        hotplaces.reduce((acc, curr) => acc + curr.lng, 0) / hotplaces.length;

    return (
        <>
            <Map
                center={{ lat: averageLat, lng: averageLng }}
                level={6}
                isPanto={true}
                style={{ width: "100%", height: "200px", borderRadius: "20px" }}
            >
                {hotplaces.map((place) => (
                    <MapMarker
                        key={place.id}
                        title={place.name} // 마커 타이틀 설정
                        position={{ lat: place.lat, lng: place.lng }}
                        onClick={() => {
                            console.log("마커 클릭됨");
                        }}
                    />
                ))}
                <Polyline
                    path={hotplaces.map((place) => ({
                        lat: place.lat,
                        lng: place.lng,
                    }))}
                    strokeWeight={3} // 선의 두께
                    strokeColor={"#FFAE00"} // 선의 색깔
                    strokeOpacity={0.7} // 선의 불투명도: 1에서 0 사이의 값, 0에 가까울수록 투명
                    strokeStyle={"solid"} // 선의 스타일
                />
            </Map>
        </>
    );
};

export default KakaoMap;
