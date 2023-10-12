import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./layout/Header";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import RegisterPage from "./pages/RegisterPage";
import Error404Page from "./pages/Error404Page";
import AvatarPage from "./pages/AvatarPage";
import FeedPage from "./pages/FeedPage";
import NewPostPage from "./pages/NewPostPage";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/feed" /> : <Navigate to="/login" />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/avatar" element={<AvatarPage />} />
          <Route path="/newPost" element={<NewPostPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/*" element={<Error404Page />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
