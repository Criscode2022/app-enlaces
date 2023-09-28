const Login = () => {
    return (
      <>
        <h2>Login</h2>
        <form>
          <label>
            Usuario <input type="text" name="user" />
          </label>
          <label>
            Contraseña <input type="password" name="password" />
          </label>
          <button type="submit">Enviar</button>
        </form>
      </>
    );
};

export default Login;
