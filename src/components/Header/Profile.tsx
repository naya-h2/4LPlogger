import { USER } from "constants/mockup";
import { useState } from "react";
import styled from "styled-components";
import Dropdown from "./Dropdown";

function Profile() {
  const { profileUrl, nickName } = USER;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper>
      <Img src={profileUrl} alt={nickName} onClick={() => setIsOpen((prev) => !prev)} />
      {isOpen && <Dropdown />}
    </Wrapper>
  );
}

export default Profile;

const Wrapper = styled.div`
  position: relative;
`;

const Img = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 100%;

  object-fit: cover;
  object-position: center;

  cursor: pointer;
`;
