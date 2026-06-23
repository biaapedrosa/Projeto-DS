import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../services/api';
import { Leaf, CheckCircle2, User, Stethoscope, ShieldCheck } from 'lucide-react';

const Login = () => {
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();
  const { login, loginDemo } = useAuth();
  const navigate = useNavigate();

  const irPorTipo = (data) => {
    if (data.tipo === 'nutricionista' && data.role === 'admin') navigate('/admin/dashboard');
    else if (data.tipo === 'nutricionista') navigate('/nutricionista/dashboard');
    else navigate('/paciente/dashboard');
  };

  const entrarDemo = (tipo) => irPorTipo(loginDemo(tipo));
  const [searchParams] = useSearchParams();
  const [modo, setModo] = useState('login');
  const [form, setForm] = useState({ nome: '', email: '', senha: '' });
  const [erro, setErro] = useState('');
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      authService.socialLogin({ nome: user.name, email: user.email }) // usa authService, não api diretamente
        .then((data) => {
          setUser(data);
          localStorage.setItem('nutriflow:user', JSON.stringify(data));
          navigate(data.tipo === 'nutricionista' ? '/nutricionista/dashboard' : '/paciente/dashboard');
        })
        .catch(() => setErro('Erro ao autenticar com Google.'));
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (searchParams.get('modo') === 'cadastro') {
      setModo('cadastro');
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      const data = await login(form);
      if (data.tipo === 'nutricionista' && data.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (data.tipo === 'nutricionista') {
        navigate('/nutricionista/dashboard');
      } else {
        navigate('/paciente/dashboard');
      }
    } catch (err) {
      setErro('Email ou senha inválidos!');
    }
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      await api.post('/api/auth/register', form);
      setModalAberto(true);
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao cadastrar.');
    }
  };

  const handleFecharModal = () => {
    setModalAberto(false);
    setModo('login');
    setForm({ nome: '', email: '', senha: '' });
  };

  const inputClass = 'box-border w-full rounded-lg border border-[#e0e0e0] px-4 py-3 text-sm outline-none transition-shadow focus:border-nutri-light focus:ring-2 focus:ring-nutri-light/20';
  const labelClass = 'mb-1.5 block text-sm font-medium text-[#333]';

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#eef2ec] font-sans">
      <div className="w-full max-w-[420px] rounded-2xl bg-white p-10 px-10 py-12 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">

        <div className="mb-6 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Leaf size={24} color="#4CAF7D" />
            <span className="text-[22px] font-bold text-[#1a1a1a]">Clínica de Nutrição</span>
          </div>
          <h2 className="mb-1 text-xl font-bold text-[#1a1a1a]">
            {modo === 'login' ? 'Bem-vindo de volta' : 'Criar conta'}
          </h2>
          <p className="text-sm text-[#888]">
            {modo === 'login' ? 'Entre com suas credenciais' : 'Preencha seus dados para se cadastrar'}
          </p>
        </div>

        {erro && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {erro}
          </div>
        )}

        <form onSubmit={modo === 'login' ? handleLogin : handleCadastro}>
          {modo === 'cadastro' && (
            <div className="mb-4">
              <label className={labelClass}>Nome</label>
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                required
                placeholder="Seu nome completo"
                className={inputClass}
              />
            </div>
          )}

          <div className="mb-4">
            <label className={labelClass}>E-mail</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="seu@email.com"
              className={inputClass}
            />
          </div>

          <div className="mb-6">
            <label className={labelClass}>Senha</label>
            <input
              type="password"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg border-0 bg-[#2d7a4f] py-3.5 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            {modo === 'login' ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>

        {modo === 'login' && (
          <>
            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#e0e0e0]" />
              <span className="text-[13px] text-[#888]">ou</span>
              <div className="h-px flex-1 bg-[#e0e0e0]" />
            </div>
            <button
              onClick={() => loginWithRedirect({ connection: 'google-oauth2' })}
              className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-lg border border-[#e0e0e0] bg-white py-3.5 text-[15px] font-semibold text-[#333] transition-colors hover:bg-gray-50"
            >
              <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
              Entrar com Google
            </button>
          </>
        )}

        <p className="mt-4 text-center text-sm text-[#555]">
          {modo === 'login' ? 'Não tem conta?' : 'Já tem conta?'}{' '}
          <span onClick={() => { setModo(modo === 'login' ? 'cadastro' : 'login'); setErro(''); }} className="cursor-pointer font-semibold text-[#2d7a4f]">
            {modo === 'login' ? 'Cadastre-se' : 'Entrar'}
          </span>
        </p>

        {modo === 'login' && (
          <div className="mt-6 rounded-[10px] border border-[#e3efe7] bg-[#f5faf6] p-4">
            <p className="mb-2.5 text-[13px] font-semibold text-nutri">
              Modo demonstração — entre sem backend:
            </p>
            <div className="grid gap-2">
              {[
                { tipo: 'paciente', Icon: User, label: 'Entrar como Paciente' },
                { tipo: 'nutricionista', Icon: Stethoscope, label: 'Entrar como Nutricionista' },
                { tipo: 'admin', Icon: ShieldCheck, label: 'Entrar como Admin' },
              ].map(({ tipo, Icon, label }) => (
                <button
                  key={tipo}
                  type="button"
                  onClick={() => entrarDemo(tipo)}
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-[#d8e6dc] bg-white px-3.5 py-2.5 text-sm font-semibold text-[#1a3a2a] transition-all hover:-translate-y-0.5 hover:border-nutri-light hover:shadow-md"
                >
                  <Icon size={18} color="#4CAF7D" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {modalAberto && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50">
          <div className="w-[90%] max-w-[400px] rounded-2xl bg-white p-10 px-10 py-12 text-center shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
            <div className="mb-4 flex justify-center">
              <CheckCircle2 size={56} color="#4CAF7D" />
            </div>
            <h2 className="mb-2 text-[#2d7a4f]">Cadastro realizado!</h2>
            <p className="mb-6 text-[#555]">Sua conta foi criada com sucesso. Faça login para acessar a plataforma.</p>
            <button onClick={handleFecharModal} className="cursor-pointer rounded-lg border-0 bg-[#2d7a4f] px-8 py-3 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg">
              Fazer login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;