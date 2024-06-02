import { useCheckLogin } from "hooks/useCheckLogin";
import BottomBtnLayout from "pages/BottomBtnLayout";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const DEFAULT_GOAL = ["1km", "2km", "3km", "직접 입력"];

function GoalPage() {
  const navigate = useNavigate();
  const [selectedGoal, setSelectedGoal] = useState("");
  const {
    register,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const { customGoal } = watch();

  const goalRegex = /^[0-9]*$/;

  useCheckLogin();

  const saveGoal = () => {
    const value = selectedGoal === "직접 입력" ? customGoal : selectedGoal.replace("km", "");
    window.localStorage.setItem("goal", value);
    navigate("/plogging");
  };

  return (
    <BottomBtnLayout
      titleText="목표를 설정하세요🔥"
      btnText="뛰러가기"
      disabled={selectedGoal === "" || Boolean(selectedGoal === "직접 입력" && (errors.customGoal || !customGoal))}
      btnClickFunc={saveGoal}
    >
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
          <input {...register("customGoal", { required: "값을 입력해 주세요.", pattern: goalRegex })} placeholder="자연수로 입력해 주세요. (ex. 5)" />
          <ErrorMsg>{errors.customGoal && "자연수로 입력해 주세요."}</ErrorMsg>
        </InputContainer>
      )}
    </BottomBtnLayout>
  );
}

export default GoalPage;

const Button = styled.button<{ $selected: boolean }>`
  padding: 12px 0px;
  height: 56px;

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
  margin-top: 32px;

  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  font-size: 16px;
`;

const ErrorMsg = styled.div`
  color: red;
`;
