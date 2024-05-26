import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const BottomNav: React.FC = () => {
  const location = useLocation();
  const [activeNav, setActiveNav] = useState<number>(1);

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setActiveNav(1);
        break;
      case "/ranking":
        setActiveNav(2);
        break;
      case "/calendar":
        setActiveNav(3);
        break;
      case "/setting":
        setActiveNav(4);
        break;
      case "/goal":
        setActiveNav(5);
        break;
      default:
        setActiveNav(1);
        break;
    }
  }, [location.pathname]);

  return (
    <Wrapper>
      <NavLink to="/" onClick={() => setActiveNav(1)}>
        <ButtonContainer>
          <NavItem src="/nav-home.svg" alt="Home" active={activeNav === 1 ? "true" : "false"} />
          <NavText active={activeNav === 1}>홈</NavText>
        </ButtonContainer>
      </NavLink>
      <NavLink to="/ranking" onClick={() => setActiveNav(2)}>
        <ButtonContainer>
          <NavItem src="/nav-rank.svg" alt="Rank" active={activeNav === 2 ? "true" : "false"} />
          <NavText active={activeNav === 2}>랭킹</NavText>
        </ButtonContainer>
      </NavLink>
      <RunButtonLink to="/goal" onClick={() => setActiveNav(5)}>
        <RunButtonContainer>
          <RunButton src="/RunButton.png" alt="Goal" active={activeNav === 5 ? "true" : "false"} />
        </RunButtonContainer>
      </RunButtonLink>
      <NavLink to="/calendar" onClick={() => setActiveNav(3)}>
        <ButtonContainer>
          <NavItem src="/nav-calendar.svg" alt="Calendar" active={activeNav === 3 ? "true" : "false"} />
          <NavText active={activeNav === 3}>내 기록</NavText>
        </ButtonContainer>
      </NavLink>
      <NavLink to="/setting" onClick={() => setActiveNav(4)}>
        <ButtonContainer>
          <NavItem src="/nav-info.svg" alt="Info" active={activeNav === 4 ? "true" : "false"} />
          <NavText active={activeNav === 4}>내 정보</NavText>
        </ButtonContainer>
      </NavLink>
    </Wrapper>
  );
};

// Styled components
const Wrapper = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px; /* Increased height for more spacing */
  overflow: visible;
  border-top: 1px solid #d9d9d9;
  background-color: #ffffff; /* Background color set to white */
  display: flex; /* Use flexbox to distribute items evenly */
  justify-content: space-between;
  align-items: center;
`;

const NavLink = styled(Link)`
  text-align: center;
  height: 100%; /* Adjusted to fill the height of the Wrapper */
  text-decoration: none; /* Remove underline from links */
  flex: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  justify-content: center; /* Center align items vertically */
  height: 100%; /* Fill the height of the NavLink */
`;

const RunButtonLink = styled(Link)`
  position: relative;
  top: -30px; /* Move the button up to stick out of the wrapper */
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RunButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const RunButton = styled.img<{ active: string }>`
  width: 100px; /* Increased size */
  height: 100px; /* Increased size */
  filter: ${({ active }) => (active === "true" ? "brightness(0.9)" : "brightness(1)")}; /* Adjust brightness */
  border: 3px solid #54a300;
  background-color: #ffffff;
  border-radius: 50%;
`;

const NavItem = styled.img<{ active: string }>`
  filter: ${({ active }) =>
    active === "true"
      ? "invert(38%) sepia(89%) saturate(530%) hue-rotate(85deg) brightness(92%) contrast(92%)"
      : "invert(46%) sepia(0%) saturate(0%) hue-rotate(3deg) brightness(95%) contrast(89%)"};
  width: 24px;
  height: 24px;
`;

const NavText = styled.span<{ active: boolean }>`
  color: ${({ active }) => (active ? "#54A300" : "#777777")}; /* Change color based on active state */
  font-size: 18px;
  text-decoration: none; /* Ensure no underline */
`;

export default BottomNav;
