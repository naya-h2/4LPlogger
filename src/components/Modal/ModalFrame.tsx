import styled from "styled-components";
import ModalPortal from "./ModalPortal";
import useNotScroll from "hooks/useNotScroll";
import { ReactNode } from "react";

interface Props {
  hideModal: any;
  children: ReactNode;
}

function ModalFrame({ hideModal, children }: Props) {
  useNotScroll();

  return (
    <ModalPortal>
      <Mask onClick={hideModal} />
      <Body>{children}</Body>
    </ModalPortal>
  );
}

export default ModalFrame;

const Mask = styled.div`
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  background-color: black;
  opacity: 0.4;
  z-index: 50;
`;

const Body = styled.div`
  width: 239px;
  height: 155px;
  padding: 16px 20px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  border-radius: 10px;
  background: #fff;
  box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.15);

  z-index: 100;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  color: #777;
  text-align: center;
  font-size: 11px;
`;
