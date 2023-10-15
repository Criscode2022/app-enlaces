import '../../App.css';
import { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const auth = useContext(AuthContext);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { username, password } = formData;
            await auth.login(username, password);
        } catch (error) {
            console.error("Error logging in:", error);
            alert("Error logging in: " + error.message);
        }
    };

    if (auth.token) {
        return <Navigate to="/feed" />
    }

    return (
        <div className='flex'>

            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    required
                    label="Usuario"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <TextField
                    required
                    label="Contraseña"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <Button disabled={auth.loading} variant="contained" type="submit">
                    Iniciar Sesión
                </Button>
            </form>

        </div>
    );
};

export default LoginForm;
