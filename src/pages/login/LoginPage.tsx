import React, { useState, useContext } from "react";
import { BrowserRouter, Route, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../../store/auth-context";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      await authCtx.login(email, password);
      if (authCtx.isSuccess) {
        navigate("/", { replace: true });
      } else {
        console.error("로그인 실패");
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("에러 발생:", error);
      alert("로그인 중 에러가 발생했습니다. 다시 시도해주세요.");
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <LogoLetterImage src={"/logo-letter.svg"} alt="Logo Letter" />
      <CloverLogoImage src="/clover-logo.svg" alt="Logo Run" />
      <LetterLoginImage src="/letter-login.png" alt="Letter Login" />

      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <input type="email" placeholder=" 이메일" value={email} onChange={handleEmailChange} />
        </InputContainer>
        <InputContainer>
          <input type="password" placeholder=" 비밀번호" value={password} onChange={handlePasswordChange} />
        </InputContainer>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "로그인 중..." : "로그인"}
        </Button>
      </Form>

      <SignupLink to="/signup">
        <span>회원이 아니신가요? </span>
        <SignupText>회원가입 하기</SignupText>
      </SignupLink>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 16px;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  margin-bottom: 30px;
`;

const Form = styled.form`
  width: 100%;
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
    width: 100%;
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
  width: 100%;
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
