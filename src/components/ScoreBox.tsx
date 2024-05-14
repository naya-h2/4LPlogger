import styled from "styled-components";

interface Props {
  category: string;
  value: string;
  isSmall?: boolean;
}

function ScoreBox({ category, value, isSmall = false }: Props) {
  return (
    <ResultBox>
      <Category>{category}</Category>
      <Value $isSmall={isSmall}>{value}</Value>
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

const Value = styled.div<{ $isSmall: boolean }>`
  color: #54a300;

  text-align: center;
  font-size: ${({ $isSmall }) => ($isSmall ? "20px" : "24px")};
  font-weight: 700;
`;
