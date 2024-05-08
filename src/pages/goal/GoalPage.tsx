import { useState } from "react";
import styled, { css } from "styled-components";

const DEFAULT_GOAL = ["1km", "2km", "3km", "직접 입력"];

function GoalPage() {
  const [selectedGoal, setSelectedGoal] = useState("");

  return (
    <>
      <Container>
        <ContentWrapper>
          <Title>목표를 설정하세요🔥</Title>
          <ButtonContainer>
            {DEFAULT_GOAL.map((goal) => (
              <Button key={goal} onClick={() => setSelectedGoal(goal)} $selected={selectedGoal === goal}>
                {goal}
              </Button>
            ))}
          </ButtonContainer>
          {selectedGoal === DEFAULT_GOAL[3] && (
            <InputContainer>
              <label>{`${DEFAULT_GOAL[3]} (km)`}</label>
              <input placeholder="1.234" />
            </InputContainer>
          )}
        </ContentWrapper>
        <BottomButton disabled={selectedGoal === ""} $disabled={selectedGoal === ""}>
          뛰러가기
        </BottomButton>
      </Container>
    </>
  );
}

export default GoalPage;

const Container = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
const Title = styled.div`
  padding-top: 32px;

  text-align: center;
  font-size: 24px;
  font-weight: 700;
`;

const Button = styled.button<{ $selected: boolean }>`
  width: 20%;
  padding: 12px 8px;

  font-size: 14px;
  font-weight: 400;

  border: 1px solid #54a300;
  border-radius: 10px;
  background-color: ${({ $selected }) => ($selected ? "#54a300" : "white")};
  color: ${({ $selected }) => ($selected ? "white" : "black")};

  &:hover {
    background-color: ${({ $selected }) => ($selected ? "#54a300" : "#dbffb680")};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  font-size: 14px;
`;

const disabledButton = css`
  background-color: #d9d9d9;
  cursor: not-allowed;
`;

const BottomButton = styled.button<{ $disabled: boolean }>`
  background-color: ${({ $disabled }) => ($disabled ? "#D9D9D9" : null)};
`;
