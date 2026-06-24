import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { Leaf } from 'lucide-react';

const NavBar = () => {
  const { logout, user, login, showLoginModal, setShowLoginModal } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ email: '', senha: '' });
  const [erro, setErro] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      const data = await login(form);
      setShowLoginModal(false);
      setForm({ email: '', senha: '' });
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

  const painelLink = () => {
    if (!user) return '/login';
    if (user.tipo === 'nutricionista' && user.role === 'admin') return '/admin/dashboard';
    if (user.tipo === 'nutricionista') return '/nutricionista/dashboard';
    return '/paciente/dashboard';
  };

  const linkClass = 'text-[15px] font-medium text-gray-700 no-underline transition-colors hover:text-nutri-light';

  return (
    <>
      <header className="sticky top-0 z-[100] bg-white border-b border-[#e8ede9] shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-8">

          <Link to="/" className="flex items-center gap-2 font-serif text-xl font-bold text-[#1a3a2a] no-underline">
            <Leaf size={22} color="#4CAF7D" />
            <span>NutriFlow</span>
          </Link>

          <nav className={`${menuOpen ? 'flex' : 'hidden'} absolute left-0 right-0 top-16 flex-col gap-4 border-b border-[#e8ede9] bg-white p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] md:static md:flex md:flex-row md:items-center md:gap-8 md:border-0 md:p-0 md:shadow-none`}>
            {user ? (
              <>
                <Link to={painelLink()} className={linkClass} onClick={() => setMenuOpen(false)}>Painel</Link>
                <span className="text-sm font-medium text-[#555]">
                  Olá, {user.nome || user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="cursor-pointer rounded-lg border border-red-600 bg-transparent px-5 py-2 text-[15px] font-semibold text-red-600 transition-all hover:bg-red-600 hover:text-white"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link to="/" className={linkClass} onClick={() => setMenuOpen(false)}>Início</Link>
                <Link to="/institucional" className={linkClass} onClick={() => setMenuOpen(false)}>Sobre</Link>
                <button
                  onClick={() => { setShowLoginModal(true); setMenuOpen(false); }}
                  className="cursor-pointer rounded-lg border-0 bg-nutri-light px-5 py-2 text-[15px] font-semibold text-white transition-colors hover:bg-[#3d9e6e]"
                >
                  Entrar
                </button>
              </>
            )}
          </nav>

          <button
            className="flex cursor-pointer flex-col gap-[5px] border-0 bg-transparent p-1 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className="block h-0.5 w-6 rounded bg-[#1a3a2a]" />
            <span className="block h-0.5 w-6 rounded bg-[#1a3a2a]" />
            <span className="block h-0.5 w-6 rounded bg-[#1a3a2a]" />
          </button>

        </div>
      </header>

      {showLoginModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-[400px] rounded-2xl bg-white p-10 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">

            <button
              onClick={() => { setShowLoginModal(false); setErro(''); }}
              className="absolute right-4 top-4 cursor-pointer border-0 bg-transparent text-2xl text-[#888]"
            >
              ×
            </button>

            <div className="mb-6 text-center">
              <div className="mb-2 flex items-center justify-center gap-2">
                <Leaf size={22} color="#4CAF7D" />
                <span className="text-xl font-bold text-[#1a1a1a]">NutriFlow</span>
              </div>
              <h2 className="mb-1 text-xl font-bold text-[#1a1a1a]">Bem-vindo de volta!</h2>
              <p className="text-sm text-[#888]">Entre com suas credenciais para acessar a plataforma</p>
            </div>

            {erro && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {erro}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="mb-1.5 block text-sm font-medium text-[#333]">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="seu@email.com"
                  className="w-full rounded-lg border border-[#e0e0e0] px-4 py-3 text-sm outline-none transition-shadow focus:border-nutri-light focus:ring-2 focus:ring-nutri-light/20"
                />
              </div>

              <div className="mb-6">
                <label className="mb-1.5 block text-sm font-medium text-[#333]">Senha</label>
                <input
                  type="password"
                  name="senha"
                  value={form.senha}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-[#e0e0e0] px-4 py-3 text-sm outline-none transition-shadow focus:border-nutri-light focus:ring-2 focus:ring-nutri-light/20"
                />
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer rounded-lg border-0 bg-[#2d7a4f] py-3.5 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Entrar
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-[#555]">
              Não tem conta?{' '}
              <span
                onClick={() => { setShowLoginModal(false); navigate('/login?modo=cadastro'); }}
                className="cursor-pointer font-semibold text-[#2d7a4f]"
              >
                Cadastre-se
              </span>
            </p>

          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;