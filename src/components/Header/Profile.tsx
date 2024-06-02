import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";
import AuthContext from "api/auth-context";

function Profile() {
  const [isLogin, setIsLogin] = useState(false);
  const { userObj, getUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userObj.nickname || window.localStorage.getItem("token")) {
      if (!userObj.nickname) getUser();
      setIsLogin(true);
    }
  }, [userObj]);

  return (
    <Wrapper>
      <span onClick={() => (isLogin ? setIsOpen((prev) => !prev) : navigate("/login"))}>{isLogin ? `${userObj.nickname} 님` : "로그인"}</span>
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
