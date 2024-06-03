import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BottomNav from "components/BottomNav";
import api from "api/axios";
import { useCheckLogin } from "hooks/useCheckLogin";
import { Helmet } from "react-helmet-async";

interface Ranking {
  nickname: string;
  rank: number;
  clovers: number;
}

function RankingPage() {
  useCheckLogin();
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [myRank, setMyRank] = useState<number | null>(null);
  const [myScore, setMyScore] = useState<number | null>(null);
  const [myNickname, setMyNickname] = useState<string>("");

  const handleGetMyRank = async () => {
    const response = await api.get("/api/members/rank");
    setMyNickname(response.data.nickname); // 나의 닉네임 설정
    setMyRank(response.data.rank);
    setMyScore(response.data.clovers);
  };

  useEffect(() => {
    // 내 닉네임을 가져옴
    handleGetMyRank();
    // 상위 랭킹 정보를 가져옴
    api
      .get("/api/members/top?count=30")
      .then((response) => {
        const fetchedRankings = response.data as Ranking[];
        setRankings(fetchedRankings);
      })
      .catch((error) => {
        console.error("There was an error fetching the rankings!", error);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>랭킹 | 네잎플로거</title>
      </Helmet>
      <Container>
        <TitleWrapper>
          <Title>오늘의 랭킹🔥</Title>
        </TitleWrapper>
        <Line />

        <MyRankingBox>
          <RankText>{myRank}</RankText>
          <ProfileImage src="/clover-profile.png" alt="Profile" />
          <Info>
            <Nickname>{myNickname}</Nickname> {/* 나의 닉네임 사용 */}
          </Info>
          <CloverCount>
            <CloverImage src="/clover-logo.svg" alt="Clover" />
            {myScore}
          </CloverCount>
        </MyRankingBox>
        <RankingList>
          {rankings.map((ranking, index) => (
            <RankingBox key={index}>
              <RankText>{ranking.rank}</RankText>
              <ProfileImage src="/clover-profile.png" alt="Profile" />
              <Info>
                <Nickname>{ranking.nickname}</Nickname>
              </Info>
              <CloverCount>
                <CloverImage src="/clover-logo.svg" alt="Clover" />
                {ranking.clovers} {/* 상위 30명의 클로버 갯수 표시 */}
              </CloverCount>
            </RankingBox>
          ))}
        </RankingList>
        <Spacer />
        <BottomNav />
      </Container>
    </>
  );
}

export default RankingPage;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
  padding-left: 10px;
`;

const Spacer = styled.div`
  height: 80px; /* 80px spacer div */
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: #000;
  margin-left: 10px;
`;

const Line = styled.div`
  width: 98%;
  height: 2px;
  background-color: #000;
`;

const MyRankingBox = styled.div`
  display: flex;
  align-items: center;
  width: 98%;
  padding: 25px;
  margin-top: 20px;
  background-color: #ffffff;
  border: 2px solid #54a300;
  border-radius: 30px;
`;

const RankingList = styled.div`
  width: 100%;
  height: 550px;
  overflow-y: scroll;
  margin-top: 20px;
`;

const RankingBox = styled.div`
  display: flex;
  align-items: center;
  width: 98%;
  padding: 20px 0;
  border-bottom: 2px solid #dcdcdc;
`;

const RankText = styled.div`
  font-size: 30px;
  font-weight: 900;
  color: #000;
  margin-left: 10px;
  margin-right: 15px;
`;

const ProfileImage = styled.img`
  width: 75px;
  height: 70px;
  border-radius: 50%;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  flex: 1;
`;

const Nickname = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #000;
  margin-top: 2px;
`;

const CloverCount = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  color: #000;
  margin-left: auto;
  margin-right: 10px;
`;

const CloverImage = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;
