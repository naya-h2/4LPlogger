import styled from "styled-components";

interface Props {
  ratio: number;
}

function ProgressBar({ ratio }: Props) {
  return (
    <Progressbar>
      <Progress $ratio={ratio} />
    </Progressbar>
  );
}

export default ProgressBar;

const Progressbar = styled.div`
  width: 100%;
  height: 18px;
  background-color: #d9d9d9;
  border-radius: 12px;
`;

const Progress = styled.div<{ $ratio: number }>`
  width: ${({ $ratio }) => `${$ratio}%`};
  height: 18px;
  background-color: #54a300;
  border-radius: 12px;
`;
