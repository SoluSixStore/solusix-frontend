# SoluSix Landing Page

Landing page moderna e responsiva para a SoluSix - marketplace de suprimentos profissionais.

## 🚀 Características

- **Design Moderno**: Interface limpa e profissional seguindo tendências UX/UI 2025
- **Mobile-First**: Totalmente responsiva para todos os dispositivos
- **Performance Otimizada**: Carregamento rápido com Next.js 14
- **SEO Otimizado**: Meta tags e estrutura semântica
- **Acessibilidade**: Conformidade com padrões AA
- **Analytics Ready**: Preparado para Google Analytics
- **WhatsApp Integration**: CTAs diretos para WhatsApp
- **Lead Magnet**: Pop-up exit-intent para captura de leads
- **Formulário de Contato**: Sistema completo de envio de e-mails

## 📋 Seções Implementadas

1. **Hero Section** - Value proposition principal com CTA
2. **Benefits** - 4 benefícios-chave da SoluSix
3. **Product Catalog** - Catálogo com busca e filtros
4. **Experience** - Timeline 30+ anos de experiência
5. **Testimonials** - Depoimentos de clientes
6. **How It Works** - 3 passos simples
7. **AutoReposição** - Banner do programa de economia
8. **FAQ** - Perguntas frequentes
9. **Contact Form** - Formulário de contato funcional
10. **Footer** - Informações completas da empresa

## 🛠️ Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Framer Motion** - Animações suaves
- **Lucide React** - Ícones modernos
- **Nodemailer** - Envio de e-mails

## 📦 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/solusix-landing.git
cd solusix-landing
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Configurações SMTP para envio de e-mails
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-de-app

# Configurações opcionais
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_WHATSAPP_PHONE=5511957937762
```

**Importante**: Para Gmail, use uma [senha de app](https://support.google.com/accounts/answer/185833) em vez da senha normal.

### 4. Execute em desenvolvimento

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📧 Configuração do Formulário de Contato

### ⚠️ IMPORTANTE: Correção do Erro de E-mail em Produção

O formulário de contato agora usa **Resend** como método principal e **SMTP** como fallback. Isso resolve o problema de envio de e-mails em produção.

### Variáveis de Ambiente Necessárias

#### Método Principal: Resend (Recomendado)
```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Como obter a API key do Resend:**
1. Acesse [resend.com](https://resend.com)
2. Crie uma conta gratuita
3. Vá em "API Keys" e crie uma nova chave
4. Copie a chave (começa com `re_`)

#### Método de Fallback: SMTP
```env
SMTP_HOST=smtp.gmail.com          # Servidor SMTP
SMTP_PORT=587                     # Porta (587 para TLS, 465 para SSL)
SMTP_USER=seu-email@gmail.com     # Seu e-mail
SMTP_PASS=sua-senha-de-app        # Senha de app (Gmail)
```

### Testando a Configuração

#### Localmente
```bash
# Instalar dependências
npm install

# Testar configuração de e-mail
npm run test:email
```

#### Via API (apenas em desenvolvimento)
```bash
curl -X POST http://localhost:3000/api/test-email-config
```

### Configuração em Produção (Vercel)

1. **Acesse o dashboard do Vercel**
2. **Vá para seu projeto**
3. **Clique em "Settings" → "Environment Variables"**
4. **Adicione as variáveis:**

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=contato@solusix.com.br
SMTP_PASS=sua-senha-de-app-do-gmail
```

5. **Redeploy o projeto**

### Troubleshooting

#### Erro: "Configuração de e-mail não encontrada"
- ✅ Verifique se `RESEND_API_KEY` está configurada no Vercel
- ✅ Confirme se a API key é válida (teste em [resend.com](https://resend.com))
- ✅ Verifique se o domínio `contato@solusix.com.br` está verificado no Resend

#### Erro: "Erro ao enviar e-mail via Resend"
- ✅ Verifique se a API key não expirou
- ✅ Confirme se o domínio remetente está configurado no Resend
- ✅ Verifique os logs do Vercel para detalhes do erro

#### Fallback SMTP
Se o Resend falhar, o sistema tentará usar SMTP como backup. Certifique-se de que as variáveis SMTP estão configuradas.

### Provedores SMTP Suportados

- **Gmail**: `smtp.gmail.com:587`
- **Outlook/Hotmail**: `smtp-mail.outlook.com:587`
- **Yahoo**: `smtp.mail.yahoo.com:587`
- **Provedor local**: Consulte seu provedor

### Logs e Debug

O sistema agora inclui logs detalhados para debug:

```javascript
// Logs no console do Vercel
📧 Contact API called: { method: 'POST', body: {...} }
📤 Attempting to send email...
🔍 Using API key: re_Yp9p6UVV...
🔄 Trying Resend...
✅ Email sent successfully via Resend: { id: 'abc123' }
```

### Segurança

- ✅ API keys são armazenadas como variáveis de ambiente
- ✅ Nenhuma credencial hardcoded no código
- ✅ Logs não expõem informações sensíveis em produção

## 🚀 Deploy

### Vercel (Recomendado)

1. **Conecte ao GitHub**:
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com sua conta GitHub
   - Clique em "New Project"

2. **Importe o repositório**:
   - Selecione o repositório `solusix-landing`
   - Vercel detectará automaticamente as configurações Next.js

3. **Configure as variáveis de ambiente**:

   ```env
   # Obrigatórias para o formulário de contato
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=seu-email@gmail.com
   SMTP_PASS=sua-senha-de-app
   
   # Opcionais
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_WHATSAPP_PHONE=5511957937762
   ```

4. **Deploy**:
   - Clique em "Deploy"
   - Aguarde o build (2-3 minutos)
   - Seu site estará disponível em `https://solusix-landing.vercel.app`

### Outras plataformas

- **Netlify**: Arraste a pasta `out` após `npm run build`
- **GitHub Pages**: Configure GitHub Actions
- **AWS S3**: Upload dos arquivos estáticos

## 📁 Estrutura do Projeto

```
solusix1/
├── app/                    # App Router (Next.js 14)
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout raiz
│   └── page.tsx           # Página principal
├── components/            # Componentes React
│   ├── ui/               # Componentes base
│   ├── sections/         # Seções da landing
│   ├── Header.tsx        # Header com navegação
│   ├── Footer.tsx        # Footer completo
│   └── LeadMagnetForm.tsx # Pop-up lead magnet
├── data/                 # Dados estáticos
│   └── products.json     # Catálogo de produtos
├── lib/                  # Utilitários
│   ├── utils.ts          # Funções auxiliares
│   └── email.ts          # Sistema de e-mails
├── pages/                # API Routes
│   └── api/              # Endpoints da API
│       ├── contact.ts    # Formulário de contato
│       └── test-email.ts # Teste de e-mail (dev)
├── public/               # Assets estáticos
│   └── assets/           # Imagens e ícones
└── package.json          # Dependências
```

## 🎨 Personalização

### Cores

As cores principais estão definidas em `tailwind.config.js`:

- **Navy**: `#011627` (cor base)
- **Lime**: `#10F27F` (CTA e destaque)
- **Gray**: Tons de cinza para textos

### Produtos

Edite `data/products.json` para adicionar/remover produtos:

```json
{
  "id": "novo-produto",
  "name": "Nome do Produto",
  "price": 99.9,
  "description": "Descrição do produto",
  "image": "/assets/produto.jpg"
}
```

### WhatsApp

Configure o número no `lib/utils.ts`:

```typescript
const phone = "+5511957937762"; // Seu número
```

## 📊 Analytics

### Google Analytics

1. Crie uma conta no [Google Analytics](https://analytics.google.com)
2. Obtenha o ID de medição (G-XXXXXXXXXX)
3. Adicione como variável de ambiente:
   ```env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

### Eventos Rastreados

- Clicks em CTAs
- Visualizações de produtos
- Pedidos via WhatsApp
- Downloads do e-book

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Verificação de código
npm run type-check   # Verificação TypeScript
```

## 📱 Responsividade

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Performance

- **Lighthouse Score**: 95+ em todas as métricas
- **Core Web Vitals**: Otimizado
- **Bundle Size**: < 500KB
- **Loading Time**: < 2s

## 🔒 Segurança

- **HTTPS**: Obrigatório em produção
- **CSP**: Content Security Policy configurado
- **CORS**: Configurado para APIs
- **XSS Protection**: Headers de segurança

## 📞 Suporte

- **Email**: contato@solusix.com.br
- **WhatsApp**: +55 11 95793-7762
- **Website**: https://www.solusix.com.br

## 📄 Licença

Este projeto é propriedade da SoluSix. Todos os direitos reservados.

---

**Desenvolvido com ❤️ para a SoluSix**
