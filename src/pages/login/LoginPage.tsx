import React, { useState } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import styled from "styled-components";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // 로그인 성공
        console.log("로그인 성공");
        window.location.href = "/";
      } else {
        // 로그인 실패
        console.error("로그인 실패");
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  return (
    <Container>
      <LogoLetterImage src={"/logo-letter.svg"} alt="Logo Letter" />
      <CloverLogoImage src="/clover-logo.svg" alt="Logo Run" />
      <LetterLoginImage src="/letter-login.png" alt="Letter Login" />

      <form onSubmit={handleSubmit}>
        <InputContainer>
          <input type="email" placeholder="이메일" value={email} onChange={handleEmailChange} />
        </InputContainer>
        <InputContainer>
          <input type="password" placeholder="비밀번호" value={password} onChange={handlePasswordChange} />
        </InputContainer>
        <Button type="submit">로그인</Button>
      </form>

      <SignupLink to="/signup">
        <span>회원이 아니신가요? </span>
        <SignupText>회원가입 하기</SignupText>
      </SignupLink>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin-top: 20px;
`;

const Image = styled.img`
  margin-bottom: 30px;
`;

const LogoLetterImage = styled(Image)`
  width: 260px;
  height: auto;
  margin-top: 0px;
  margin-bottom: 30px;
`;

const CloverLogoImage = styled(Image)`
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
`;

const LetterLoginImage = styled(Image)`
  width: 300px;
  height: 75px;
  margin-bottom: 30px;
`;

const InputContainer = styled.div`
  margin-bottom: 1px;

  input {
    width: 400px;
    height: 50px;
    margin-bottom: 10px;
    padding: 10px;
    font-size: 16px;
  }
`;

const SignupLink = styled(Link)`
  text-decoration: none;
`;

const SignupText = styled.span`
  color: #54a300;
  border-bottom: 1px solid transparent;
  cursor: pointer;
  transition: border-bottom 0.3s ease;

  &:hover {
    border-bottom: 1px solid #54a300;
  }
`;

const Button = styled.button`
  width: 400px;
  height: 60px;
  background-color: #54a300;
  color: #ffffff;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 15px;
`;

export default LoginPage;
