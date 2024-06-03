import styled, { css } from "styled-components";
import addIcon from "assets/icon/add-img.svg";
import { ChangeEvent, useEffect, useState } from "react";
import BottomBtnLayout from "pages/BottomBtnLayout";
import ScoreBox from "components/ScoreBox";
import { calcTime } from "utils/calcTime";
import { useNavigate } from "react-router-dom";
import { TRASH } from "assets/data/trash";
import { distance } from "utils/calcDistance";
import api from "api/axios";
import { format } from "date-fns";
import { Helmet } from "react-helmet-async";

const MINIMUM = 0.05;

function PostPage() {
  const today = new Date();
  const [imgUrl, setImgUrl] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [curImg, setCurImg] = useState<File | null>(null);
  const [isVerify, setIsVerify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { km, time, lastPosition } = JSON.parse(localStorage.getItem("ploggingResult") || "");
  const navigate = useNavigate();

  const handleImgChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length === 0 || !event.target.files) return;
    setImgUrl(URL.createObjectURL(event.target.files[0]));
    setCurImg(event.target.files[0]);
  };

  const handlePostClick = async () => {
    const res = await api.post("/post", {
      date: format(today, "yyyy-MM-dd"),
      time: calcTime(time),
      distance: Number(km),
      goalDistance: Number(localStorage.getItem("goal")),
      imageURL: uploadUrl,
      isSuccessful: isVerify ? "success" : "fail",
    });

    const { clovers, score } = res.data;
    localStorage.setItem("score", score);
    localStorage.setItem("curCloverNum", clovers);

    setIsLoading(false);

    navigate("/score");
  };

  const handleImgUpload = async () => {
    const res = await api.get(`/presigned-url?filename=${curImg?.name}`);

    const imgRes = await fetch(res.data, {
      method: "PUT",
      body: curImg,
    });

    setUploadUrl(imgRes.url.split("?")[0]);
  };

  const handleVerifyClick = async () => {
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
    if (MINIMUM < min) {
      setIsLoading(false);
      return alert(`⚠️ 쓰레기통 근처로 이동해서 인증해주세요!\n인증에 실패하면 클로버를 받을 수 없어요.`);
    }

    alert("🍀 쓰레기통 위치 인증 성공!\n이미지 인증을 진행할게요.");
    handleImgUpload();
  };

  const postFlask = async () => {
    const verify = await api.post("/flask", {
      image: uploadUrl,
    });

    alert(`사진 인증 결과\n[ ${verify.data.result} ]`);

    setIsVerify(verify.data.result === "success" ? true : false);
    setIsLoading(false);
  };

  useEffect(() => {
    if (uploadUrl) postFlask();
  }, [uploadUrl]);

  return (
    <>
      <Helmet>
        <title>기록하기 | 네잎플로거</title>
      </Helmet>
      <BottomBtnLayout
        titleText="플로깅을 완료했어요✨"
        btnText="기록하기"
        btnClickFunc={() => {
          setIsLoading(true);
          handlePostClick();
        }}
        disabled={isLoading}
      >
        <CardContainer>
          <DateWrapper>{today.toLocaleDateString()}</DateWrapper>
          쓰레기 사진을 찍어 플로깅을 인증하세요.
          <ImgAddBox $imgUrl={imgUrl}>
            {imgUrl === "" && <ImgAddIcon src={addIcon} />}
            <input type="file" hidden accept="image/*" capture="environment" onChange={handleImgChange} />
          </ImgAddBox>
          <ResultWrapper>
            <ScoreBox category="시간" value={calcTime(time)} />
            <ScoreBox category="km" value={km.toFixed(4)} />
          </ResultWrapper>
          <Button
            onClick={() => {
              setIsLoading(true);
              handleVerifyClick();
            }}
            disabled={isVerify || isLoading || !imgUrl}
            $disabled={isVerify || isLoading || !imgUrl}
          >
            {isLoading ? "인증하는 중.." : isVerify ? "인증완료" : "인증하기"}
          </Button>
          플로깅 인증을 하지 않으면, 클로버를 받을 수 없어요.
        </CardContainer>
      </BottomBtnLayout>
    </>
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

const disabledButton = css`
  background-color: #d9d9d9;
  cursor: not-allowed;

  &:hover {
    background-color: #d9d9d9;
  }
`;

const Button = styled.button<{ $disabled: boolean }>`
  margin-top: 20px;
  ${({ $disabled }) => ($disabled ? disabledButton : null)};
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
