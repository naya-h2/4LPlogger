import AuthContext from "api/auth-context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Dropdown() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const handleLogout = () => {
    authCtx.logout();
    navigate("/login"); // 로그아웃 후 로그인 페이지로 리디렉션
  };

  return (
    <Box>
      <List onClick={() => navigate("/setting")}>내 정보</List>
      <List onClick={handleLogout}>로그아웃</List>
    </Box>
  );
}

export default Dropdown;

const Box = styled.div`
  width: 120px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.15);
  position: absolute;
  top: 50px;
  right: 0;
  overflow: hidden;
`;

const List = styled.div`
  width: 100%;
  padding: 6px 8px;
  cursor: pointer;
  &:hover {
    background-color: #dbffb680;
    color: #54a300;
  }
`;
