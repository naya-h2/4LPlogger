import { MemoizedMap } from "components/Map";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import pauseIcon from "assets/icon/plogging-pause.svg";
import startIcon from "assets/icon/plogging-restart.svg";
import { distance } from "utils/calcDistance";
import { calcTime } from "utils/calcTime";
import { Helmet } from "react-helmet-async";

function PloggingPage() {
  const navigate = useNavigate();
  const [sec, setSec] = useState(0);
  const [dst, setDst] = useState(0);
  const [lastPosition, setLastPosition] = useState<{ latitude: number | null; longitude: number | null }[]>([{ latitude: null, longitude: null }]);
  const [isStop, setIsStop] = useState(false);
  const [mapInfo, setMapInfo] = useState<{ latitude: number; longitude: number; level: number }>({ latitude: -1, longitude: -1, level: 4 });

  // time
  const calcSec = () => {
    setSec((prev) => ++prev);
  };

  const handleStopClick = () => {
    const result = {
      time: sec,
      km: dst,
      lastPosition: lastPosition[lastPosition.length - 1],
    };
    localStorage.setItem("ploggingResult", JSON.stringify(result));
    navigate("/post");
  };

  // distance
  const calcDst = (curPosition: { latitude: number | null; longitude: number | null }) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        if (!newPosition.latitude || !newPosition.longitude) alert("현재 위치를 사용할 수 없습니다.");
        if (!curPosition.latitude || !curPosition.longitude) {
          setLastPosition([newPosition]);
          setMapInfo({ latitude: newPosition.latitude, longitude: newPosition.longitude, level: 4 });
        } else {
          setDst((prev) => prev + distance(newPosition.latitude, newPosition.longitude, curPosition.latitude || 0, curPosition.longitude || 0));
          if (curPosition !== newPosition) setLastPosition((prev) => [...prev, newPosition]);
        }
      },
      () => {
        alert("⚠️ 위치 서비스를 허용해 주세요!");
        setIsStop(true);
      },
      { enableHighAccuracy: true },
    );
  };

  useEffect(() => {
    const timer = setInterval(calcSec, 1000);
    if (isStop) {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isStop]);

  useEffect(() => {
    calcDst({ latitude: null, longitude: null });
  }, []);

  useEffect(() => {
    const position = setInterval(() => calcDst(lastPosition[lastPosition.length - 1]), 1000 * 5);
    if (isStop) clearInterval(position);

    return () => {
      clearInterval(position);
    };
  }, [lastPosition, isStop]);

  return (
    <>
      <Helmet>
        <title>플로깅중🍀 | 네잎플로거</title>
      </Helmet>
      <Container>
        <ResultSection>
          <Timer>{calcTime(sec)}</Timer>
          <Distance>
            {dst.toFixed(4)} <Span>km</Span>
          </Distance>
          <Button onClick={handleStopClick}>종료</Button>
        </ResultSection>
        <MemoizedMap curPositionArr={lastPosition} mapInfo={mapInfo} setMapInfo={setMapInfo} />
        <StopBtn onClick={() => setIsStop((prev) => !prev)}>
          <img src={isStop ? startIcon : pauseIcon} />
        </StopBtn>
      </Container>
    </>
  );
}

export default PloggingPage;

const Container = styled.div`
  margin-top: 16px;
`;

const Button = styled.button`
  width: 138px;
  padding: 8px 0;
  margin-top: 12px;
  background-color: #ff4444;
  border-radius: 16px;

  &:hover {
    background-color: #e33c3c;
  }
`;

const Timer = styled.div`
  font-size: 40px;
  font-weight: 900;
  text-align: center;
`;

const ResultSection = styled.div`
  height: 175px;
  border-bottom: 1px solid #d9d9d9;

  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

const Distance = styled.div`
  font-size: 24px;
  font-weight: 900;
  text-align: center;
`;

const Span = styled.span`
  font-size: 16px;
  color: #cdcdcd;
`;

const StopBtn = styled.button`
  background-color: black;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  box-shadow: 0 3px 3px 3px rgba(64, 60, 67, 0.16);

  position: fixed;
  bottom: 24px;
  left: 50%;
  margin-left: -30px;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;
`;
