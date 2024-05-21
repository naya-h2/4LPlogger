import styled from "styled-components";
import addIcon from "assets/icon/add-img.svg";
import { ChangeEvent, useState } from "react";
import useModal from "hooks/useModal";
import PloggingModal from "components/Modal/PloggingModal";
import BottomBtnLayout from "pages/BottomBtnLayout";
import ScoreBox from "components/ScoreBox";
import { calcTime } from "utils/calcTime";
import { useNavigate } from "react-router-dom";

function PostPage() {
  const today = new Date();
  const { isOpen, handleModalOpen, handleModalClose } = useModal();
  const [imgUrl, setImgUrl] = useState("");
  const { km, time } = JSON.parse(localStorage.getItem("ploggingResult") || "");
  const navigate = useNavigate();

  const handleImgChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length === 0 || !event.target.files) return;
    setImgUrl(URL.createObjectURL(event.target.files[0]));
  };

  const handlePostClick = () => {
    navigate("/score");
  };

  return (
    <BottomBtnLayout titleText="플로깅을 완료했어요✨" btnText="기록하기" btnClickFunc={handlePostClick}>
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
        <Button onClick={handleModalOpen}>인증하기</Button>
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
