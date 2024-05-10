import ScoreBox from "components/ScoreBox";
import BottomBtnLayout from "pages/BottomBtnLayout";
import styled from "styled-components";
import runCloverIcon from "assets/icon/logo-run.svg";
import ProgressBar from "components/ProgressBar";

function ScorePage() {
  const goal = 5.0;
  const km = 3.3345;

  return (
    <BottomBtnLayout titleText="플로깅을 분석할게요📝" btnText="확인">
      <Card>
        오늘의 플로깅 점수는요 ...🤔
        <ResultWrapper>
          <ScoreBox category="목표" value={`${goal.toFixed(4)}`} />
          <ScoreBox category="km" value={`${km.toFixed(4)}`} />
        </ResultWrapper>
        <CloverIcon src={runCloverIcon} />
        <ProgressBar ratio={(km / goal) * 100} />
        <ScoreWrapper>{`${Math.round((km / goal) * 100)} 점`}</ScoreWrapper>
      </Card>
    </BottomBtnLayout>
  );
}

export default ScorePage;

const Card = styled.div`
  width: 100%;
  padding: 16px;

  border-radius: 16px;
  border: 1px solid #d9d9d9;
  background-color: white;

  color: #979797;
  font-size: 14px;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ResultWrapper = styled.div`
  display: flex;
  padding: 12px 0;
`;

const CloverIcon = styled.img`
  width: 100%;
  height: 138px;
  margin: 24px 0;
`;

const ScoreWrapper = styled.div`
  color: #000;
  padding-top: 14px;
  margin-top: 20px;

  text-align: center;
  font-size: 32px;
  font-weight: 700;

  border-top: 1px solid #d9d9d9;
`;
