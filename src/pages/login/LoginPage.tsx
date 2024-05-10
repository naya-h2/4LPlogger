import React from "react";
import styled from "styled-components";

// 스타일링된 컨테이너
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 화면 전체 높이 */
`;

// 이미지 스타일링
const Image = styled.img`
  width: 200px; /* 이미지 너비 */
  height: 211px; /* 이미지 높이 */
`;

const RoundedBox = styled.div`
  width: 288px;
  height: 48px;
  border-radius: 10px;
  background-color: #f0f0f0;
`;

function LoginPage() {
  return (
    <Container>
      {/* public 폴더의 이미지 경로 */}
      <Image src="/clover-logo.svg" alt="Clover Logo" />
      <RoundedBox>카카오 로그인</RoundedBox>
    </Container>
  );
}

export default LoginPage;
