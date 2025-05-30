# 📝 Task Manager App - Frontend

Aplicação frontend para gerenciamento de tarefas com interface intuitiva e funcionalidades completas para organização pessoal ou em equipe.

## ✨ Funcionalidades

- ✅ Listagem de tarefas
- ➕ Adição de novas tarefas
- ✏️ Edição de tarefas existentes
- ✔️ Marcação de tarefas como completas
- 🗑️ Exclusão de tarefas
- 🔍 Filtros por status (todas, ativas, completas)
- 🔄 Persistência dos dados

## 🛠️ Tecnologias Utilizadas

- **Frontend**:
  - React.js
  - TypeScript
  - Vite (como build tool)
  - Axios (requisições HTTP)
  - React Hook Form (formulários)
  - Tailwind CSS (estilização)

## 🚀 Como Executar

### Pré-requisitos

- Node.js (v18+)
- npm ou yarn
- Backend da aplicação em execução

### Instalação

```bash
# Clone o repositório
git clone https://github.com/antigx/mega-to-do-list-front.git

# Acesse a pasta do projeto
cd mega-to-do-list-front

# Instale as dependências
npm install
# ou
yarn install
```

### Configuração

Crie um arquivo `.env` na raiz do projeto com o url base da api baseado no `.envexample`:

```env
VITE_API_URL=http://localhost:3000
```

### Executando a aplicação

```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em: [http://localhost:5173](http://localhost:5173)

## 📂 Estrutura de Arquivos

```
mega-to-do-list-front/
├── public/              # Arquivos estáticos
├── src/
│   ├── assets/          # Recursos estáticos (imagens, fonts)
│   ├── components/      # Componentes reutilizáveis
│   ├── hooks/           # Custom hooks
│   ├── pages/           # Páginas da aplicação
│   ├── services/        # Lógica de chamadas à API
│   ├── styles/          # Estilos globais
│   ├── types/           # Tipos TypeScript
│   ├── utils/           # Utilitários
│   ├── App.tsx          # Componente raiz
│   └── main.tsx         # Ponto de entrada
├── .env.example         # Exemplo de variáveis de ambiente
├── package.json         # Dependências e scripts
├── tsconfig.json        # Configuração do TypeScript
└── vite.config.ts       # Configuração do Vite
```

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

## ✉️ Contato

Link do Projeto: [https://github.com/seu-usuario/mega-to-do-list-front](https://github.com/seu-usuario/mega-to-do-list-front)
