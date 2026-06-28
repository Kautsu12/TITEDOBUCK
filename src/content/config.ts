import { defineCollection, z } from 'astro:content';

// Blog: teorias, análises, guias de leitura e fanfics.
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    // Categorias sugeridas: 'teoria' | 'analise' | 'guia' | 'fanfic'
    category: z.enum(['teoria', 'analise', 'guia', 'fanfic']).default('teoria'),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// Produtos: cada arquivo .md é um item da vitrine de afiliados.
const produtos = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Tipo: 'hq' | 'filme' | 'action-figure' | 'livro' | 'geral'
    type: z.enum(['hq', 'filme', 'action-figure', 'livro', 'geral']).default('geral'),
    price: z.string().optional(), // ex.: "R$ 149,90"
    image: z.string(), // caminho em /public ou URL
    affiliateUrl: z.string().url(), // link de afiliado (Amazon e outros)
    store: z.string().default('Amazon'),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = { blog, produtos };
