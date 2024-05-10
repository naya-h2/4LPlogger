import React, { ReactNode } from "react";
import styled, { css } from "styled-components";

interface Props {
  children: ReactNode;
  titleText: string;
  btnText: string;
  disabled?: boolean;
  btnClickFunc?: () => void;
}

/**
 * 페이지 타이틀 & BottomButton Layout
 */
function BottomBtnLayout({ children, titleText, btnText, disabled = false, btnClickFunc }: Props) {
  return (
    <Container>
      <ContentWrapper>
        <Title>{titleText}</Title>
        {children}
      </ContentWrapper>
      <BottomButton disabled={disabled} $disabled={disabled} onClick={btnClickFunc}>
        {btnText}
      </BottomButton>
    </Container>
  );
}

export default BottomBtnLayout;

const Container = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.div`
  padding-top: 32px;

  text-align: center;
  font-size: 24px;
  font-weight: 700;
`;
const disabledButton = css`
  background-color: #d9d9d9;
  cursor: not-allowed;

  &:hover {
    background-color: #d9d9d9;
  }
`;

const BottomButton = styled.button<{ $disabled: boolean }>`
  ${({ $disabled }) => ($disabled ? disabledButton : null)};
`;
