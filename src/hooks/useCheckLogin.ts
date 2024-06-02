import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useCheckLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("⚠️ 로그인 후 이용해 주세요!");
      navigate("/login");
    }
  }, []);
};
