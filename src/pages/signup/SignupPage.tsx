import React, { useState, ChangeEvent, useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "api/auth-context";

function SignupPage() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

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
    setIsLoading(true); // 로딩 시작
    try {
      await authCtx.signup(email, password, nickname);

      if (authCtx.isSuccess) {
        navigate("/", { replace: true });
      }
    } catch (error) {
      // console.error("가입 오류:", error);
      // 오류 처리 로직 추가
    }
    setIsLoading(false); // 로딩 종료
  };

  return (
    <Container>
      <Image>
        <LogoContainer>
          <CloverLogoImage src="/clover-logo.svg" alt="Clover Logo" />
          <LogoLetterImage src="/logo-letter.svg" alt="Letter Logo" />
        </LogoContainer>
        <SignupLetterImage src="/letter-signup.png" alt="Login Letter" />
      </Image>
      <Form>
        <Label htmlFor="emailInput">이메일</Label>
        <Input type="email" id="emailInput" name="email" placeholder="이메일을 입력하세요." value={email} onChange={handleChange} />
        <Label htmlFor="passwordInput">비밀번호</Label>
        <Input type="password" id="passwordInput" name="password" placeholder="비밀번호를 입력하세요." value={password} onChange={handleChange} />
        <Label htmlFor="nicknameInput">닉네임</Label>
        <Input type="text" id="nicknameInput" name="nickname" placeholder="닉네임을 입력하세요." value={nickname} onChange={handleChange} />
        <Label
          style={{
            marginTop: "3px",
            color: "#bebebe",
            fontWeight: "normal",
            fontSize: "14px",
          }}
        >
          닉네임은 10글자 이하로 설정해주세요.
        </Label>
        <Button onClick={handleSignup} disabled={isLoading}>
          {isLoading ? "가입 중..." : "가입하기"}
        </Button>
        <LoginLink to="/login">
          <span>이미 가입하셨나요? </span>
          <LoginText>로그인 하기</LoginText>
        </LoginLink>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const Form = styled.div`
  width: 100%;
  max-width: 400px; /* 최대 너비 설정 */
  margin-top: 10px;
`;

const Image = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  padding: 16px;
  justify-content: center;
`;

const LogoContainer = styled.div`
  display: flex;
  gap: 24px;
`;

const CloverLogoImage = styled.img`
  width: auto;
  height: 100px;
`;

const LogoLetterImage = styled.img`
  width: 260px;
  height: auto;
`;

const SignupLetterImage = styled.img`
  width: 260px;
  height: auto;
`;

const Label = styled.label`
  display: block;
  margin-top: 20px;
  margin-left: 5px;
  color: #000000;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  height: 60px; /* 원하는 높이로 조절하세요 */
  margin-top: 5px;
  border: 1px solid #bebebe;
  background-color: #ffffff;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  height: 60px;
  margin-top: 43px;
  background-color: #54a300;
  color: #ffffff;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
`;

const LoginLink = styled(Link)`
  text-decoration: none;
  display: block;
  margin-top: 20px; /* 버튼과 간격 조절 */
  text-align: center;
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
