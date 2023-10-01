import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Login = () => {
    return (
      <>
        <h2>Login</h2>
        <form>
          <TextField required={true} label="Usuario" name="username" />
          <TextField required={true} label="Contraseña" type="password" name="password" />
          <Button type="submit">Enviar</Button>
        </form>
      </>
    );
};

export default Login;
