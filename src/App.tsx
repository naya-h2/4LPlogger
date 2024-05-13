import React, { useState } from "react";
import MobileLayout from "pages/MobileLayout";
import NotFoundPage from "pages/NotFoundPage";
import CalendarPage from "pages/calendar/CalendarPage";
import GoalPage from "pages/goal/GoalPage";
import HomePage from "pages/home/HomePage";
import LoginPage from "pages/login/LoginPage";
import PloggingPage from "pages/plogging/PloggingPage";
import PostPage from "pages/post/PostPage";
import RankingPage from "pages/ranking/RankingPage";
import ScorePage from "pages/score/ScorePage";
import SettingPage from "pages/setting/SettingPage";
import SignupPage from "pages/signup/SignupPage";
import { Route, Routes } from "react-router-dom";
import KakaoRedirectHandler from "./pages/KakaoRedirectHandler";

function App() {
  const [nickname, setNickname] = useState(""); // 닉네임 상태 추가
  return (
    <MobileLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage setNickname={setNickname} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/setting" element={<SettingPage nickname={nickname} setNickname={setNickname} />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/goal" element={<GoalPage />} />
        <Route path="/plogging" element={<PloggingPage />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/score" element={<ScorePage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login/oauth" element={<KakaoRedirectHandler />} />
      </Routes>
    </MobileLayout>
  );
}

export default App;
