import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

async function handleSubmit(e, auth) {
  e.preventDefault();
  const data = new FormData(e.target);
  const result = {};
  data.forEach((k, v) => (result[v] = k));

  try {
    await auth.register(result.username, result.password);
    toast.success("Usuario registrado correctamente", {
      position: toast.POSITION.TOP_CENTER
    })
  } catch (error) {
    toast.error(error.message || "Error registrando usuario", {
      position: toast.POSITION.TOP_CENTER
    })
  }
}



const RegisterForm = () => {
  const auth = useContext(AuthContext);
  if (auth.token) {
    return <Navigate to="/feed" />;
  }
  return (
    <div className='flex'>
      <h2>Registrarse</h2>
      <form onSubmit={(e) => handleSubmit(e, auth)}>
        <TextField required={true} label="Usuario" name="username" />
        <TextField required={true} label="Contraseña" type="password" name="password" />
        <Button disabled={auth.loading} variant="contained" type="submit">
          Enviar
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
