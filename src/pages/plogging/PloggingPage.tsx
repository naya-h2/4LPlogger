import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function PloggingPage() {
  const navigate = useNavigate();
  const [sec, setSec] = useState(0);

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
    return () => clearInterval(timer);
  }, []);

  return (
    <Container>
      <Timer>{`${calcTime(sec, "h").toString().padStart(2, "0")} : ${calcTime(sec, "m").toString().padStart(2, "0")} : ${(sec % 60).toString().padStart(2, "0")}`}</Timer>
      <Button onClick={handleStopClick}>종료</Button>
    </Container>
  );
}

export default PloggingPage;

const Container = styled.div`
  margin-top: 16px;
`;

const Button = styled.button`
  padding: 8px 0;
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
