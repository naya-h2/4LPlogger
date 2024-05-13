import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";

function SettingPage() {
  const [nickname, setNickname] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handleSave = () => {
    const confirmed = window.confirm("변경된 내용을 저장하고 홈으로 이동하시겠습니까?");
    if (confirmed) {
      // 저장 처리 로직을 추가하거나, 여기서 값을 저장하면 됩니다.

      // 홈으로 이동
      window.location.href = "http://localhost:3000/";
    }
  };

  return (
    <div>
      <CloverProfileImage src="/clover-profile.png" alt="Clover Profile" />

      <div style={{ marginTop: "20px" }}>
        <Label htmlFor="nicknameInput">닉네임</Label>
        <Input type="text" id="nicknameInput" placeholder="닉네임을 입력하세요." value={nickname} onChange={handleChange} />
        <Label style={{ color: "#bebebe", fontWeight: "normal", fontSize: "14px" }}>닉네임은 10글자 이하로 설정해주세요.</Label>
        <Button onClick={handleSave}>저장하기</Button>
      </div>
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

export default SettingPage;
