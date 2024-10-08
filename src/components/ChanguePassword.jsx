import './styles/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

function ChangePassword() {
    const [username, setUsername] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Inicializa useNavigate

    const handleChangePassword = async (event) => {
        event.preventDefault();

        try {
            // Enviar la solicitud POST para cambiar la contraseña
            const response = await fetch('https://horoscopo-back-steel.vercel.app/api/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    currentPassword,
                    newPassword,
                }),
            });

            const data = await response.json();

            // Mostrar el mensaje de éxito o error
            if (response.ok) {
                setMessage('Contraseña cambiada exitosamente');
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            setMessage('Error al cambiar la contraseña. Intenta de nuevo.');
        }
    };

    // Función para ir a la página de inicio
    const goHome = () => {
        navigate('/'); // Cambia la ruta según sea necesario
    };

    return (
        <form onSubmit={handleChangePassword}>
            <h1>Cambiar Contraseña</h1>
            <h4 className="txt">Usuario</h4>  
            <input
                type="text"
                className="entry"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            /><br />

            <h4 className="txt">Contraseña Actual</h4>  
            <input
                type="password"
                className="entry"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
            /><br />

            <h4 className="txt">Nueva Contraseña</h4>  
            <input
                type="password"
                className="entry"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
            /><br />

            <input type="submit" value="Cambiar Contraseña" id="btnEnviar" />
            
            {message && <p>{message}</p>}

            {/* Botón para ir a Home */}
            <button type="button" onClick={goHome} id="btnHome">
                Volver a Home
            </button>
        </form>
    );
}

export default ChangePassword;
