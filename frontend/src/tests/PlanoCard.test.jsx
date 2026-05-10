import { render, screen } from '@testing-library/react'
import PlanoCard from '../components/PlanoCard/PlanoCard'

describe('PlanoCard', () => {
  // criei um plano de exemplo para usar em todos os testes
  const plano = {
    id: 1,
    status: 'ativo',
    descricao: 'Plano alimentar para paciente em acompanhamento',
    data_criacao: '2026-05-07T12:00:00'
}

  it('mostra o numero do plano', () => {
    // renderizei o componente passando o plano como propriedade
    render(<PlanoCard plano={plano} />)

    // verifiquei se o numero do plano aparece na tela
    expect(screen.getByText('Plano #1')).toBeInTheDocument()
  })

  it('mostra o status do plano', () => {
    // renderizei novamente o componente para testar outra informação
    render(<PlanoCard plano={plano} />)

    // verifiquei se o status do plano aparece corretamente
    expect(screen.getByText('ativo')).toBeInTheDocument()
  })

  it('mostra a descricao do plano', () => {
    // renderizei o componente com o mesmo plano de exemplo
    render(<PlanoCard plano={plano} />)

    // verifiquei se a descrição cadastrada aparece na tela
    expect(screen.getByText('Plano alimentar para paciente em acompanhamento')).toBeInTheDocument()
  })

  it('mostra a data de criacao formatada', () => {
    // renderizei o componente para conferir como a data aparece
    render(<PlanoCard plano={plano} />)

    // verifiquei se a data foi exibida no formato brasileiro
    expect(screen.getByText('07/05/2026')).toBeInTheDocument()
  })
})