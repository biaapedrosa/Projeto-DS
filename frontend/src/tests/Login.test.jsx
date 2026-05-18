import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../pages/Login/Login'

// criei funções falsas para simular o login e a navegação da tela
const { mockLogin, mockNavigate } = vi.hoisted(() => {
  return {
    mockLogin: vi.fn(),
    mockNavigate: vi.fn()
  }
})

// fiz o mock do useNavigate, porque no teste eu não quero navegar de verdade
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

// fiz o mock do useAuth, porque no teste eu não quero depender do login real
vi.mock('../context/AuthContext', () => {
  return {
    useAuth: () => ({
      login: mockLogin
    })
  }
})

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

  it('abre o modal de cadastro após cadastro bem-sucedido', async () => {
    // importo o mock da api para configurar o retorno de sucesso
    const api = (await import('../services/api')).default
    api.post.mockResolvedValueOnce({ data: {} })

    // preparei a simulação do usuário
    const user = userEvent.setup()

    // fiz a renderização da tela de login
    render(<Login />)

    // troco para o modo cadastro clicando no link
    await user.click(screen.getByText('Cadastre-se'))

    // simulei o usuário preenchendo os campos do cadastro
    await user.type(screen.getByPlaceholderText('Seu nome completo'), 'João Teste')
    await user.type(screen.getByPlaceholderText('seu@email.com'), 'joao@teste.com')
    await user.type(screen.getByPlaceholderText('••••••••'), '123456')

    // simulei o usuário clicando no botão de cadastrar
    await user.click(screen.getByRole('button', { name: 'Cadastrar' }))

    // verifico se o modal aparece com a mensagem de sucesso
    expect(await screen.findByText('Cadastro realizado!')).toBeInTheDocument()
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