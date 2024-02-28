import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";

const KakaoMap = ({ hotplaces }) => {
  
    if (typeof hotplaces === "undefined" || hotplaces.length === 0) {
    return <div>지도를 불러오는 중입니다...</div>;
  }

  return (
    <>
      <Map
        center={
          hotplaces.length > 0
            ? { lat: hotplaces[0].lat, lng: hotplaces[0].lng }
            : { lat: 33.450701, lng: 126.570667 }
        }
        style={{ width: "100%", height: "350px" }}
      >
        {hotplaces.map((place) => (
          <MapMarker
            key={place.id}
            title={place.name} // 마커 타이틀 설정
            position={{ lat: place.lat, lng: place.lng }}
            onClick={() => {
              console.log("마커 클릭됨");
              // 클릭시 아래 이동
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
