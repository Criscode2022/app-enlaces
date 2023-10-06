import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import Header from "./layout/Header";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import RegisterPage from "./pages/RegisterPage";
import Error404Page from "./pages/Error404Page";
import AvatarPage from "./pages/AvatarPage";
import FeedPage from "./pages/FeedPage";
import NewPostPage from "./pages/NewPostPage";
import { useAuth } from './tuArchivoDeAutenticacion'; // Importa la función de autenticación adecuada

function App() {
  const isAuthenticated = useAuth(); // Supongamos que esta función verifica la autenticación

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/feed" /> : <LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/avatar" element={<AvatarPage />} />
          <Route path="/newPost" element={<NewPostPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/*" element={<Error404Page />} />
        </Routes>
        <Outlet /> {/* Muestra las rutas secundarias dentro de esta Outlet */}
      </main>
    </>
  );
}

export default App;
