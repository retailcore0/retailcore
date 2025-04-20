# Instruções de Uso do Design de Login RetailCore

Este pacote contém todos os arquivos necessários para implementar o design da página de login do RetailCore em qualquer projeto Next.js.

## Conteúdo do Pacote

```
backup-design-login/
├── app/
│   └── auth/               # Componentes de autenticação
│       ├── layout.tsx      # Layout com integração do Spline
│       └── login/
│           └── page.tsx    # Página de login com o formulário
├── lib/
│   ├── globals.css         # Estilos globais CSS
│   ├── tailwind.config.js  # Configuração do Tailwind CSS
│   └── types.d.ts          # Definições de tipos TypeScript
├── public/
│   └── logo-retail-core2.png  # Logo da marca
├── package.json            # Dependências do projeto
├── README.md               # Documentação básica
└── INSTRUÇÕES-DE-USO.md    # Este arquivo
```

## Como Implementar Este Design em Outro Projeto

### 1. Dependências Obrigatórias

Certifique-se de que seu projeto tem as seguintes dependências:

```bash
npm install @splinetool/react-spline @splinetool/runtime
npm install tailwindcss tailwindcss-animate
npm install lucide-react
npm install next
```

### 2. Integração da Estrutura

1. **Copie os arquivos para seu projeto:**
   - Copie a pasta `app/auth` para a pasta `app` do seu projeto
   - Copie os arquivos da pasta `lib` para a pasta equivalente do seu projeto
   - Copie o logo da pasta `public` para a pasta `public` do seu projeto

2. **Configure o Tailwind CSS:**
   - Certifique-se que as configurações do `tailwind.config.js` estejam integradas com a configuração do seu projeto
   - Importe os estilos globais do `globals.css` no seu arquivo principal de estilos

3. **Configure tipos TypeScript:**
   - Copie as definições de tipo do arquivo `types.d.ts` para seu projeto

### 3. Personalização

1. **Para alterar o modelo 3D do Spline:**
   - No arquivo `app/auth/layout.tsx`, altere a URL do Spline na linha:
     ```typescript
     viewer.setAttribute('url', 'https://prod.spline.design/wej9c1a4kWoa79Tq/scene.splinecode');
     ```

2. **Para alterar o logo:**
   - Substitua o arquivo `logo-retail-core2.png` em sua pasta `public`
   - Ou altere os caminhos nos componentes onde o logo é exibido

3. **Para alterar cores e estilos:**
   - Edite as variáveis CSS no arquivo `globals.css`
   - Ou modifique diretamente as classes Tailwind nos componentes

### 4. Integração com Autenticação

Este é um template de design que precisa ser conectado ao seu sistema de autenticação.

1. **Para conectar com seu backend:**
   - Modifique a função `handleSubmit` no arquivo `app/auth/login/page.tsx`
   - Substitua a parte de simulação pelo código de autenticação real
   - Ajuste os redirecionamentos conforme seu fluxo de aplicação

2. **Para formulários customizados:**
   - O formulário está preparado para trabalhar com React Hook Form
   - Você pode adicionar validações Zod adicionais conforme necessário

## Solução de Problemas

### Problema com o Spline

Se o Spline não carregar corretamente:

1. Verifique se o URL do Spline está acessível
2. Certifique-se de que os scripts do Spline estão sendo carregados corretamente
3. Verifique os logs do console para erros

### Problemas de Estilo

Se os estilos não forem aplicados corretamente:

1. Verifique se o Tailwind CSS está configurado corretamente
2. Certifique-se de que os arquivos CSS globais estão sendo importados
3. Verifique se não há conflitos de classe em seu projeto

## Suporte

Para dúvidas ou problemas, consulte a documentação completa ou entre em contato com a equipe de suporte RetailCore. 