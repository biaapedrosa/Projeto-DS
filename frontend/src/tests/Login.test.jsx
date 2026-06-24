import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../pages/Login'

// criei funções falsas para simular o login e a navegação da tela
const { mockLogin, mockNavigate, mockAtivarConta } = vi.hoisted(() => {
  return {
    mockLogin: vi.fn(),
    mockNavigate: vi.fn(),
    mockAtivarConta: vi.fn()
  }
})

// fiz o mock do useNavigate e do useSearchParams, porque no teste eu não quero
// navegar de verdade nem depender de um <Router> em volta do componente
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useSearchParams: () => [new URLSearchParams(), vi.fn()]
  }
})

// fiz o mock do useAuth, porque no teste eu não quero depender do login real
vi.mock('../context/AuthContext', () => {
  return {
    useAuth: () => ({
      login: mockLogin,
      loginSocial: vi.fn(),
      ativarConta: mockAtivarConta
    })
  }
})

// fiz o mock do Auth0, porque no teste não há Auth0Provider em volta
vi.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({ loginWithRedirect: vi.fn(), user: null, isAuthenticated: false })
}))

// fiz o mock da API para simular chamadas ao backend sem depender do servidor real
vi.mock('../services/api', () => ({
  default: {
    post: vi.fn()
  }
}))

describe('Login', () => {
  beforeEach(() => {
    // limpo os mocks antes de cada teste para um teste não interferir no outro
    vi.clearAllMocks()
  })

  it('mostra o titulo da tela de login', () => {
    // fiz a renderização da tela de login
    render(<Login />)

    // nessa parte é feito o teste para verificar se o título aparece na tela
    expect(screen.getByText('Bem-vindo de volta')).toBeInTheDocument()
  })

  it('mostra os campos de email, senha e o botao de entrar', () => {
    // fiz a renderização da tela de login
    render(<Login />)

    // nessa parte é feito o teste para verificar se o campo de email aparece
    expect(screen.getByPlaceholderText('seu@email.com')).toBeInTheDocument()

    // nessa parte é feito o teste para verificar se o texto senha aparece
    expect(screen.getByText('Senha')).toBeInTheDocument()

    // nessa parte é feito o teste para verificar se o botão de entrar aparece
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument()
  })

  it('mostra mensagem de erro quando o login falha', async () => {
    // configurei o login falso para dar erro
    mockLogin.mockRejectedValueOnce(new Error('erro no login'))

    // preparei a simulação do usuário
    const user = userEvent.setup()

    // fiz a renderização da tela de login
    render(<Login />)

    // simulei o usuário digitando o email
    await user.type(screen.getByPlaceholderText('seu@email.com'), 'teste@email.com')

    // simulei o usuário digitando a senha
    await user.type(screen.getByText('Senha').parentElement.querySelector('input'), '123456')

    // simulei o usuário clicando no botão de entrar
    await user.click(screen.getByRole('button', { name: 'Entrar' }))

    // nessa parte é feito o teste para verificar se a mensagem de erro aparece
    expect(await screen.findByText(/Email ou senha/i)).toBeInTheDocument()
  })

  it('ativa a conta do paciente e redireciona após sucesso', async () => {
    // configurei a ativação falsa para retornar um paciente (etapa 2 do pré-cadastro)
    mockAtivarConta.mockResolvedValueOnce({ tipo: 'paciente' })

    // preparei a simulação do usuário
    const user = userEvent.setup()

    // fiz a renderização da tela de login
    render(<Login />)

    // troco para o modo ativação de conta clicando no link
    await user.click(screen.getByText('Ative aqui'))

    // simulei o usuário preenchendo os campos da ativação (CPF + email + senha)
    await user.type(screen.getByPlaceholderText('Somente números'), '12345678900')
    await user.type(screen.getByPlaceholderText('seu@email.com'), 'joao@teste.com')
    await user.type(screen.getByPlaceholderText('••••••••'), '123456')

    // simulei o usuário clicando no botão de ativar conta
    await user.click(screen.getByRole('button', { name: 'Ativar conta' }))

    // verifico se a ativação foi chamada e o paciente foi redirecionado ao dashboard
    expect(mockAtivarConta).toHaveBeenCalledWith({ cpf: '12345678900', email: 'joao@teste.com', senha: '123456' })
    expect(mockNavigate).toHaveBeenCalledWith('/paciente/dashboard')
  })

  it('não submete o formulário de login com campos vazios', async () => {
    // preparei a simulação do usuário
    const user = userEvent.setup()

    // fiz a renderização da tela de login
    render(<Login />)

    // simulei o usuário clicando em entrar sem preencher nada
    await user.click(screen.getByRole('button', { name: 'Entrar' }))

    // o login não deve ter sido chamado pois os campos estão vazios
    expect(mockLogin).not.toHaveBeenCalled()
  })
})