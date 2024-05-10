import BottomBtnLayout from "pages/BottomBtnLayout";
import { useState } from "react";
import styled from "styled-components";

const DEFAULT_GOAL = ["1km", "2km", "3km", "직접 입력"];

function GoalPage() {
  const [selectedGoal, setSelectedGoal] = useState("");

  return (
    <BottomBtnLayout titleText="목표를 설정하세요🔥" btnText="뛰러가기" disabled={selectedGoal === ""}>
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
    </BottomBtnLayout>
  );
}

export default GoalPage;

const Button = styled.button<{ $selected: boolean }>`
  width: 20%;
  padding: 12px 0px;

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
