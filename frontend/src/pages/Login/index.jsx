import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Login = () => {
  const { login, ativarConta } = useAuth();
  const navigate = useNavigate();

  const irPorTipo = (data) => {
    console.log('irPorTipo data:', data);
    if (data.tipo === 'nutricionista' && data.role === 'admin') window.location.href = '/nutricao/admin/dashboard';
    else if (data.tipo === 'nutricionista') window.location.href = '/nutricao/nutricionista/dashboard';
    else window.location.href = '/nutricao/paciente/dashboard';
  };

  const [searchParams] = useSearchParams();
  const [modo, setModo] = useState('login');
  const [form, setForm] = useState({ cpf: '', email: '', senha: '' });
  const [erro, setErro] = useState('');

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
      irPorTipo(await login({ email: form.email, senha: form.senha }));
    } catch (err) {
      setErro('Email ou senha inválidos!');
    }
  };

  const handleAtivar = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      irPorTipo(await ativarConta(form));
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao ativar a conta.');
    }
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
            {modo === 'login' ? 'Bem-vindo de volta' : 'Ativar conta'}
          </h2>
          <p className="text-sm text-[#888]">
            {modo === 'login' ? 'Entre com suas credenciais' : 'Use o CPF do seu pré-cadastro e crie sua senha'}
          </p>
        </div>
        {erro && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{erro}</div>
        )}
        <form onSubmit={modo === 'login' ? handleLogin : handleAtivar}>
          {modo === 'cadastro' && (
            <div className="mb-4">
              <label className={labelClass}>CPF</label>
              <input type="text" name="cpf" value={form.cpf} onChange={handleChange} required placeholder="Somente números" className={inputClass} />
            </div>
          )}
          <div className="mb-4">
            <label className={labelClass}>E-mail</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="seu@email.com" className={inputClass} />
          </div>
          <div className="mb-6">
            <label className={labelClass}>Senha</label>
            <input type="password" name="senha" value={form.senha} onChange={handleChange} required placeholder="••••••••" className={inputClass} />
          </div>
          <button type="submit" className="w-full cursor-pointer rounded-lg border-0 bg-[#2d7a4f] py-3.5 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg">
            {modo === 'login' ? 'Entrar' : 'Ativar conta'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-[#555]">
          {modo === 'login' ? 'Já tem pré-cadastro e ainda não ativou?' : 'Já tem conta ativa?'}{' '}
          <span onClick={() => { setModo(modo === 'login' ? 'cadastro' : 'login'); setErro(''); }} className="cursor-pointer font-semibold text-[#2d7a4f]">
            {modo === 'login' ? 'Ative aqui' : 'Entrar'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
