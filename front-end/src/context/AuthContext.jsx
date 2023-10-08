import { createContext, useState } from "react";
import { loginService, registerService } from "../services/userServices";


// Creamos el contexto de autenticación.
export const AuthContext = createContext(null);

// Clave para almacenar el token.
const TOKEN_KEY = "authToken";

// Creamos el componente provider.
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY));
    const [loading, setLoading] = useState(false);

    // Función que retorna los datos del usuario.
    const login = async (username, password) => {
        try {
            setLoading(true);
            const token = await loginService(username, password);
            console.log("Logged-in with token: ", token);
            localStorage.setItem(TOKEN_KEY, token);
            setToken(token);
            // no hay catch, dejamos la excepción propagar
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY, null);
        setToken(null);
    };

    const register = async (username, password) => {
        try {
            setLoading(true);
            await registerService(username, password);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ loading, token, login, logout, register }}>{children}</AuthContext.Provider>
    );
}
