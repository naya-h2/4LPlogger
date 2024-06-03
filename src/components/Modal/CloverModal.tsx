import React from "react";
import ModalFrame from "./ModalFrame";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface Props {
  hideModal: () => void;
  cloverCount: number;
}

function CloverModal({ hideModal, cloverCount }: Props) {
  const navigate = useNavigate();

  return (
    <ModalFrame hideModal={hideModal}>
      <Content>
        🍀
        <br />
        클로버가
        <br />총 <Clover>{cloverCount}</Clover>개<br />
        적립됐어요!
      </Content>
      <Button
        onClick={() => {
          hideModal();
          localStorage.removeItem("goal");
          localStorage.removeItem("ploggingResult");
          localStorage.removeItem("score");
          localStorage.removeItem("curCloverNum");
          navigate("/");
        }}
      >
        확인
      </Button>
    </ModalFrame>
  );
}

export default CloverModal;

const Clover = styled.span`
  color: #54a300;
  display: inline;
`;

const Content = styled.div`
  color: #000;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
`;

const Button = styled.button`
  height: 48px;
  padding: 8px 0;
  margin-top: 12px;

  color: #fff;
  font-size: 16px;
  font-weight: 400;
`;
