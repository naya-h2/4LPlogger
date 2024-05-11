import React, { useEffect } from "react";
import axios from "axios";
import api from "pages/axios";
const { Kakao } = window;

const KakaoRedirectHandler = () => {
  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get("code");
    const grant_type = "authorization_code";
    const client_id = process.env.REACT_APP_KAKAO_CLIENT_ID;
    axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${process.env.REACT_APP_FRONTEND_BASE_URL}/login/oauth&code=${code}`,
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        },
      )
      .then((res) => {
        console.log(res);
        Kakao.Auth.setAccessToken(res.data.access_token);
        Kakao.API.request({
          url: "/v2/user/me",
          success: function (response: any) {
            console.log(response);
          },
          fail: function (error: any) {
            console.log(error);
          },
        });
        api
          .post("/api/user/account/login/kakao", {
            accessToken: res.data.access_token,
          })
          .then((res: any) => {
            console.log(res);
          });
      });
  }, []);

  return <div>kakao login 완료</div>; // JSX 반환
};

export default KakaoRedirectHandler;
