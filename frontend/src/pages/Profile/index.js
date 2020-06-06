import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

import api from "../../services/api";

import "./style.css";
import logoImg from "../../assets/logo.svg";

export default function Profile() {
  const ongId = localStorage.getItem("ongId");
  const ongName = localStorage.getItem("ongName");

  const [incidents, setIncidents] = useState([]);
  
  const history = useHistory();
  const alert = useAlert();

  // Dispara evento quando algo acontece com o valor do Array no segundo parâmetro
  useEffect(() => {
    api
      .get("profile", {
        headers: {
          Authorization: ongId,
        },
      })
      .then((res) => {
        setIncidents(res.data);
      });
  }, [ongId]);

  async function handleDeleteIncident(deleteIncident) {
    try {
        await api.delete(`/incidents/${deleteIncident.id}`, {
            headers: {
                Authorization: ongId
            }
        });

        setIncidents(incidents.filter(incident => incident.id !== deleteIncident.id));
        alert.success(`Caso ${deleteIncident.title} excluído com sucesso!`);
    } catch (error) {
        alert.error('Erro ao deletar o caso, tente novamente');
    }
  }

  function handleLogout() {
      localStorage.clear();
      history.push('/');      
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem Vinda, {ongName}</span>

        <Link to="/incidents/new" className="button" onClick={() => alert.removeAll() }>
          Cadastrar novo caso
        </Link>

        <button type="button" onClick={e => handleLogout() }>
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR: </strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

            <button type="button" onClick={() => handleDeleteIncident(incident)}>
              <FiTrash2 size={18} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
