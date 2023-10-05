import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { loginService } from '../../services/userServices';

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
            const token = await loginService(username, password);

            // Guarda el token en el Local Storage
            localStorage.setItem('authToken', token);
            if (token) {
                console.log('Login successful');
            }

        } catch (error) {
            console.error("Error logging in:", error);
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
