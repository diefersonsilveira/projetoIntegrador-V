import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPaciente.css';

const LoginPaciente = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    senha: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [lembrar, setLembrar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const validarFormulario = () => {
    const novosErros = {};
    if (!loginData.email.trim()) novosErros.email = 'E-mail é obrigatório';
    if (!loginData.senha) novosErros.senha = 'Senha é obrigatória';
    if (loginData.email && !/^\S+@\S+\.\S+$/.test(loginData.email)) novosErros.email = 'E-mail inválido';
    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    setLoading(true);
    
    try {
      console.log({ ...loginData, lembrar });
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Login realizado com sucesso!');
    } catch (error) {
      console.error(error);
      setErrors(prev => ({ ...prev, geral: 'E-mail ou senha incorretos' }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1 className="login-titulo">Login do Paciente</h1>
        <p className="login-subtitulo">Acesse sua conta</p>
      </div>
      
      <form onSubmit={handleSubmit} className="login-formulario">
        {errors.geral && <div className="login-erro-geral">{errors.geral}</div>}
        
        <div className="login-grupo-formulario">
          <label className="login-label">E-mail*</label>
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            placeholder="seu@email.com"
            className="login-input"
          />
          {errors.email && <span className="login-erro">{errors.email}</span>}
        </div>

        <div className="login-grupo-formulario">
          <label className="login-label">Senha*</label>
          <input
            type="password"
            name="senha"
            value={loginData.senha}
            onChange={handleChange}
            placeholder="Digite sua senha"
            minLength="6"
            className="login-input"
          />
          {errors.senha && <span className="login-erro">{errors.senha}</span>}
        </div>

        <div className="login-opcoes">
          <label className="login-lembrar">
            <input
              type="checkbox"
              checked={lembrar}
              onChange={(e) => setLembrar(e.target.checked)}
              className="login-checkbox"
            />
            <span className="login-lembrar-texto">Lembrar de mim</span>
          </label>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={`login-botao ${loading ? 'login-botao-carregando' : ''}`}
        >
          {loading ? (
            <>
              <span className="login-botao-spinner"></span>
              Carregando...
            </>
          ) : 'Entrar'}
        </button>

        <div className="login-rodape-formulario">
          Não tem uma conta? <Link to="/cadastro" className="login-link">Cadastre-se</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPaciente;