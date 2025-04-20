# Design de Login RetailCore

Este pacote contém o design completo da página de login do RetailCore, incluindo:

- Layout do formulário de login com design de glassmorphism
- Integração com Spline para efeitos 3D interativos
- Componentes estilizados
- Arquivos estáticos necessários (logo, etc.)

## Estrutura do Pacote

```
backup-design-login/
├── app/
│   ├── components/     # Componentes reutilizáveis
│   └── auth/           # Componentes da página de autenticação
├── lib/                # Utilitários e estilos
├── public/             # Arquivos estáticos (logo, etc.)
└── README.md           # Este arquivo
```

## Como Usar

### 1. Dependências Necessárias

Certifique-se de instalar as seguintes dependências no seu projeto:

```bash
npm install @splinetool/react-spline @splinetool/runtime tailwindcss tailwindcss-animate lucide-react next-auth
```

### 2. Instalação

Copie os arquivos deste pacote para o seu projeto, mantendo a estrutura de diretórios.

### 3. Configuração do Spline

O layout usa um objeto 3D do Spline disponível em:
`https://prod.spline.design/wej9c1a4kWoa79Tq/scene.splinecode`

Para usar um design Spline diferente, altere a URL no arquivo `layout.tsx`.

### 4. Integração com Autenticação

Este design está configurado para funcionar com o Next.js e NextAuth. Para integrar com outros sistemas de autenticação, modifique os handlers de eventos nos componentes.

## Licença

Este design é proprietário e deve ser usado apenas em projetos autorizados.

## Créditos

Design e implementação por RetailCore Team. 