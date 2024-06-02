import { USER } from "constants/mockup";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Dropdown from "./Dropdown";
import api from "api/axios";

function Profile() {
  const [isLogin, setIsLogin] = useState(false);
  const [nickName, setNickName] = useState("");
  // const { profileUrl, nickName } = USER;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogin(true);
    }
  }, []);

  const getNickName = async () => {
    // const res = await api.get("/member/me");
    // setNickName(res.data.nickname);
  };

  console.log(nickName);
  console.log(isLogin);

  useEffect(() => {
    getNickName();
  }, [isLogin]);

  return (
    <Wrapper>
      <span onClick={() => setIsOpen((prev) => !prev)}>{isLogin ? nickName : "로그인"}</span>
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
