// Configurações centrais do site.
// Os campos editáveis pela gestora (no painel) ficam em src/data/site.json.
import site from './data/site.json';

export const SITE = {
  title: site.title,
  tagline: site.tagline,
  description: site.description,
  author: 'Sua Amiga',
};

// Links sociais — editáveis no painel (src/data/site.json).
export const SOCIAL = {
  twitter: site.twitter,
  tiktok: site.tiktok,
};

// E-mail de contato exibido no rodapé (deixe vazio '' para esconder).
export const CONTACT_EMAIL = site.contactEmail;

// Comentários do blog (Giscus). Preencha repoId e categoryId seguindo o README.
// Enquanto estiverem como 'COLE_...', a seção de comentários fica oculta.
export const GISCUS = {
  repo: 'Kautsu12/TITEDOBUCK',
  repoId: 'COLE_O_REPO_ID_AQUI',
  category: 'Comentários',
  categoryId: 'COLE_O_CATEGORY_ID_AQUI',
};

// Aviso de afiliado exibido perto dos produtos (exigência dos programas, ex.: Amazon Associados).
export const AFFILIATE_DISCLOSURE =
  'Como Associada da Amazon, posso receber comissões por compras qualificadas feitas pelos links desta página, sem custo extra para você.';
