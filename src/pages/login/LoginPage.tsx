import React, { useState } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import styled from "styled-components";

function LoginPage() {
  const loginWithKakao = () => {
    Kakao.Auth.authorize({
      redirectUri: `${process.env.REACT_APP_FRONTEND_BASE_URL}/login/oauth`,
      scope: "profile_nickname",
    });
  };

  return (
    <Container>
      <LogoLetterImage src={"/logo-letter.svg"} alt="Logo Letter" />
      <CloverLogoImage src="/clover-logo.svg" alt="Logo Run" />
      <LetterLoginImage src="/letter-login.png" alt="Letter Login" />

      {/* 카카오 로그인 버튼 */}
      <LoginButtonImage src="/kakao_login_large_wide.png" alt="카카오 로그인" onClick={loginWithKakao} />

      {/* "회원이 아니신가요? 회원가입 하기" 링크 */}
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

const LoginButtonImage = styled(Image)`
  width: 400px;
  height: 60px;
  cursor: pointer;
  transition: filter 0.3s ease-in-out;

  &:hover {
    filter: brightness(90%);
  }

  &:active {
    filter: brightness(90%);
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
