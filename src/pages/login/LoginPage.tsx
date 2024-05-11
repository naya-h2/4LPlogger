import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom"; // Link 추가
import styled from "styled-components";

const { Kakao } = window;

function LoginPage() {
  const loginWithKakao = () => {
    Kakao.Auth.authorize({
      redirectUri: `${process.env.REACT_APP_FRONTEND_BASE_URL}/login/oauth`,
      scope: "profile_nickname",
    });
  };

  return (
    <Container>
      {/* Logo 이미지 */}
      <LogoLetterImage src={"/logo-letter.svg"} alt="Logo Letter" />
      {/* Clover Logo 이미지 */}
      <CloverLogoImage src="/clover-logo.svg" alt="Logo Run" />
      {/* Letter Login 이미지 */}
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

// 스타일링된 컨테이너 및 링크
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin-top: 20px;
`;

// 이미지 스타일링
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
  margin-bottom: 70px;
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

// 링크 스타일링
const SignupLink = styled(Link)`
  text-decoration: none;
`;

const SignupText = styled.span`
  color: #54a300; /* 회원가입 텍스트 색상 */
  border-bottom: 1px solid transparent;
  cursor: pointer;
  transition: border-bottom 0.3s ease; /* 밑줄 효과를 위한 transition */

  &:hover {
    border-bottom: 1px solid #54a300; /* 호버 시 밑줄 효과 추가 */
  }
`;

export default LoginPage;
