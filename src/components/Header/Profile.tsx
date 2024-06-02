import { useEffect, useState } from "react";
import styled from "styled-components";
import Dropdown from "./Dropdown";
import api from "api/axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [isLogin, setIsLogin] = useState(false);
  const [nickName, setNickName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogin(true);
    }
  }, []);

  const getNickName = async () => {
    const res = await api.get("/api/members/me");
    setNickName(res.data.nickname);
  };

  useEffect(() => {
    getNickName();
  }, [isLogin]);

  return (
    <Wrapper>
      <span onClick={() => (isLogin ? setIsOpen((prev) => !prev) : navigate("/login"))}>{isLogin ? `${nickName} 님` : "로그인"}</span>
      {isOpen && <Dropdown />}
    </Wrapper>
  );
}

export default Profile;

const Wrapper = styled.div`
  position: relative;
  font-size: 14px;

  cursor: pointer;
`;

const Img = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 100%;

  object-fit: cover;
  object-position: center;

  cursor: pointer;
`;
