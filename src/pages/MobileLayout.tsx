import BottomNav from "components/BottomNav";
import Header from "components/Header";
import { IS_HEADER } from "constants/layout";
import { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
}

function MobileLayout({ children }: Props) {
  return (
    <Container>
      {IS_HEADER.includes(window.location.pathname.toLocaleLowerCase()) && <Header />}
      {children}
    </Container>
  );
}

export default MobileLayout;

const Container = styled.div`
  width: 100%;
  min-width: 320px;
  height: 100vh; /* Ensures the container height fills the entire screen height */
  min-height: 100vh; /* Ensures the container height fills the entire screen height */
  padding-top: 48px;

  position: relative;

  background-color: #f4ffe9;
  box-shadow: 0 5px 5px 5px rgba(64, 60, 67, 0.16);

  @media (min-width: 480px) {
    margin: 0 auto;
    width: 480px;
  }
`;
