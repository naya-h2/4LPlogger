import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

function SignupPage() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "nickname") {
      setNickname(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:8080/signup", {
        nickname,
        email,
        password,
      });
      console.log("가입 성공:", response.data);
      window.location.href = "/";
      // 페이지 이동 또는 성공 메시지 처리 등
    } catch (error) {
      console.error("가입 오류:", error);
      // 오류 처리 로직 추가
    }
  };

  return (
    <div>
      <CloverLogoImage src="/clover-logo.svg" alt="Clover Logo" />
      <LogoLetterImage src="/logo-letter.svg" alt="Letter Logo" />
      <SignupLetterImage src="/letter-signup.png" alt="Login Letter" />

      <div style={{ marginTop: "10px" }}>
        {/* Email Input */}
        <Label htmlFor="emailInput">이메일</Label>
        <Input type="email" id="emailInput" name="email" placeholder="이메일을 입력하세요." value={email} onChange={handleChange} />
        {/* Password Input */}
        <Label htmlFor="passwordInput">비밀번호</Label>
        <Input type="password" id="passwordInput" name="password" placeholder="비밀번호를 입력하세요." value={password} onChange={handleChange} />
        {/* Nickname Input */}
        <Label htmlFor="nicknameInput">닉네임</Label>
        <Input type="text" id="nicknameInput" name="nickname" placeholder="닉네임을 입력하세요." value={nickname} onChange={handleChange} />
        <Label style={{ marginTop: "3px", color: "#bebebe", fontWeight: "normal", fontSize: "14px" }}>닉네임은 10글자 이하로 설정해주세요.</Label>
        <Button onClick={handleSignup}>가입하기</Button>
        <LoginLink to="/login">
          <span>이미 가입하셨나요? </span>
          <LoginText>로그인 하기</LoginText>
        </LoginLink>
      </div>
    </div>
  );
}

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
  margin-top: 20px;
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
  margin-top: 20px; /* 버튼과 간격 조절 */
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
export default SignupPage;
