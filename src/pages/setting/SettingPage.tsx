import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";

function SettingPage() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [isChangingNickname, setIsChangingNickname] = useState(true); // True for changing nickname

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isChangingNickname) {
      setNickname(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };

  const handleSave = async () => {
    const data = isChangingNickname ? { nickname } : { password };

    try {
      const response = await fetch("http://localhost:8080/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("데이터 저장 성공");
        // Add logic here if needed after successful save
      } else {
        console.error("데이터 저장 실패");
        // Add error handling logic here
      }
    } catch (error) {
      console.error("데이터 저장 에러:", error);
      // Add error handling logic here
    }
  };

  return (
    <div>
      <CloverProfileImage src="/clover-profile.png" alt="Clover Profile" />

      <div style={{ marginTop: "20px" }}>
        <Label htmlFor="inputField">{isChangingNickname ? "닉네임" : "비밀번호"}</Label>
        <Input
          type={isChangingNickname ? "text" : "password"}
          id="inputField"
          placeholder={isChangingNickname ? "닉네임을 입력하세요." : "비밀번호를 입력하세요."}
          value={isChangingNickname ? nickname : password}
          onChange={handleChange}
        />
        <Label style={{ color: "#bebebe", fontWeight: "normal", fontSize: "14px" }}>
          {isChangingNickname ? "닉네임은 10글자 이하로 설정해주세요." : "비밀번호는 6글자 이상으로 설정해주세요."}
        </Label>
        <Button onClick={handleSave}>저장하기</Button>
      </div>

      {/* Toggle button moved below the main content */}
      <ToggleButton onClick={() => setIsChangingNickname(!isChangingNickname)}>{isChangingNickname ? "비밀번호 변경하기" : "닉네임 변경하기"}</ToggleButton>
    </div>
  );
}

const CloverProfileImage = styled.img`
  width: auto;
  height: 150px;
  margin-top: 150px;
  margin-left: 140px;
  margin-bottom: 80px;
`;

const Label = styled.label`
  display: block;
  margin-top: 10px;
  margin-left: 30px;
  color: #000000;
  font-weight: bold;
`;

const Input = styled.input`
  width: 400px;
  height: 60px; /* 원하는 높이로 조절하세요 */
  margin-top: 5px;
  margin-left: 30px;
  padding: 5px;
  border: 1px solid #bebebe;
  background-color: #ffffff;
  font-size: 16px;
`;

const Button = styled.button`
  width: 400px;
  height: 60px;
  margin-top: 50px;
  margin-left: 30px;
  background-color: #54a300;
  color: #ffffff;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
`;

const ToggleButton = styled.button`
  margin-top: 20px;
  margin-left: 30px;
  cursor: pointer;
  font-size: 16px;
  color: #54a300;
  border: none;
  background: none;
  text-decoration: underline;
`;

export default SettingPage;
