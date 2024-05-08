import { ReactNode } from "react";
import styled from "styled-components";

interface Props {
  children: ReactNode;
}

function MobileLayout({ children }: Props) {
  return (
    <Background>
      <Container>{children}</Container>
    </Background>
  );
}

export default MobileLayout;

const Container = styled.div`
  width: 100%;
  max-width: 480px;
  min-width: 320px;
  height: 100vh;

  background-color: #f4ffe9;
  box-shadow: 0 5px 5px 5px rgba(64, 60, 67, 0.16);
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
`;
