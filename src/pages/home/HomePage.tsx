import React, { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../../api/axios";
import BottomNav from "components/BottomNav";

interface Ranking {
  nickname: string;
  rank: number;
  clovers: number;
}

interface myRanking {
  email: string;
  nickname: string;
}

function HomePage() {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [myRank, setMyRank] = useState<number | null>(null);
  const [myScore, setMyScore] = useState<number | null>(null);
  const [myNickname, setMyNickname] = useState<string>("");

  useEffect(() => {
    // 내 닉네임을 가져옴
    api
      .get("api/members/me")
      .then((response) => {
        const myInfo = response.data as myRanking;
        setMyNickname(myInfo.nickname); // 나의 닉네임 설정
      })
      .catch((error) => {
        console.error("There was an error fetching my nickname!", error);
      });

    // 내 랭킹 정보와 클로버 수를 가져옴
    api
      .get("/api/members/rank")
      .then((response) => {
        // 나의 닉네임을 기준으로 나의 순위를 찾음
        setMyNickname(response.data.nickname);
        setMyRank(response.data.rank);
        setMyScore(response.data.clovers);
      })
      .catch((error) => {
        console.error("There was an error fetching my rank and clovers!", error);
      });

    // 상위 랭킹 정보를 가져옴
    api
      .get("/api/members/top?count=10") // 10위까지의 랭킹 정보
      .then((response) => {
        setRankings(response.data as Ranking[]);
      })
      .catch((error) => {
        console.error("There was an error fetching the rankings!", error);
      });
  }, []);

  const fetchCloverCount = () => {
    console.log(`${myNickname}님의 클로버 개수는 ${myScore}`);
    if (myScore !== null) {
      alert(`현재 ${myNickname}님의 클로버 개수는 ${myScore}개 입니다.`);
    }
  };

  return (
    <Container>
      <TitleText>오늘의 클로버 랭킹 TOP 10🔥</TitleText>

      <RankingContainer>
        {rankings.map((ranking, index) => (
          <ProfileCard key={index}>
            <ProfileImage src="/clover-profile.png" alt={`Profile ${index + 1}`} />
            <Nickname>{ranking.nickname}</Nickname>
          </ProfileCard>
        ))}
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
      <BottomNav />
    </Container>
  );
}

export default HomePage;

const Container = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
`;

const TitleText = styled.div<{ second?: boolean }>`
  height: 24px;
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  line-height: 25px;
  color: #000000;

  ${({ second }) => (second ? "top: 500px;" : "top: 72px;")}

  &:last-of-type {
    top: 500px;
  }
`;

const Emoji = styled.span`
  vertical-align: middle;
`;

const CloverBox = styled.div`
  box-sizing: border-box;
  height: 150px;
  background: #ffffff;
  border: 1px solid #bebebe;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 45px;
  justify-content: center;
  align-items: center;
`;

const CloverText = styled.div`
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
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: none;
`;

const RankingContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  overflow-x: auto;
  top: 120px;
  width: 100%;
  height: 120px;
`;

const ProfileCard = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
`;

const ProfileImage = styled.img`
  width: 85px;
  height: 80px;
  border-radius: 50%;
`;

const Nickname = styled.div`
  margin-top: 10px;
  font-size: 18px;
  font-weight: 500;
  color: #000000;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const PloggingArticle = styled.div`
  top: 550px;
  width: 100%;
  font-size: 18px;
  line-height: 1.6;
  color: #333;
  background: #e0e0e0;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
