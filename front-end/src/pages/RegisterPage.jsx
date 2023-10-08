import { useContext } from 'react';
import RegisterForm from '../components/Forms/RegisterForm'
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const RegisterPage = () => {
  const auth = useContext(AuthContext);
  if (auth.token) {
    return <Navigate to="/feed"/>
  }
  return (
    <>
      <h2>Registrarse</h2>
      <div className='container'>
        <RegisterForm />
      </div>
    </>
  );
};

export default RegisterPage;
