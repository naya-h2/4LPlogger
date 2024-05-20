import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

// Define the interface for the ranking data
interface Ranking {
  nickname: string;
}

function HomePage() {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [cloverCount, setCloverCount] = useState<number | null>(null);

  useEffect(() => {
    // Fetch rankings from the backend
    axios
      .get<Ranking[]>("http://localhost:8080/rankings") // Replace with your actual backend URL
      .then((response) => {
        setRankings(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the rankings!", error);
      });
  }, []);

  const fetchCloverCount = () => {
    axios
      .get<number>("http://localhost:8080/cloverCount") // Replace with your actual backend URL for fetching clover count
      .then((response) => {
        setCloverCount(response.data);
        alert(`현재 클로버 개수는 ${response.data}개 입니다.`);
      })
      .catch((error) => {
        console.error("There was an error fetching the clover count!", error);
      });
  };

  return (
    <div>
      <TitleText>오늘의 클로버 랭킹 TOP 5🔥</TitleText>

      <RankingContainer>
        <ProfileCard>
          <ProfileImage src="/clover-profile.png" alt="Profile 1" />
          <Nickname>달린다^^</Nickname>
        </ProfileCard>
        <ProfileCard>
          <ProfileImage src="/clover-profile.png" alt="Profile 2" />
          <Nickname>셔누오빠최고</Nickname>
        </ProfileCard>
        <ProfileCard>
          <ProfileImage src="/clover-profile.png" alt="Profile 3" />
          <Nickname>뛰기 싫다</Nickname>
        </ProfileCard>
        <ProfileCard>
          <ProfileImage src="/clover-profile.png" alt="Profile 4" />
          <Nickname>뛰어야겠지</Nickname>
        </ProfileCard>
        <ProfileCard>
          <ProfileImage src="/clover-profile.png" alt="Profile 5" />
          <Nickname>메롱</Nickname>
        </ProfileCard>
      </RankingContainer>

      <CloverBox>
        <CloverText>🍀 오늘 나의 클로버 수는?</CloverText>
        <ConfirmBtn onClick={fetchCloverCount}>확인하기</ConfirmBtn>
      </CloverBox>

      <TitleText second>
        플로깅 정보 모아보기<Emoji>🌱</Emoji>
      </TitleText>

      <PloggingArticle>
        플로깅이란? <br />
        플로깅은 스웨덴에서 시작된 환경 보호 운동으로, 조깅을 하면서 동시에 쓰레기를 줍는 활동입니다. 플로깅은 건강을 유지하면서도 자연을 보호하는 두 가지 이점을 동시에 누릴 수
        있는 운동입니다. <br />
        <br />
        플로깅에 참여해보세요! 우리의 작은 실천이 지구를 깨끗하게 만듭니다.
      </PloggingArticle>
    </div>
  );
}

export default HomePage;

const TitleText = styled.div<{ second?: boolean }>`
  position: absolute;
  width: 300px; /* Adjusted width to fit longer text */
  height: 24px;
  left: 16px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  line-height: 25px; /* Adjusted line-height to match font-size */
  color: #000000;

  ${({ second }) => (second ? "top: 500px;" : "top: 72px;")}

  &:last-of-type {
    top: 500px; /* Adjust the top value as needed to place it below the CloverBox */
  }
`;

const Emoji = styled.span`
  vertical-align: middle;
`;

const CloverBox = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 424px;
  height: 150px;
  left: 27px;
  top: 300px;
  background: #ffffff;
  border: 1px solid #bebebe;
  border-radius: 10px;
`;

const CloverText = styled.div`
  position: relative;
  width: 288px;
  height: 37px;
  left: 60px;
  top: 30px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 21px;
  text-align: center;
  color: #000000;
`;

const ConfirmBtn = styled.button`
  background-color: #54a300;
  width: 150px;
  height: 50px;
  font-size: 20px;
  border-radius: 30px;
  position: relative;
  top: 40px;
  left: 50%;
  margin-left: -75px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: none;
`;

const RankingContainer = styled.div`
  display: flex;
  justify-content: flex-start; /* Align items to the start */
  gap: 20px; /* Set a consistent gap between cards */
  overflow-x: auto;
  position: absolute;
  top: 120px; /* Adjust the top value as needed to position it correctly below the first TitleText */
  left: 16px;
  width: calc(100% - 32px); /* Full width with padding adjustment */
  height: 150px;
`;

const ProfileCard = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 105px; /* Ensure a consistent width for each card */
`;

const ProfileImage = styled.img`
  width: 105px;
  height: 100px;
  border-radius: 50%;
`;

const Nickname = styled.div`
  margin-top: 10px;
  font-family: "Inter";
  font-size: 18px;
  font-weight: 500;
  color: #000000;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%; /* Ensure the ellipsis works correctly */
`;

const PloggingArticle = styled.div`
  position: absolute;
  top: 550px; /* Adjust the top value as needed to place it correctly below the second TitleText */
  left: 16px;
  width: calc(100% - 32px);
  font-family: "Inter";
  font-size: 18px;
  line-height: 1.6;
  color: #333;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
