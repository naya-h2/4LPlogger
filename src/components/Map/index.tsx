/* global kakao */
import React, { useEffect, useState } from "react";
import styled from "styled-components";

declare const window: typeof globalThis & {
  kakao: any;
};

interface Props {
  curPositionArr: { latitude: number | null; longitude: number | null }[];
  dst?: any;
  setDst?: any;
}

function KakaoMap({ curPositionArr }: Props) {
  useEffect(() => {
    const curPosition = curPositionArr[curPositionArr.length - 1];

    if (window.kakao) {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(curPosition.latitude, curPosition.longitude),
          level: 4,
        };
        const map = new window.kakao.maps.Map(container, options);
        map.setDraggable(false); //드래그 금지

        if (curPosition.latitude && curPosition.longitude) {
          // marker
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
      });
    }
  }, [curPositionArr]);

  return <MapContainer id="map"></MapContainer>;
}

export default KakaoMap;

export const MemoizedMap = React.memo(KakaoMap);

const MapContainer = styled.div`
  width: 100%;
  height: calc(100vh - 238px);
`;
