import styled from "styled-components";
import addIcon from "assets/icon/add-img.svg";
import { ChangeEvent, useState } from "react";
import useModal from "hooks/useModal";
import PloggingModal from "components/Modal/PloggingModal";
import BottomBtnLayout from "pages/BottomBtnLayout";
import ScoreBox from "components/ScoreBox";
import { calcTime } from "utils/calcTime";
import { useNavigate } from "react-router-dom";
import { TRASH } from "assets/data/trash";
import { distance } from "utils/calcDistance";
import api from "api/axios";
import { format } from "date-fns";

const MINIMUM = 0.05;

function PostPage() {
  const today = new Date();
  const { isOpen, handleModalOpen, handleModalClose } = useModal();
  const [imgUrl, setImgUrl] = useState("");
  const [isVerify, setIsVerify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { km, time, lastPosition } = JSON.parse(localStorage.getItem("ploggingResult") || "");
  const navigate = useNavigate();

  const handleImgChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length === 0 || !event.target.files) return;
    setImgUrl(URL.createObjectURL(event.target.files[0]));
  };

  const handlePostClick = async () => {
    const res = await api.post("/post", {
      date: format(today, "yyyy-MM-dd"),
      time: calcTime(time),
      distance: Number(km),
      goalDistance: Number(localStorage.getItem("goal")),
      imageURL: "https://spnimage.edaily.co.kr/images/Photo/files/NP/S/2023/05/PS23052200142.jpg",
      isSuccessful: "success",
    });

    const { clovers, score } = res.data;
    localStorage.setItem("score", score);
    localStorage.setItem("curCloverNum", clovers);

    navigate("/score");
  };

  const handleVerifyClick = async () => {
    setIsLoading(true);
    let min = null;
    for (const trash of TRASH) {
      const dst = distance(trash.latitude, trash.longitude, lastPosition.latitude, lastPosition.longitude);
      if (min === null) {
        min = dst;
        continue;
      }
      if (min > dst) min = dst;
    }

    if (min === null) return;
    if (MINIMUM < min) return alert(`⚠️ 쓰레기통 근처로 이동해서 인증해주세요!, ${min}`);

    alert("쓰레기통 위치 인증 성공!");

    //쓰레기통 위치 인증 성공
    const verify = await api.post("/flask", {
      image: "https://spnimage.edaily.co.kr/images/Photo/files/NP/S/2023/05/PS23052200142.jpg",
    });

    alert(`사진 인증 결과: ${verify.data.result}`);

    console.log(verify.data.result === "sucess");
    setIsVerify(verify.data.result === "sucess" ? true : false);
  };

  return (
    <BottomBtnLayout titleText="플로깅을 완료했어요✨" btnText="기록하기" btnClickFunc={handlePostClick} disabled={isLoading}>
      <CardContainer>
        <DateWrapper>{today.toLocaleDateString()}</DateWrapper>
        쓰레기 사진을 찍어 플로깅을 인증하세요.
        <ImgAddBox $imgUrl={imgUrl}>
          {imgUrl === "" && <ImgAddIcon src={addIcon} />}
          <input type="file" hidden accept="image/*" onChange={handleImgChange} />
        </ImgAddBox>
        <ResultWrapper>
          <ScoreBox category="시간" value={calcTime(time)} />
          <ScoreBox category="km" value={km.toFixed(4)} />
        </ResultWrapper>
        <Button
          onClick={() => {
            handleVerifyClick();
            setIsLoading(false);
          }}
          disabled={isVerify || isLoading}
        >
          {isLoading ? "인증중..." : isVerify ? "인증완료" : "인증하기"}
        </Button>
        플로깅 인증을 하지 않으면, 클로버를 받을 수 없어요.
      </CardContainer>
      {isOpen && <PloggingModal hideModal={handleModalClose} />}
    </BottomBtnLayout>
  );
}

export default PostPage;

const CardContainer = styled.div`
  width: 100%;
  padding: 14px 24px;

  border-radius: 16px;
  border: 1px solid #d9d9d9;
  background-color: white;

  color: #979797;
  font-size: 12px;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DateWrapper = styled.div`
  color: #bebebe;
  font-size: 14px;
  font-weight: 700;
`;

const Button = styled.button`
  margin-top: 20px;
`;

const ResultWrapper = styled.div`
  display: flex;
`;

const ImgAddBox = styled.label<{ $imgUrl: string }>`
  width: 100%;
  height: 240px;
  padding-bottom: 100%;

  position: relative;

  background: rgba(217, 217, 217, 0.75);
  background-image: ${({ $imgUrl }) => ($imgUrl ? `url(${$imgUrl})` : `none`)};
  background-position: center;
  background-size: cover;
  cursor: pointer;
`;

const ImgAddIcon = styled.img`
  width: 64px;
  height: 64px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
