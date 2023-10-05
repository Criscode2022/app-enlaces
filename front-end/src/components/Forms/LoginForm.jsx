import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { loginService } from '../../services/userServices'; // Asegúrate de que la ruta sea correcta

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { username, password } = formData;
            await loginService(username, password);
        } catch (error) {
            alert("Error logging in: " + error.message);
        }
    };

    return (
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
            <Button variant="contained" type="submit">
                Iniciar Sesión
            </Button>
        </form>
    );
};

export default LoginForm;
