import React, { useState } from "react";
import styled from "styled-components";

const DEFAULT_GOAL = ["1km", "2km", "3km", "직접 설정"];

function GoalPage() {
  const [selectedGoal, setSelectedGoal] = useState("");

  return (
    <>
      <Title>목표를 설정하세요🔥</Title>
      {DEFAULT_GOAL.map((goal) => (
        <Button key={goal} onClick={() => setSelectedGoal(goal)} $selected={selectedGoal === goal}>
          {goal}
        </Button>
      ))}
    </>
  );
}

export default GoalPage;

const Title = styled.div`
  padding-top: 32px;

  text-align: center;
  font-size: 24px;
  font-weight: 700;
`;

const Button = styled.button<{ $selected: boolean }>`
  width: 64px;
  padding: 12px 8px;

  border: 1px solid #54a300;
  border-radius: 10px;
`;
