import React from 'react';
import { useNavigate } from 'react-router-dom';


const Error404 = () => {
    const [counter, setCounter] = React.useState(3);
    const navigate = useNavigate();

    setTimeout(() => {
        navigate('/');
    }, 3000);

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            console.log('intervalo');
            setCounter((prevCounter) => prevCounter - 1);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <>

            <h2>Error 404</h2>
            <h3>Ruta no encontrada</h3>
            <p>Redirigiendo en {counter}...</p>
        </>
    );
}

export default Error404;
