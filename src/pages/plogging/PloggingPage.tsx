import KakaoMap from "components/Map";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import pauseIcon from "assets/icon/plogging-pause.svg";
import startIcon from "assets/icon/plogging-restart.svg";

function PloggingPage() {
  const navigate = useNavigate();
  const [sec, setSec] = useState(0);
  const [dst, setDst] = useState(0.0);
  const [isStop, setIsStop] = useState(false);

  const calcSec = () => {
    setSec((prev) => ++prev);
  };

  const handleStopClick = () => {
    const result = {
      time: sec,
      km: 0,
    };
    localStorage.setItem("ploggingResult", JSON.stringify(result));
    // console.log(JSON.parse(localStorage.getItem("ploggingResult") || ""));
    navigate("/score");
  };

  const calcTime = (sec: number, type: "m" | "h") => {
    switch (type) {
      case "m":
        if (sec / 60 >= 60) return (sec / 60) % 60;
        return Math.round(sec / 60);
      case "h":
        return Math.round(sec / 3600);
    }
  };

  useEffect(() => {
    const timer = setInterval(calcSec, 1000);
    if (isStop) clearInterval(timer);
    return () => clearInterval(timer);
  }, [isStop]);

  return (
    <Container>
      <ResultSection>
        <Timer>{`${calcTime(sec, "h").toString().padStart(2, "0")} : ${calcTime(sec, "m").toString().padStart(2, "0")} : ${(sec % 60).toString().padStart(2, "0")}`}</Timer>
        <Distance>
          {dst.toFixed(4)} <Span>km</Span>
        </Distance>
        <Button onClick={handleStopClick}>종료</Button>
      </ResultSection>
      <KakaoMap />
      <StopBtn onClick={() => setIsStop((prev) => !prev)}>
        <img src={isStop ? startIcon : pauseIcon} />
      </StopBtn>
    </Container>
  );
}

export default PloggingPage;

const Container = styled.div`
  margin-top: 28px;
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
  left: 45%;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;
`;
