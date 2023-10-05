import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { registerService } from '../../services/userServices';

async function handleSubmit(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const result = {};
  data.forEach((k, v) => (result[v] = k));

  try {
    await registerService(result.username, result.password);
    alert("Successfully registered");
  } catch (error) {
    alert("Error registering user: " + error.message);
  }
}



const RegisterForm = () => {
  return (
    <form onSubmit={handleSubmit}>
      <TextField required={true} label="Usuario" name="username" />
      <TextField required={true} label="Contraseña" type="password" name="password" />
      <Button variant="contained" type="submit">
        Enviar
      </Button>
    </form>
  );
};

export default RegisterForm;
