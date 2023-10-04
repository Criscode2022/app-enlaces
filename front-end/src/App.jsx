import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./layout/Header";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import Error404Page from "./pages/Error404Page";
import AvatarPage from "./pages/AvatarPage";
import FeedPage from "./pages/FeedPage";
import ShareLink from "./pages/ShareLink";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/avatar" element={<AvatarPage />} />
          <Route path="/linkform" element={<ShareLink />} />
          <Route path="/*" element={<Error404Page />} />
          <Route path="/feed" element={<FeedPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
