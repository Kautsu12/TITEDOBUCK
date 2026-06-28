# Bucky Hub ★

Site de nicho para uma criadora de conteúdo fã do Bucky Barnes (Soldado Invernal / Capitão América).
Blog (teorias, análises, guias, fanfics) + vitrine de produtos com links de afiliados.

## Stack

- **Astro** — focado em conteúdo, rápido e ótimo para SEO
- **Tailwind CSS** — estilização
- **Markdown / MDX** — conteúdo sem banco de dados
- **Vercel** — hospedagem

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:4321`.

```bash
npm run build     # gera o site em dist/
npm run preview   # pré-visualiza o build
```

## Estrutura

```
.
├── astro.config.mjs        # integrações (Tailwind, MDX, Sitemap) e URL do site
├── tailwind.config.mjs     # paleta e fontes
├── vercel.json             # config de deploy
├── public/                 # imagens e estáticos (favicon, /produtos, /blog)
└── src/
    ├── config.ts           # título, redes sociais, aviso de afiliado  ← EDITE AQUI
    ├── layouts/
    │   └── BaseLayout.astro # HTML base + SEO/Open Graph
    ├── components/
    │   ├── Header.astro
    │   ├── Footer.astro     # links de redes sociais
    │   ├── ProductCard.astro # card de afiliado
    │   └── BlogCard.astro
    ├── content/
    │   ├── config.ts        # schemas das coleções (blog e produtos)
    │   ├── blog/            # posts em .md  ← adicione artigos aqui
    │   └── produtos/        # produtos em .md ← adicione produtos aqui
    └── pages/
        ├── index.astro      # Home (hero + último post + vitrine)
        ├── blog/index.astro
        ├── blog/[...slug].astro
        ├── loja.astro
        └── sobre.astro
```

## Como adicionar conteúdo

### Novo post do blog
Crie um arquivo em `src/content/blog/meu-post.md`:

```md
---
title: "Título do post"
description: "Resumo curto."
pubDate: 2026-06-27
category: "teoria"   # teoria | analise | guia | fanfic
cover: "/blog/minha-capa.jpg"   # opcional
---

Escreva o conteúdo em Markdown aqui.
```

### Novo produto de afiliado
Crie um arquivo em `src/content/produtos/meu-produto.md`:

```md
---
title: "Nome do produto"
description: "Descrição curta."
type: "action-figure"   # hq | filme | action-figure | livro | geral
price: "R$ 249,90"
image: "/produtos/minha-imagem.jpg"
affiliateUrl: "https://www.amazon.com.br/dp/XXXX?tag=SEU-TAG-20"
store: "Amazon"
featured: true          # true = aparece na vitrine da Home
order: 1
---
```

> O link de afiliado vai inteiro no campo `affiliateUrl`, já com a sua tag
> (ex.: `?tag=SEU-TAG-20` da Amazon Associados). Os botões usam
> `rel="sponsored nofollow noopener"`, que é a boa prática para afiliados.

## Antes de publicar

1. Em `src/config.ts`: troque `SOCIAL.twitter` e `SOCIAL.tiktok` pelas suas URLs.
2. Em `astro.config.mjs`: troque `site` pelo domínio final (importante para SEO/sitemap).
3. Adicione as imagens em `public/produtos/` e `public/blog/`.

## Deploy na Vercel

1. Suba o projeto para um repositório no GitHub.
2. Em vercel.com, **Add New → Project** e importe o repositório.
3. A Vercel detecta o Astro automaticamente (build `astro build`, output `dist`). É só clicar em **Deploy**.

O site está publicado em: **https://tietedobuck.vercel.app**

## Painel de postagem (sem mexer em código)

O arquivo `.pages.yml` já configura um painel visual via **Pages CMS**. Para a
gestora postar como num editor de texto:

1. Acesse **https://app.pagescms.org** e entre com a conta do **GitHub**.
2. Autorize o acesso ao repositório `Kautsu12/TITEDOBUCK`.
3. Pronto: aparecem as seções **Blog e Histórias** e **Loja (recomendações)**.
   Escrever um post ou cadastrar um produto e salvar publica direto no site
   (a Vercel reconstrói sozinha em ~1 min).

## Comentários no blog (Giscus)

1. No GitHub, abra o repositório → **Settings** → marque **Discussions**.
2. Instale o app: **https://github.com/apps/giscus** → habilite no repositório.
3. Em **https://giscus.app**, informe `Kautsu12/TITEDOBUCK`, mapeamento **pathname**
   e uma categoria (ex.: crie "Comentários").
4. Copie o `data-repo-id` e o `data-category-id` gerados para `src/config.ts`
   (objeto `GISCUS`). Enquanto não preencher, a seção de comentários fica oculta.

## Personalização rápida (`src/config.ts`)

- `SOCIAL.tiktok` e `SOCIAL.twitter`: links das redes.
- `CONTACT_EMAIL`: e-mail de contato no rodapé (deixe `''` para esconder).
- `GISCUS`: IDs dos comentários (ver acima).
