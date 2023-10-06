import { createContext, useEffect } from "react";

// Creamos el contexto de autenticación.
export const AuthContext = createContext(null);

// Creamos el componente provider.
export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Función que retorna los datos del usuario.
        const fetchUser = async () => {
            try {
                setLoading(true);

            } catch (err) {
                console.error(err);

            } finally {
                setLoading(false);
            }
        }
    }, []);
}