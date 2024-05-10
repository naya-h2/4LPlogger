import ModalFrame from "./ModalFrame";
import styled from "styled-components";

interface Props {
  hideModal: () => void;
}

function PloggingModal({ hideModal }: Props) {
  return (
    <ModalFrame hideModal={hideModal}>
      <Title>
        ⚠️
        <br />
        플로깅 인증 실패!
      </Title>
      플로깅 인증에 실패하면
      <br />
      클로버를 받을 수 없어요.
      <br />
      다시 인증할까요?
      <ButtonWrapper>
        <DeleteBtn onClick={hideModal}>취소</DeleteBtn>
        <ApplyBtn>재인증</ApplyBtn>
      </ButtonWrapper>
    </ModalFrame>
  );
}

export default PloggingModal;

const Title = styled.div`
  text-align: center;
  color: #f44;
  font-size: 14px;
  font-weight: 600;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

const DeleteBtn = styled.button`
  height: 32px;
  padding: 8px 20px;

  border: 1px solid #54a300;
  background: #fff;
  color: #4e4e4e;
  font-size: 12px;
  font-weight: 500;

  &:hover {
    background-color: #dbffb680;
  }
`;

const ApplyBtn = styled.button`
  padding: 8px 20px;
  height: 32px;

  font-size: 12px;
  font-weight: 500;
`;
