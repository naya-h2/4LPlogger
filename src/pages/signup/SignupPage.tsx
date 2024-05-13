import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// 스타일드 컴포넌트 정의
const CloverLogoImage = styled.img`
  width: auto;
  height: 100px;
  margin-top: 50px;
  margin-left: 50px;
`;

const LogoLetterImage = styled.img`
  width: 260px;
  height: auto;
  margin-top: 200px;
  margin-bottom: 5px;
`;

const SignupLetterImage = styled.img`
  width: 260px;
  height: auto;
  margin-left: 100px;
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

// 링크 스타일링
const LoginLink = styled(Link)`
  text-decoration: none;
  display: block;
  margin-left: 120px;
  margin-top: 30px; /* 버튼과 간격 조절 */
`;

const LoginText = styled.span`
  color: #54a300; /* 회원가입 텍스트 색상 */
  border-bottom: 1px solid transparent;
  cursor: pointer;
  transition: border-bottom 0.3s ease; /* 밑줄 효과를 위한 transition */

  &:hover {
    border-bottom: 1px solid #54a300; /* 호버 시 밑줄 효과 추가 */
  }
`;

interface SignupPageProps {
  setNickname: React.Dispatch<React.SetStateAction<string>>;
}

const SignupPage: React.FC<SignupPageProps> = ({ setNickname }) => {
  const [nickname, setNicknameLocal] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNicknameLocal(event.target.value);
    setNickname(event.target.value);
  };
  const handleSignup = () => {
    console.log("가입 버튼 클릭됨:", nickname);
    // 가입 처리 로직을 추가하거나, 여기서 값을 저장하면 됩니다.

    // 페이지 이동
    window.location.href = "http://localhost:3000/";
  };

  return (
    <div>
      <CloverLogoImage src="/clover-logo.svg" alt="Clover Logo" />
      <LogoLetterImage src="/logo-letter.svg" alt="Letter Logo" />
      <SignupLetterImage src="/letter-signup.png" alt="Login Letter" />

      <div style={{ marginTop: "20px" }}>
        <Label htmlFor="nicknameInput">닉네임</Label>
        <Input type="text" id="nicknameInput" placeholder="닉네임을 입력하세요." value={nickname} onChange={handleChange} />
        <Label style={{ color: "#bebebe", fontWeight: "normal", fontSize: "14px" }}>닉네임은 10글자 이하로 설정해주세요.</Label>
        <Button onClick={handleSignup}>가입하기</Button>
        <LoginLink to="/login">
          <span>이미 가입하셨나요? </span>
          <LoginText>로그인 하기</LoginText>
        </LoginLink>
      </div>
    </div>
  );
};

export default SignupPage;
