import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const handleSubmit = async e => {
  e.preventDefault();
  const data = new FormData(e.target);
  const result = {};
  data.forEach((k, v) => result[v] = k);
  console.log(result);
  const response = await fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(result),
  });
  const json = await response.json();
  if (json.error) {
    alert(json.error);
    return;
  }
  window.localStorage.setItem("login-token", json.token);
  alert("Successfully logged in");
};

const Login = () => {
    return (
      <>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <TextField required={true} label="Usuario" name="username" />
          <TextField required={true} label="Contraseña" type="password" name="password" />
          <Button type="submit">Enviar</Button>
        </form>
      </>
    );
};

export default Login;
