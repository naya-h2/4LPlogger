/* global kakao */
import { TRASH } from "assets/data/trash";
import React, { useEffect } from "react";
import styled from "styled-components";
import trashMarker from "../../assets/icon/trash-marker.svg";

declare const window: typeof globalThis & {
  kakao: any;
};

interface Props {
  curPositionArr: { latitude: number | null; longitude: number | null }[];
  mapInfo: { latitude: number; longitude: number; level: number };
  setMapInfo: any;
}

function KakaoMap({ curPositionArr, mapInfo, setMapInfo }: Props) {
  useEffect(() => {
    const curPosition = curPositionArr[curPositionArr.length - 1];
    if (window.kakao) {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(mapInfo.latitude, mapInfo.longitude),
          level: mapInfo.level,
        };
        const map = new window.kakao.maps.Map(container, options);

        //쓰레기통 마커
        const imageSize = new window.kakao.maps.Size(32, 32); // 마커이미지의 크기입니다

        for (const trash of TRASH) {
          const markerImage = new window.kakao.maps.MarkerImage(trashMarker, imageSize),
            markerPosition = new window.kakao.maps.LatLng(trash.latitude, trash.longitude); // 마커가 표시될 위치입니다

          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            image: markerImage,
          });

          marker.setMap(map);
        }

        if (curPosition.latitude && curPosition.longitude) {
          // marker (user)
          const markerPosition = new window.kakao.maps.LatLng(curPosition.latitude, curPosition.longitude);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);

          // line
          const linePath = curPositionArr.map((position) => new window.kakao.maps.LatLng(position.latitude, position.longitude));
          const polyline = new window.kakao.maps.Polyline({
            path: linePath, // 선을 구성하는 좌표배열 입니다
            strokeWeight: 5, // 선의 두께 입니다
            strokeColor: "#54a300", // 선의 색깔입니다
            strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: "solid", // 선의 스타일입니다
          });
          polyline.setMap(map);
        }

        window.kakao.maps.event.addListener(map, "center_changed", function () {
          const level = map.getLevel();
          const latlng = map.getCenter();
          setMapInfo({ level, latitude: latlng.Ma, longitude: latlng.La });
        });
      });
    }
  }, [curPositionArr]);

  return <MapContainer id="map"></MapContainer>;
}

export default KakaoMap;

export const MemoizedMap = React.memo(KakaoMap);

const MapContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 239px);
`;
