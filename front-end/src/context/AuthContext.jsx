import { createContext, useState, useEffect } from "react";
import { loginService, registerService } from "../services/userServices";

// Creamos el contexto de autenticación.
export const AuthContext = createContext(null);

// Clave para almacenar el token.
const TOKEN_KEY = "authToken";

// Creamos el componente provider.
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY));
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);

    // Add an effect to update isAuthenticated when the token changes
    useEffect(() => {
        setIsAuthenticated(!!token);
    }, [token]);

    // Función que retorna los datos del usuario.
    const login = async (username, password) => {
        try {
            setLoading(true);
            const token = await loginService(username, password);
            console.log("Logged-in with token: ", token);
            localStorage.setItem(TOKEN_KEY, token);
            setToken(token);
            // Update isAuthenticated when the token is set
            setIsAuthenticated(true);
            // no hay catch, dejamos la excepción propagar
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        // Update isAuthenticated when the token is removed
        setIsAuthenticated(false);
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
        <AuthContext.Provider value={{ loading, token, isAuthenticated, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};
