import { Navigate, useNavigate } from "react-router-dom";
import './styles/UserHome.css';
import TextSigno from "./TextSigno.jsx";
import { useState, useEffect } from "react";

function UserHome({ user }) {
    if (user !== "user" || !user) {
        return <Navigate to="/" />;
    }

    const home = useNavigate();
    const [textoSigno, setTextoSigno] = useState('');
    const [signoSeleccionado, setSignoSeleccionado] = useState('0');

    function goHome() {
        home("/");
    }

    useEffect(() => {
        if (signoSeleccionado !== "0") {
            fetchSignoInfo();
        }
    }, [signoSeleccionado]);

    async function fetchSignoInfo() {
        try {
            const response = await fetch(`https://horoscopo-back-steel.vercel.app/api/${signoSeleccionado}`);
            const responseData = await response.json();
            setTextoSigno(responseData);
        } catch (error) {
            console.error("Error fetching signo info:", error);
            setTextoSigno("Error al obtener la información del signo.");
        }
    }

    function handleSelectSigno(event) {
        setSignoSeleccionado(event.target.value);
    }

    return (
        <div className="container">
            <div id="txtSeleccionPage"><h3>Selecciona tu signo zodiacal</h3></div>
            <select id="selectSignos" onChange={handleSelectSigno} value={signoSeleccionado}>
                <option value="0">Selecciona un signo zodiacal</option>
                <option value="Aries">Aries</option>
                <option value="Geminis">Géminis</option>
                <option value="Cancer">Cáncer</option>
                <option value="Leo">Leo</option>
                <option value="Virgo">Virgo</option>
                <option value="Libra">Libra</option>
                <option value="Escorpio">Escorpio</option>
                <option value="Sagitario">Sagitario</option>
                <option value="Capricornio">Capricornio</option>
                <option value="Acuario">Acuario</option>
                <option value="Piscis">Piscis</option>
            </select>
            <TextSigno texto={textoSigno} />
            <button id="btnHome" onClick={goHome}>Home</button>
        </div>
    );
}

export default UserHome;
