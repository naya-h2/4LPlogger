/* global kakao */
import { TRASH } from "assets/data/trash";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import trashMarker from "../../assets/icon/trash-marker.svg";

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

        const imageSrc = "../../assets/icon/trash-marker.svg", // 마커이미지의 주소입니다
          imageSize = new window.kakao.maps.Size(32, 32), // 마커이미지의 크기입니다
          imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다

        for (const trash of TRASH) {
          const markerImage = new window.kakao.maps.MarkerImage(trashMarker, imageSize),
            markerPosition = new window.kakao.maps.LatLng(trash.latitude, trash.longitude); // 마커가 표시될 위치입니다

          // 마커를 생성합니다
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            image: markerImage, // 마커이미지 설정
          });

          // 마커가 지도 위에 표시되도록 설정합니다
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
