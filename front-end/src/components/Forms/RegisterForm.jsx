import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

async function handleSubmit(e, auth) {
  e.preventDefault();
  const data = new FormData(e.target);
  const result = {};
  data.forEach((k, v) => (result[v] = k));

  try {
    await auth.register(result.username, result.password);
    alert("Successfully registered");
  } catch (error) {
    alert("Error registering user: " + error.message);
  }
}



const RegisterForm = () => {
  const auth = useContext(AuthContext);
  return (
    <form onSubmit={(e) => handleSubmit(e, auth)}>
      <TextField required={true} label="Usuario" name="username" />
      <TextField required={true} label="Contraseña" type="password" name="password" />
      <Button disabled={auth.loading} variant="contained" type="submit">
        Enviar
      </Button>
    </form>
  );
};

export default RegisterForm;
