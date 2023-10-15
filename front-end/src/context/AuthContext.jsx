import { createContext, useState, useEffect } from 'react';
import {
    loginService,
    registerService,
    updateUserService,
} from '../services/userServices';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext(null);

const TOKEN_KEY = "authToken";

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY));
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        setIsAuthenticated(!!token);
    }, [token]);

    const decode = () => {
        try {
            const decodedToken = jwt_decode(token);
            const userIdLogged = decodedToken.userId;
            setUserId(userIdLogged);
            setUserName(decodedToken.userName);

        } catch (error) {
            console.error("Error al decodificar el token:", error);
        }
    };

    useEffect(() => {
        if (token) {
            decode(); // Call getUserId when the token is set or changes
        }
    }, [token]);

    const login = async (username, password) => {
        try {
            setLoading(true);
            const token = await loginService(username, password);
            console.log("Logged-in with token: ", token);
            localStorage.setItem(TOKEN_KEY, token);
            setToken(token);
            setIsAuthenticated(true);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setIsAuthenticated(false);
        setUserName(null); // Clear the user name on logout
        setUserId(null); // Clear the user ID on logout
    };

    const register = async (username, password) => {
        try {
            setLoading(true);
            await registerService(username, password);
        } finally {
            setLoading(false);
        }
    };

    const update = async (fieldsToUpdate) => {
        try {
            setLoading(true);
            const { token: newToken, username } = await updateUserService(token, fieldsToUpdate);
            setToken(newToken);
            setUserName(username);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                loading,
                token,
                isAuthenticated,
                userId,
                login,
                logout,
                register,
                update,
                userName,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
