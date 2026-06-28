import { defineConfig } from 'tinacms';

// Painel de edição em /admin com login por e-mail (via TinaCloud).
// Preencha as variáveis no painel da Vercel: TINA_CLIENT_ID e TINA_TOKEN.
const branch =
  process.env.TINA_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  'main';

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: '',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'config',
        label: '⚙️ Configurações do site',
        path: 'src/data',
        format: 'json',
        match: { include: 'site' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'title', label: 'Nome do site' },
          { type: 'string', name: 'tagline', label: 'Frase principal (aparece grande na home)' },
          { type: 'string', name: 'description', label: 'Descrição (SEO e subtítulo)', ui: { component: 'textarea' } },
          { type: 'string', name: 'tiktok', label: 'Link do TikTok' },
          { type: 'string', name: 'twitter', label: 'Link do X (Twitter)' },
          { type: 'string', name: 'contactEmail', label: 'E-mail de contato' },
        ],
      },
      {
        name: 'blog',
        label: 'Blog e Histórias',
        path: 'src/content/blog',
        format: 'md',
        fields: [
          { type: 'string', name: 'title', label: 'Título', isTitle: true, required: true },
          { type: 'string', name: 'description', label: 'Resumo (aparece nos cards)' },
          { type: 'datetime', name: 'pubDate', label: 'Data de publicação' },
          {
            type: 'string',
            name: 'category',
            label: 'Categoria',
            options: [
              { value: 'teoria', label: 'Teoria' },
              { value: 'analise', label: 'Análise de filme' },
              { value: 'guia', label: 'Guia de leitura' },
              { value: 'fanfic', label: 'História não oficial (fanfic)' },
            ],
          },
          { type: 'image', name: 'cover', label: 'Imagem de capa (opcional)' },
          { type: 'boolean', name: 'draft', label: 'Rascunho? (marque para NÃO publicar ainda)' },
          { type: 'rich-text', name: 'body', label: 'Conteúdo', isBody: true },
        ],
      },
      {
        name: 'produtos',
        label: 'Loja (recomendações)',
        path: 'src/content/produtos',
        format: 'md',
        fields: [
          { type: 'string', name: 'title', label: 'Nome do produto', isTitle: true, required: true },
          { type: 'string', name: 'description', label: 'Descrição curta' },
          {
            type: 'string',
            name: 'type',
            label: 'Tipo',
            options: [
              { value: 'hq', label: 'HQ' },
              { value: 'filme', label: 'Filme / Série' },
              { value: 'action-figure', label: 'Action Figure' },
              { value: 'livro', label: 'Livro' },
              { value: 'geral', label: 'Geral' },
            ],
          },
          { type: 'string', name: 'price', label: 'Preço (ex.: R$ 99,90)' },
          { type: 'image', name: 'image', label: 'Imagem do produto' },
          { type: 'string', name: 'affiliateUrl', label: 'Link de afiliado (Amazon etc.)' },
          { type: 'string', name: 'store', label: 'Loja (ex.: Amazon)' },
          { type: 'boolean', name: 'featured', label: 'Destacar na página inicial?' },
          { type: 'number', name: 'order', label: 'Ordem de exibição (número)' },
          { type: 'rich-text', name: 'body', label: 'Conteúdo (opcional)', isBody: true },
        ],
      },
    ],
  },
});
