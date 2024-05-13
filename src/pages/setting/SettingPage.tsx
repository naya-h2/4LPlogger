import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface SettingPageProps {
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
}

function SettingPage({ nickname }: SettingPageProps) {
  return (
    <div>
      <CloverProfileImage src="/clover-profile.png" alt="Clover Profile" />

      <div style={{ marginTop: "20px" }}>
        <Label htmlFor="nicknameInput">닉네임</Label>
        <Input type="text" id="nicknameInput" placeholder="닉네임을 입력하세요." value={nickname} />
        <Label style={{ color: "#bebebe", fontWeight: "normal", fontSize: "14px" }}>닉네임은 10글자 이하로 설정해주세요.</Label>
        <Button>저장하기</Button>
      </div>
    </div>
  );
}

const CloverProfileImage = styled.img`
  width: auto;
  height: 100px;
  margin-top: 50px;
  margin-left: 50px;
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
