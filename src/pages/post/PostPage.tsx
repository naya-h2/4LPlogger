import styled from "styled-components";
import addIcon from "assets/icon/add-img.svg";
import { ChangeEvent, useState } from "react";
import useModal from "hooks/useModal";
import PloggingModal from "components/Modal/PloggingModal";

function PostPage() {
  const { isOpen, handleModalOpen, handleModalClose } = useModal();
  const [imgUrl, setImgUrl] = useState("");

  const handleImgChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length === 0 || !event.target.files) return;
    setImgUrl(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <Container>
      <ContentWrapper>
        <Title>플로깅을 완료했어요✨</Title>
        <CardContainer>
          <Date>2024-05-08</Date>
          쓰레기 사진을 찍어 플로깅을 인증하세요.
          <ImgAddBox $imgUrl={imgUrl}>
            {imgUrl === "" && <ImgAddIcon src={addIcon} />}
            <input type="file" hidden accept="image/*" onChange={handleImgChange} />
          </ImgAddBox>
          <ResultWrapper>
            <ResultBox>
              <Category>시간</Category>
              <Value>00:39:44</Value>
            </ResultBox>
            <ResultBox>
              <Category>km</Category>
              <Value>3.3345</Value>
            </ResultBox>
          </ResultWrapper>
          <Button onClick={handleModalOpen}>인증하기</Button>
          플로깅 인증을 하지 않으면, 클로버를 받을 수 없어요.
        </CardContainer>
      </ContentWrapper>
      <button>기록하기</button>
      {isOpen && <PloggingModal hideModal={handleModalClose} />}
    </Container>
  );
}

export default PostPage;

const Container = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.div`
  padding-top: 32px;

  text-align: center;
  font-size: 24px;
  font-weight: 700;
`;

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

const Date = styled.div`
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

const ResultBox = styled.div`
  width: 50%;

  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Category = styled.div`
  font-size: 14px;
  text-align: center;
`;

const Value = styled.div`
  color: #54a300;

  text-align: center;
  font-size: 24px;
  font-weight: 700;
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
