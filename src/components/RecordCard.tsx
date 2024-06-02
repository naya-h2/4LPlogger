import styled from "styled-components";
import ScoreBox from "./ScoreBox";

interface Props {
  data: {
    date: string;
    goalDistance: number;
    distance: number;
    time: string;
    imgSrc?: string;
  };
}

function RecordCard({ data }: Props) {
  return (
    <Container>
      {data.date}
      <ScoreWrapper>
        <ScoreBox category="목표(km)" value={`${data.goalDistance}`} isSmall />
        <ScoreBox category="km" value={`${data.distance}`} isSmall />
        <ScoreBox category="시간" value={data.time} isSmall />
      </ScoreWrapper>
    </Container>
  );
}

export default RecordCard;

const Container = styled.div`
  width: 100%;
  height: 88px;
  padding: 5px 10px;

  color: #c4c4c4;
  font-size: 12px;

  border-radius: 10px;
  border: 1px solid #d9d9d9;
  background: #fff;
  box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ScoreWrapper = styled.div`
  display: flex;
`;
