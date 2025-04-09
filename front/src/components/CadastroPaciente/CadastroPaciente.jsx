import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CadastroPaciente.css';

const CadastroPaciente = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    cpf: '',
    dataNascimento: '',
    celular: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    cep: '',
    endereco: '',
    cidade: '',
    alergias: '',
    observacoes: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validarFormulario = () => {
    const novosErros = {};
    if (!formData.nomeCompleto.trim()) novosErros.nomeCompleto = 'Nome completo é obrigatório';
    if (!formData.cpf.trim()) novosErros.cpf = 'CPF é obrigatório';
    if (!formData.dataNascimento) novosErros.dataNascimento = 'Data de nascimento é obrigatória';
    if (!formData.celular.trim()) novosErros.celular = 'Celular é obrigatório';
    if (!formData.email.trim()) novosErros.email = 'E-mail é obrigatório';
    if (!formData.senha) novosErros.senha = 'Senha é obrigatória';
    if (formData.senha.length < 6) novosErros.senha = 'Senha deve ter no mínimo 6 caracteres';
    if (formData.senha !== formData.confirmarSenha) novosErros.confirmarSenha = 'Senhas não coincidem';
    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    setLoading(true);
    
    try {
      console.log(formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Cadastro realizado com sucesso!');
      
      setFormData({
        nomeCompleto: '',
        cpf: '',
        dataNascimento: '',
        celular: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        cep: '',
        endereco: '',
        cidade: '',
        alergias: '',
        observacoes: ''
      });
      
    } catch (error) {
      console.error(error);
      setErrors(prev => ({ ...prev, geral: 'Erro ao cadastrar. Tente novamente.' }));
    } finally {
      setLoading(false);
    }
  };

  const buscarEnderecoPorCEP = async (cep) => {
    const cleanedCEP = cep.replace(/\D/g, '');
    if (cleanedCEP.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanedCEP}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setFormData(prev => ({
            ...prev,
            endereco: `${data.logradouro || ''}${data.bairro ? `, ${data.bairro}` : ''}`,
            cidade: data.localidade || ''
          }));
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const formatarCPF = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .slice(0, 14);
  };

  const formatarCelular = (value) => {
    const numbers = value.replace(/\D/g, '');
    return numbers
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 15);
  };

  const formatarCEP = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 9);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let valorFormatado = value;
    
    if (name === 'cpf') valorFormatado = formatarCPF(value);
    if (name === 'celular') valorFormatado = formatarCelular(value);
    if (name === 'cep') valorFormatado = formatarCEP(value);
    
    setFormData(prev => ({
      ...prev,
      [name]: valorFormatado
    }));
    
    if (name === 'cep') buscarEnderecoPorCEP(value);
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-header">
        <h1 className="cadastro-titulo">Cadastro de Paciente</h1>
        <p className="cadastro-subtitulo">Preencha seus dados para criar uma conta</p>
      </div>
      
      <form onSubmit={handleSubmit} className="cadastro-formulario">
        {errors.geral && <div className="cadastro-erro-geral">{errors.geral}</div>}

        <div className="cadastro-grid">
          {/* Nome Completo */}
          <div className="cadastro-grupo">
            <label className="cadastro-label">Nome Completo*</label>
            <input
              type="text"
              name="nomeCompleto"
              value={formData.nomeCompleto}
              onChange={handleChange}
              placeholder="Digite o nome completo"
              className="cadastro-input"
            />
            {errors.nomeCompleto && <span className="cadastro-erro">{errors.nomeCompleto}</span>}
          </div>

          {/* CPF */}
          <div className="cadastro-grupo">
            <label className="cadastro-label">CPF*</label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleInputChange}
              placeholder="000.000.000-00"
              maxLength="14"
              className="cadastro-input"
            />
            {errors.cpf && <span className="cadastro-erro">{errors.cpf}</span>}
          </div>

          {/* Data Nascimento */}
          <div className="cadastro-grupo">
            <label className="cadastro-label">Data de Nascimento*</label>
            <input
              type="date"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleChange}
              className="cadastro-input"
            />
            {errors.dataNascimento && <span className="cadastro-erro">{errors.dataNascimento}</span>}
          </div>

          {/* Celular */}
          <div className="cadastro-grupo">
            <label className="cadastro-label">Celular*</label>
            <input
              type="tel"
              name="celular"
              value={formData.celular}
              onChange={handleInputChange}
              placeholder="(00) 00000-0000"
              maxLength="15"
              className="cadastro-input"
            />
            {errors.celular && <span className="cadastro-erro">{errors.celular}</span>}
          </div>

          {/* Email */}
          <div className="cadastro-grupo">
            <label className="cadastro-label">E-mail*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="paciente@exemplo.com"
              className="cadastro-input"
            />
            {errors.email && <span className="cadastro-erro">{errors.email}</span>}
          </div>

          {/* Senha */}
          <div className="cadastro-grupo">
            <label className="cadastro-label">Senha*</label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              minLength="6"
              className="cadastro-input"
            />
            {errors.senha && <span className="cadastro-erro">{errors.senha}</span>}
          </div>

          {/* Confirmar Senha */}
          <div className="cadastro-grupo">
            <label className="cadastro-label">Confirmar Senha*</label>
            <input
              type="password"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              placeholder="Confirme sua senha"
              minLength="6"
              className="cadastro-input"
            />
            {errors.confirmarSenha && <span className="cadastro-erro">{errors.confirmarSenha}</span>}
          </div>

          {/* CEP */}
          <div className="cadastro-grupo">
            <label className="cadastro-label">CEP</label>
            <input
              type="text"
              name="cep"
              value={formData.cep}
              onChange={handleInputChange}
              placeholder="00000-000"
              maxLength="9"
              className="cadastro-input"
            />
          </div>

          {/* Cidade */}
          <div className="cadastro-grupo">
            <label className="cadastro-label">Cidade</label>
            <input
              type="text"
              name="cidade"
              value={formData.cidade}
              onChange={handleChange}
              className="cadastro-input"
              disabled
            />
          </div>
        </div>

        {/* Endereço */}
        <div className="cadastro-grupo">
          <label className="cadastro-label">Endereço</label>
          <input
            type="text"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            placeholder="Rua, Número, Bairro"
            className="cadastro-input"
          />
        </div>

        {/* Alergias e Observações */}
        <div className="cadastro-grid">
          <div className="cadastro-grupo">
            <label className="cadastro-label">Alergias</label>
            <textarea
              name="alergias"
              value={formData.alergias}
              onChange={handleChange}
              placeholder="Liste as alergias conhecidas"
              rows="3"
              className="cadastro-textarea"
            />
          </div>

          <div className="cadastro-grupo">
            <label className="cadastro-label">Observações</label>
            <textarea
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              placeholder="Informações adicionais"
              rows="3"
              className="cadastro-textarea"
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={`cadastro-botao ${loading ? 'cadastro-botao-carregando' : ''}`}
        >
          {loading ? (
            <>
              <span className="cadastro-botao-spinner"></span>
              Cadastrando...
            </>
          ) : 'Cadastrar Paciente'}
        </button>

        <div className="cadastro-rodape">
          Já tem uma conta? <Link to="/login" className="cadastro-link">Faça login</Link>
        </div>
      </form>
    </div>
  );
};

export default CadastroPaciente;