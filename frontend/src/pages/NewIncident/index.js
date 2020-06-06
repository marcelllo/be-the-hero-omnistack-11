import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useAlert } from 'react-alert';

import api from '../../services/api';

import "./styles.css";
import logoImg from "../../assets/logo.svg";

export default function NewIncident() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const ongId = localStorage.getItem('ongId');

  const alert = useAlert();
  const history = useHistory();  

  async function handleCreate(e) {
    e.preventDefault();
    const data = { title, description, value };

    try {
      const res = await api.post('/incidents', data, { 
        headers: {
          Authorization: ongId
        }
      })

      history.push('/profile');
      alert.success('Caso incluído com sucesso!');
    } catch (error) {
      alert.error('Erro ao cadastrar caso!');
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>

          <Link to="/profile" className="back-link">
            <FiArrowLeft size="16" color="#E02041" />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Valor em reais"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button type="submit" className="button">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
