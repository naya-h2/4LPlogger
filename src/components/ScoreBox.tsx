import styled from "styled-components";

interface Props {
  category: string;
  value: string;
}

function ScoreBox({ category, value }: Props) {
  return (
    <ResultBox>
      <Category>{category}</Category>
      <Value>{value}</Value>
    </ResultBox>
  );
}

export default ScoreBox;

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
