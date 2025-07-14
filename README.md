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

## 📋 Seções Implementadas

1. **Hero Section** - Value proposition principal com CTA
2. **Benefits** - 4 benefícios-chave da SoluSix
3. **Product Catalog** - Catálogo com busca e filtros
4. **Experience** - Timeline 30+ anos de experiência
5. **Testimonials** - Depoimentos de clientes
6. **How It Works** - 3 passos simples
7. **AutoReposição** - Banner do programa de economia
8. **FAQ** - Perguntas frequentes
9. **Footer** - Informações completas da empresa

## 🛠️ Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Framer Motion** - Animações suaves
- **Lucide React** - Ícones modernos

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

### 3. Execute em desenvolvimento

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🚀 Deploy

### Vercel (Recomendado)

1. **Conecte ao GitHub**:
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com sua conta GitHub
   - Clique em "New Project"

2. **Importe o repositório**:
   - Selecione o repositório `solusix-landing`
   - Vercel detectará automaticamente as configurações Next.js

3. **Configure as variáveis de ambiente** (opcional):

   ```env
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
│   └── utils.ts          # Funções auxiliares
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
