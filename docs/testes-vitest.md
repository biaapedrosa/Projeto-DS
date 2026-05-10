# planejamento dos testes com vitest

## sobre a atividade

nessa atividade, a gente vai adicionar testes automatizados no projeto da clínica de nutrição usando o vitest.

como o nosso frontend foi feito com react e vite, faz sentido usar o vitest porque ele já funciona bem nesse tipo de projeto e é mais simples de configurar.

a ideia não é fazer algo muito complexo, mas sim deixar uma base de testes funcionando, com alguns testes ligados a partes reais do nosso sistema.

## o que a gente precisa entregar

nessa atividade, vamos focar em:
- configurar o vitest no frontend;
- deixar os comandos de teste funcionando;
- criar pelo menos 10 testes;
- testar componentes que já existem no projeto;
- rodar os testes antes de entregar para garantir que está tudo passando.

## divisão do grupo

### eduardo — configuração e explicação geral
- instalar o vitest e as bibliotecas de teste;
- adicionar os comandos de teste no `package.json`;
- configurar o vitest no `vite.config.js`;
- criar o arquivo `src/tests/setup.js`;
- entender o que foi feito para conseguir explicar depois.

### marina — testes do plano card
- verificar se o número do plano aparece na tela;
- verificar se o status do plano aparece;
- verificar se a descrição aparece;
- verificar se a data de criação aparece formatada.

### pandolfi — testes da search bar
- verificar se o campo de busca aparece;
- verificar se o placeholder aparece corretamente;
- verificar se a função de busca é chamada quando o usuário digita.

### caio — testes do login e revisão final
- verificar se a tela de login aparece;
- verificar se os campos de e-mail e senha aparecem;
- verificar se o botão de entrar aparece;
- verificar se aparece mensagem de erro quando o login falha.


## como rodar os testes

primeiro, entrar na pasta do frontend:

```bash
cd frontend
```

instalar as dependências:

```bash
npm install
```

rodar os testes:

```bash
npm run test:run
```

## padrão dos arquivos de teste

os testes vão ficar na pasta:

```txt
src/tests
```

e os arquivos devem seguir esse modelo:

```txt
NomeDoArquivo.test.jsx
```

exemplos:

```txt
src/tests/PlanoCard.test.jsx
src/tests/SearchBar.test.jsx
src/tests/Login.test.jsx
```
