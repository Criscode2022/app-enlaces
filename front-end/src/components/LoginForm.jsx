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
      // FIXME: Ideally the back-end would be more consistent.
      if (typeof json.error === "string")
        alert(json.error);
      else if (typeof json.message === "string")
        alert(json.message);
      else if (json.error.details)
        alert(json.error.details[0].message);
      else
        alert(`Unknown error: ${JSON.stringify(json.error || json.errno)}`);
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
      <Button variant="contained" type="submit">Enviar</Button>
    </form>
  );
};

export default LoginForm;
