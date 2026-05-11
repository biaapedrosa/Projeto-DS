import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from '../components/SearchBar/SearchBar'

describe('SearchBar', () => {
  it('mostra o campo de busca', () => {
    // fiz a renderização do componente com o placeholder padrão
    render(<SearchBar onSearch={() => {}} />)

    // nessa parte é feito o teste para verificar se o campo de busca aparece na tela
    expect(screen.getByPlaceholderText('Pesquisar...')).toBeInTheDocument()
  })

  it('mostra o placeholder personalizado', () => {
    // fiz a renderização do componente passando um placeholder personalizado
    render(<SearchBar placeholder="Buscar paciente" onSearch={() => {}} />)

    // nessa parte é feito o teste para verificar se o placeholder personalizado aparece corretamente
    expect(screen.getByPlaceholderText('Buscar paciente')).toBeInTheDocument()
  })

  it('chama a funcao de busca quando o usuario digita', async () => {
    // criei uma função falsa para testar se ela é chamada quando o usuário digita
    const onSearch = vi.fn()

    // preparei a simulação de interação do usuário
    const user = userEvent.setup()

    // fiz a renderização do componente passando a função falsa no onSearch
    render(<SearchBar onSearch={onSearch} />)

    // nessa parte peguei o input de busca pelo placeholder que aparece nele
    const input = screen.getByPlaceholderText('Pesquisar...')

    // simulei o usuário digitando "joao" no campo de busca
    await user.type(input, 'joao')

    // nessa parte é feito o teste para verificar se a função recebeu o texto digitado
    expect(onSearch).toHaveBeenLastCalledWith('joao')
  })
})