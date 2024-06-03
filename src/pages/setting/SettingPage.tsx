import BottomNav from "components/BottomNav";
import { useState, ChangeEvent, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AuthContext from "api/auth-context";
import { useCheckLogin } from "hooks/useCheckLogin";

function SettingPage() {
  useCheckLogin();

  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [isChangingNickname, setIsChangingNickname] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isChangingNickname) {
      setNickname(event.target.value);
    } else {
      if (event.target.name === "currentPassword") {
        setCurrentPassword(event.target.value);
      } else {
        setPassword(event.target.value);
      }
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    if (isChangingNickname) {
      await authCtx.changeNickname(nickname);
      if (authCtx.isSuccess) {
        alert("닉네임이 변경되었습니다.");
        await authCtx.getUser();
        navigate("/");
      }
    } else {
      await authCtx.changePassword(currentPassword, password);
      if (authCtx.isSuccess) {
        alert("비밀번호가 변경되었습니다. 다시 로그인하세요.");
        authCtx.logout();
        navigate("/");
      }
    }
    setIsLoading(false);
  };

  const handleConfirmSave = () => {
    const confirmed = window.confirm("변경된 내용을 저장하고 홈으로 이동하시겠습니까?");
    if (confirmed) {
      handleSave();
    }
  };

  return (
    <Container>
      <CloverProfileImage src="/clover-profile.png" alt="Clover Profile" />
      <ToggleButton onClick={() => setIsChangingNickname(!isChangingNickname)}>{isChangingNickname ? "비밀번호 변경하기" : "닉네임 변경하기"}</ToggleButton>
      <FormContainer>
        {!isChangingNickname && (
          <>
            <Label htmlFor="currentPassword">현재 비밀번호</Label>
            <Input type="password" id="currentPassword" name="currentPassword" placeholder="현재 비밀번호를 입력하세요." value={currentPassword} onChange={handleChange} />
          </>
        )}
        <Label htmlFor="inputField">{isChangingNickname ? "닉네임" : "새 비밀번호"}</Label>
        <Input
          type={isChangingNickname ? "text" : "password"}
          id="inputField"
          placeholder={isChangingNickname ? "닉네임을 입력하세요." : "새 비밀번호를 입력하세요."}
          value={isChangingNickname ? nickname : password}
          onChange={handleChange}
        />
        <Label style={{ color: "#bebebe", fontWeight: "normal", fontSize: "14px" }}>
          {isChangingNickname ? "닉네임은 10글자 이하로 설정해주세요." : "비밀번호는 6글자 이상으로 설정해주세요."}
        </Label>
        <Button onClick={handleConfirmSave} disabled={isLoading}>
          {isLoading ? "저장 중..." : "저장하기"}
        </Button>
      </FormContainer>
      <BottomNav />
    </Container>
  );
}

const Container = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 16px;
  justify-content: center;
  align-items: center;
`;

const CloverProfileImage = styled.img`
  width: auto;
  height: 150px;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 0 16px;
  box-sizing: border-box;
`;

const Label = styled.label`
  display: block;
  margin-top: 20px;
  color: #000000;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  height: 60px;
  margin-top: 5px;
  padding: 10px;
  border: 1px solid #bebebe;
  background-color: #ffffff;
  font-size: 16px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  height: 60px;
  margin-top: 50px;
  background-color: #54a300;
  color: #ffffff;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
`;

const ToggleButton = styled.button`
  width: 200px;
  height: 45px;
  cursor: pointer;
  font-size: 16px;
  color: #54a300;
  border: 2px solid #d9d9d9;
  background-color: #ffffff;
  border-radius: 30px;
  padding: 10px 20px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f2f2f2;
  }
`;

export default SettingPage;
