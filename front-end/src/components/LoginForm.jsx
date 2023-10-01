import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function handleSubmit(type) {
  return async function (e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const result = {};
    data.forEach((k, v) => result[v] = k);
    console.log(result);
    const response = await fetch(`http://localhost:3000/users/${type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    });
    const json = await response.json();
    if (json.error || json.errno) {
      alert(json.error || json.message);
      return;
    }
    if (type == "login") {
      window.localStorage.setItem("login-token", json.token);
      alert("Successfully logged in");
    } else {
      alert("Successfully registered");
    }
  }
}

const LoginForm = ({ type = "login" }) => {
  return (
    <form onSubmit={handleSubmit(type)}>
      <TextField required={true} label="Usuario" name="username" />
      <TextField required={true} label="Contraseña" type="password" name="password" />
      <Button type="submit">Enviar</Button>
    </form>
  );
};

export default LoginForm;
