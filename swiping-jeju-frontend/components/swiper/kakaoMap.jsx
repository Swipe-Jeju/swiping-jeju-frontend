import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";

const KakaoMap = ({ place }) => {
  return (
    <>
      <Map
        center={{ lat: place.lat, lng: place.lng }}
        style={{
          width: "100%",
          height: "100%",
          minWidth: "280px",
          borderRadius: "30px",
          pointerEvents: "none",
        }}
      >
        <MapMarker
          key={place.placeId}
          title={place.title} // 마커 타이틀 설정
          position={{ lat: place.lat, lng: place.lng }}
        />
      </Map>
    </>
  );
};

export default KakaoMap;
