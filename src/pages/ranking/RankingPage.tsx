import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BottomNav from "components/BottomNav";
import api from "api/axios";
import { useCheckLogin } from "hooks/useCheckLogin";

interface Ranking {
  nickname: string;
  score: number;
}

function RankingPage() {
  useCheckLogin();
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [myRank, setMyRank] = useState<number | null>(null);
  const [myScore, setMyScore] = useState<number | null>(null);
  const [myNickname, setMyNickname] = useState<string>("");

  useEffect(() => {
    // 나의 랭킹 정보를 가져옴
    api
      .get("/api/members/rank")
      .then((response) => {
        setMyRank(response.data.rank);
        setMyScore(response.data.clovers);
        setMyNickname(response.data.nickname); // 나의 닉네임 설정
      })
      .catch((error) => {
        console.error("There was an error fetching my rank!", error);
      });

    // 상위 랭킹 정보를 가져옴
    api
      .get("/api/members/top?count=30")
      .then((response) => {
        setRankings(response.data as Ranking[]);
      })
      .catch((error) => {
        console.error("There was an error fetching the rankings!", error);
      });
  }, []);

  return (
    <Container>
      <TitleWrapper>
        <Title>오늘의 랭킹🔥</Title>
      </TitleWrapper>
      <Line />
      {myRank !== null && myScore !== null && (
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
      )}
      <RankingList>
        {rankings.map((ranking, index) => (
          <RankingBox key={index}>
            <RankText>{index + 1}</RankText>
            <ProfileImage src="/clover-profile.png" alt="Profile" />
            <Info>
              <Nickname>{ranking.nickname}</Nickname>
            </Info>
            <CloverCount>
              <CloverImage src="/clover-logo.svg" alt="Clover" />
              {ranking.score} {/* 상위 30명의 클로버 갯수 표시 */}
            </CloverCount>
          </RankingBox>
        ))}
      </RankingList>
      <BottomNav />
    </Container>
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

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-family: "Inter", sans-serif;
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
  font-family: "Inter", sans-serif;
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
  font-family: "Inter", sans-serif;
  font-size: 20px;
  font-weight: 500;
  color: #000;
  margin-top: 2px;
`;

const CloverCount = styled.div`
  display: flex;
  align-items: center;
  font-family: "Inter", sans-serif;
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

// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import axios from "axios";
// import BottomNav from "components/BottomNav";

// interface Ranking {
//   nickname: string;
//   score: number;
// }

// function RankingPage() {
//   const [rankings, setRankings] = useState<Ranking[]>([]);
//   const [myRank, setMyRank] = useState<number | null>(null);
//   const [myScore, setMyScore] = useState<number | null>(null);

//   useEffect(() => {
//     // 나의 랭킹 정보를 가져옴
//     axios
//       .get("/api/members/rank")
//       .then((response) => {
//         setMyRank(response.data);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching my rank!", error);
//       });

//     // 나의 클로버 수를 가져옴
//     axios
//       .get("/api/members/score")
//       .then((response) => {
//         setMyScore(response.data);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching my score!", error);
//       });

//     // 상위 랭킹 정보를 가져옴
//     axios
//       .get("/api/members/top?count=30")
//       .then((response) => {
//         setRankings(response.data as Ranking[]);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the rankings!", error);
//       });
//   }, []);

//   return (
//     <Container>
//       <TitleWrapper>
//         <Title>오늘의 랭킹🔥</Title>
//       </TitleWrapper>
//       <Line />
//       {myRank !== null && myScore !== null && (
//         <MyRankingBox>
//           <RankText>{myRank}</RankText>
//           <ProfileImage src="/clover-profile.png" alt="Profile" />
//           <Info>
//             <Nickname>플로깅팟팅</Nickname>
//           </Info>
//           <CloverCount>
//             <CloverImage src="/clover-logo.svg" alt="Clover" />
//             {myScore}
//           </CloverCount>
//         </MyRankingBox>
//       )}
//       <RankingList>
//         {rankings.map((ranking, index) => (
//           <RankingBox key={index}>
//             <RankText>{index + 1}</RankText>
//             <ProfileImage src="/clover-profile.png" alt="Profile" />
//             <Info>
//               <Nickname>{ranking.nickname}</Nickname>
//             </Info>
//             <CloverCount>
//               <CloverImage src="/clover-logo.svg" alt="Clover" />
//               {ranking.score}
//             </CloverCount>
//           </RankingBox>
//         ))}
//       </RankingList>
//       <BottomNav />
//     </Container>
//   );
// }

// export default RankingPage;

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   margin-top: 20px;
//   padding-left: 10px;
// `;

// const TitleWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 10px;
// `;

// const Title = styled.h1`
//   font-family: "Inter", sans-serif;
//   font-size: 20px;
//   font-weight: 600;
//   color: #000;
//   margin-left: 10px;
// `;

// const Line = styled.div`
//   width: 98%;
//   height: 2px;
//   background-color: #000;
// `;

// const MyRankingBox = styled.div`
//   display: flex;
//   align-items: center;
//   width: 98%;
//   padding: 25px;
//   margin-top: 20px;
//   background-color: #ffffff;
//   border: 2px solid #54a300;
//   border-radius: 30px;
// `;

// const RankingList = styled.div`
//   width: 100%;
//   height: 550px;
//   overflow-y: scroll;
//   margin-top: 20px;
// `;

// const RankingBox = styled.div`
//   display: flex;
//   align-items: center;
//   width: 98%;
//   padding: 20px 0;
//   border-bottom: 2px solid #dcdcdc;
// `;

// const RankText = styled.div`
//   font-family: "Inter", sans-serif;
//   font-size: 30px;
//   font-weight: 900;
//   color: #000;
//   margin-left: 10px;
//   margin-right: 15px;
// `;

// const ProfileImage = styled.img`
//   width: 75px;
//   height: 70px;
//   border-radius: 50%;
// `;

// const Info = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-left: 20px;
//   flex: 1;
// `;

// const Nickname = styled.div`
//   font-family: "Inter", sans-serif;
//   font-size: 20px;
//   font-weight: 500;
//   color: #000;
//   margin-top: 2px;
// `;

// const CloverCount = styled.div`
//   display: flex;
//   align-items: center;
//   font-family: "Inter", sans-serif;
//   font-size: 18px;
//   font-weight: 500;
//   color: #000;
//   margin-left: auto;
//   margin-right: 10px;
// `;

// const CloverImage = styled.img`
//   width: 20px;
//   height: 20px;
//   margin-right: 5px;
// `;

// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import axios from "axios";
// import BottomNav from "components/BottomNav";

// function RankingPage() {
//   const [rankings, setRankings] = useState([]);
//   const [myRank, setMyRank] = useState(null);
//   const [myScore, setMyScore] = useState(null);

//   useEffect(() => {
//     // 나의 랭킹 정보를 가져옴
//     axios
//       .get("/api/members/rank")
//       .then((response) => {
//         setMyRank(response.data);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching my rank!", error);
//       });

//     // 나의 클로버 수를 가져옴
//     axios
//       .get("/api/members/score")
//       .then((response) => {
//         setMyScore(response.data);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching my score!", error);
//       });

//     // 상위 랭킹 정보를 가져옴
//     axios
//       .get("/api/members/top?count=30")
//       .then((response) => {
//         setRankings(response.data);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the rankings!", error);
//       });
//   }, []);

//   return (
//     <Container>
//       <TitleWrapper>
//         <Title>오늘의 랭킹🔥</Title>
//       </TitleWrapper>
//       <Line />
//       {myRank !== null && myScore !== null && (
//         <MyRankingBox>
//           <RankText>{myRank}</RankText>
//           <ProfileImage src="/clover-profile.png" alt="Profile" />
//           <Info>
//             <Nickname>플로깅팟팅</Nickname>
//           </Info>
//           <CloverCount>
//             <CloverImage src="/clover-logo.svg" alt="Clover" />
//             {myScore}
//           </CloverCount>
//         </MyRankingBox>
//       )}
//       <RankingList>
//         {rankings.map((ranking, index) => (
//           <RankingBox key={index}>
//             <RankText>{index + 1}</RankText>
//             <ProfileImage src="/clover-profile.png" alt="Profile" />
//             <Info>
//               <Nickname>{ranking.nickname}</Nickname>
//             </Info>
//             <CloverCount>
//               <CloverImage src="/clover-logo.svg" alt="Clover" />
//               {ranking.score}
//             </CloverCount>
//           </RankingBox>
//         ))}
//       </RankingList>
//       <BottomNav />
//     </Container>
//   );
// }

// export default RankingPage;

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   margin-top: 20px;
//   padding-left: 10px;
// `;

// const TitleWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 10px;
// `;

// const Title = styled.h1`
//   font-family: "Inter", sans-serif;
//   font-size: 20px;
//   font-weight: 600;
//   color: #000;
//   margin-left: 10px;
// `;

// const Line = styled.div`
//   width: 98%;
//   height: 2px;
//   background-color: #000;
// `;

// const MyRankingBox = styled.div`
//   display: flex;
//   align-items: center;
//   width: 98%;
//   padding: 25px;
//   margin-top: 20px;
//   background-color: #ffffff;
//   border: 2px solid #54a300;
//   border-radius: 30px;
// `;

// const RankingList = styled.div`
//   width: 100%;
//   height: 550px;
//   overflow-y: scroll;
//   margin-top: 20px;
// `;

// const RankingBox = styled.div`
//   display: flex;
//   align-items: center;
//   width: 98%;
//   padding: 20px 0;
//   border-bottom: 2px solid #dcdcdc;
// `;

// const RankText = styled.div`
//   font-family: "Inter", sans-serif;
//   font-size: 30px;
//   font-weight: 900;
//   color: #000;
//   margin-left: 10px;
//   margin-right: 15px;
// `;

// const ProfileImage = styled.img`
//   width: 75px;
//   height: 70px;
//   border-radius: 50%;
// `;

// const Info = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-left: 20px;
//   flex: 1;
// `;

// const Nickname = styled.div`
//   font-family: "Inter", sans-serif;
//   font-size: 20px;
//   font-weight: 500;
//   color: #000;
//   margin-top: 2px;
// `;

// const CloverCount = styled.div`
//   display: flex;
//   align-items: center;
//   font-family: "Inter", sans-serif;
//   font-size: 18px;
//   font-weight: 500;
//   color: #000;
//   margin-left: auto;
//   margin-right: 10px;
// `;

// const CloverImage = styled.img`
//   width: 20px;
//   height: 20px;
//   margin-right: 5px;
// `;

// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import axios from "axios";
// import BottomNav from "components/BottomNav";

// function RankingPage() {
//   const [rankings, setRankings] = useState([]);

//   useEffect(() => {
//     // 백엔드에서 랭킹 데이터를 가져옴
//     axios
//       .get("/api/rankings")
//       .then((response) => {
//         setRankings(response.data);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the rankings!", error);
//       });
//   }, []);

//   return (
//     <Container>
//       <TitleWrapper>
//         <Title>오늘의 랭킹🔥</Title>
//       </TitleWrapper>
//       <Line />
//       <MyRankingBox>
//         <RankText>8</RankText>
//         <ProfileImage src="/clover-profile.png" alt="Profile" />
//         <Info>
//           <Nickname>플로깅팟팅</Nickname>
//         </Info>
//         <CloverCount>
//           <CloverImage src="/clover-logo.svg" alt="Clover" />
//           88
//         </CloverCount>
//       </MyRankingBox>
//       <RankingList>
//         {/* {rankings.map((ranking, index) => (
//           <RankingBox key={index}>
//             <RankText>{ranking.rank}</RankText>
//             <ProfileImage src="/clover-profile.png" alt="Profile" />
//             <Info>
//               <Nickname>{ranking.nickname}</Nickname>
//             </Info>
//             <CloverCount>
//               <CloverImage src="/clover-logo.svg" alt="Clover" />
//               {ranking.cloverCount}
//             </CloverCount>
//           </RankingBox>
//         ))} */}
//         <RankingBox>
//           <RankText>1</RankText>
//           <ProfileImage src="/clover-profile.png" alt="Profile" />
//           <Info>
//             <Nickname>달린다^^</Nickname>
//           </Info>
//           <CloverCount>
//             <CloverImage src="/clover-logo.svg" alt="Clover" />
//             150
//           </CloverCount>
//         </RankingBox>
//         <RankingBox>
//           <RankText>2</RankText>
//           <ProfileImage src="/clover-profile.png" alt="Profile" />
//           <Info>
//             <Nickname>셔누오빠최고</Nickname>
//           </Info>
//           <CloverCount>
//             <CloverImage src="/clover-logo.svg" alt="Clover" />
//             121
//           </CloverCount>
//         </RankingBox>
//         <RankingBox>
//           <RankText>3</RankText>
//           <ProfileImage src="/clover-profile.png" alt="Profile" />
//           <Info>
//             <Nickname>뛰기 싫다</Nickname>
//           </Info>
//           <CloverCount>
//             <CloverImage src="/clover-logo.svg" alt="Clover" />
//             111
//           </CloverCount>
//         </RankingBox>
//         <RankingBox>
//           <RankText>4</RankText>
//           <ProfileImage src="/clover-profile.png" alt="Profile" />
//           <Info>
//             <Nickname>뛰어야겠지</Nickname>
//           </Info>
//           <CloverCount>
//             <CloverImage src="/clover-logo.svg" alt="Clover" />
//             109
//           </CloverCount>
//         </RankingBox>
//         <RankingBox>
//           <RankText>5</RankText>
//           <ProfileImage src="/clover-profile.png" alt="Profile" />
//           <Info>
//             <Nickname>메롱</Nickname>
//           </Info>
//           <CloverCount>
//             <CloverImage src="/clover-logo.svg" alt="Clover" />
//             101
//           </CloverCount>
//         </RankingBox>
//         <RankingBox>
//           <RankText>6</RankText>
//           <ProfileImage src="/clover-profile.png" alt="Profile" />
//           <Info>
//             <Nickname>히히</Nickname>
//           </Info>
//           <CloverCount>
//             <CloverImage src="/clover-logo.svg" alt="Clover" />
//             98
//           </CloverCount>
//         </RankingBox>
//       </RankingList>
//       <BottomNav></BottomNav>
//     </Container>
//   );
// }

// export default RankingPage;

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   margin-top: 20px;
//   padding-left: 10px;
// `;

// const TitleWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 10px;
// `;

// const Title = styled.h1`
//   font-family: "Inter", sans-serif;
//   font-size: 20px;
//   font-weight: 600;
//   color: #000;
//   margin-left: 10px;
// `;

// const Line = styled.div`
//   width: 98%;
//   height: 2px;
//   background-color: #000; /* 회색으로 변경 */
// `;

// const MyRankingBox = styled.div`
//   display: flex;
//   align-items: center;
//   width: 98%;
//   padding: 25px; /* 높이를 높이기 위해 padding을 증가 */
//   margin-top: 20px;
//   background-color: #ffffff;
//   border: 2px solid #54a300;
//   border-radius: 30px;
// `;

// const RankingList = styled.div`
//   width: 100%;
//   height: 550px; /* 높이를 제한하여 스크롤 가능하게 설정 */
//   overflow-y: scroll;
//   margin-top: 20px;
// `;

// const RankingBox = styled.div`
//   display: flex;
//   align-items: center;
//   width: 98%;
//   padding: 20px 0; /* 높이를 높이기 위해 padding을 증가 */
//   border-bottom: 2px solid #dcdcdc; /* 아래 구분선 */
// `;

// const RankText = styled.div`
//   font-family: "Inter", sans-serif;
//   font-size: 30px;
//   font-weight: 900;
//   color: #000;
//   margin-left: 10px;
//   margin-right: 15px; /* 이미지와 간격 조절 */
// `;

// const ProfileImage = styled.img`
//   width: 75px;
//   height: 70px;
//   border-radius: 50%;
// `;

// const Info = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-left: 20px;
//   flex: 1; /* Info 컴포넌트가 남은 공간을 차지하게 함 */
// `;

// const Nickname = styled.div`
//   font-family: "Inter", sans-serif;
//   font-size: 20px;
//   font-weight: 500;
//   color: #000;
//   margin-top: 2px;
// `;

// const CloverCount = styled.div`
//   display: flex;
//   align-items: center;
//   font-family: "Inter", sans-serif;
//   font-size: 18px;
//   font-weight: 500;
//   color: #000;
//   margin-left: auto; /* 오른쪽 끝으로 정렬 */
//   margin-right: 10px;
// `;

// const CloverImage = styled.img`
//   width: 20px;
//   height: 20px;
//   margin-right: 5px; /* 텍스트와 이미지 사이 간격 */
// `;
