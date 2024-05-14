import styled from "styled-components";
import logoIcon from "../../assets/icon/logo-together.svg";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <Container>
      <Logo src={logoIcon} alt="네잎플로거 로고" onClick={() => navigate("/")} />
      <Profile />
    </Container>
  );
}

export default Header;

const Container = styled.div`
  height: 48px;
  width: 100%;
  /* max-width: 480px; */
  min-width: 320px;
  padding: 6px 14px;

  background-color: white;
  color: #4e4e4e;

  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  cursor: pointer;
`;
