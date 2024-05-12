/* global kakao */
import { useEffect } from "react";
import styled from "styled-components";

declare const window: typeof globalThis & {
  kakao: any;
};

function KakaoMap() {
  useEffect(() => {
    if (window.kakao) {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
      });
    }
  }, []);

  return <MapContainer id="map"></MapContainer>;
}

export default KakaoMap;

const MapContainer = styled.div`
  width: 100%;
  height: calc(100vh - 238px);
`;
