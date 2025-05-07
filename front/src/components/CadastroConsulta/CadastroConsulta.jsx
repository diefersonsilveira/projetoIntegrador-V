import { useState } from "react";
import './CadastroConsulta.css';

export default function ConsultaForm() {
  const [form, setForm] = useState({
    nome: "",
    data: "",
    hora: "",
    tipo: "presencial",
    observacoes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Consulta cadastrada:", form);
    alert("Consulta cadastrada com sucesso!");
    // Aqui você pode enviar os dados para um backend
    setForm({
      nome: "",
      data: "",
      hora: "",
      tipo: "presencial",
      observacoes: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Cadastrar Consulta</h2>
      <label>Nome do Paciente:</label>
      <input type="text" name="nome" value={form.nome} onChange={handleChange} required />

      <label>Data:</label>
      <input type="date" name="data" value={form.data} onChange={handleChange} required />

      <label>Hora:</label>
      <input type="time" name="hora" value={form.hora} onChange={handleChange} required />

      <label>Tipo:</label>
      <select name="tipo" value={form.tipo} onChange={handleChange}>
        <option value="presencial">Presencial</option>
        <option value="online">Online</option>
      </select>

      <label>Observações:</label>
      <textarea name="observacoes" value={form.observacoes} onChange={handleChange} />

      <button type="submit">Cadastrar</button>
    </form>
  );
}