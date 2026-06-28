// Busca automática de recomendações sobre o Bucky / Soldado Invernal.
// Fonte principal: Google Books (NÃO precisa de chave) — cobre HQs/graphic novels e livros.
// A lista curada (seed-hqs.json / seed-livros.json) é a base fixa: nunca some.
// A rotina semanal (GitHub Action) acrescenta novidades por cima, sem repetir.
// Rodar localmente: npm run atualizar

import { writeFile, mkdir, readFile } from 'node:fs/promises';

const DATA = new URL('../src/data/', import.meta.url);
const TAG = process.env.AMAZON_TAG || '';

const amazon = (t) =>
  `https://www.amazon.com.br/s?k=${encodeURIComponent(t)}${TAG ? `&tag=${TAG}` : ''}`;

const norm = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

// Segurança: só aceita URLs http(s). Bloqueia javascript:, data:, etc. vindos de fontes externas.
const safeUrl = (u) => (/^https?:\/\//i.test(u || '') ? u : '');

async function readJson(name, fallback) {
  try {
    return JSON.parse(await readFile(new URL(name, DATA), 'utf8'));
  } catch {
    return fallback;
  }
}

async function googleBooks(query) {
  const key = process.env.GOOGLE_BOOKS_KEY ? `&key=${process.env.GOOGLE_BOOKS_KEY}` : '';
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=20&printType=books&orderBy=relevance${key}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const j = await r.json();
  return (j.items || [])
    .map((it) => {
      const v = it.volumeInfo || {};
      return {
        title: v.title,
        description: (v.description || (v.authors ? `Por ${v.authors.join(', ')}` : ''))
          .replace(/\s+/g, ' ')
          .slice(0, 180),
        image: safeUrl((v.imageLinks?.thumbnail || v.imageLinks?.smallThumbnail || '').replace('http://', 'https://')),
        url: safeUrl(TAG ? amazon(v.title || '') : (v.infoLink || amazon(v.title || ''))),
        store: TAG ? 'Amazon' : 'Google Books',
        categories: v.categories || [],
      };
    })
    .filter((x) => x.title && x.url);
}

function merge(seed, fresh, max = 16) {
  const seen = new Set(seed.map((x) => norm(x.title)));
  const out = [...seed];
  for (const item of fresh) {
    const k = norm(item.title);
    if (k && !seen.has(k)) {
      seen.add(k);
      out.push({ title: item.title, description: item.description, image: item.image, url: item.url, store: item.store });
    }
  }
  return out.slice(0, max);
}

async function main() {
  await mkdir(DATA, { recursive: true });
  const seedHqs = await readJson('seed-hqs.json', []);
  const seedLivros = await readJson('seed-livros.json', []);

  let hqsFresh = [];
  let livrosFresh = [];

  try {
    const found = await googleBooks('"Winter Soldier" Marvel');
    hqsFresh = found.filter(
      (x) =>
        /comic|graphic/i.test((x.categories || []).join(' ')) ||
        /winter soldier|soldado invernal|bucky/i.test(x.title)
    );
    console.log(`HQs encontradas: ${hqsFresh.length}`);
  } catch (e) {
    console.error('Erro nas HQs:', e.message);
  }

  try {
    livrosFresh = await googleBooks('Bucky Barnes Marvel Capitão América');
    console.log(`Livros encontrados: ${livrosFresh.length}`);
  } catch (e) {
    console.error('Erro nos livros:', e.message);
  }

  const hqs = merge(seedHqs, hqsFresh);
  const livros = merge(seedLivros, livrosFresh);

  await writeFile(new URL('hqs.json', DATA), JSON.stringify(hqs, null, 2));
  await writeFile(new URL('livros.json', DATA), JSON.stringify(livros, null, 2));
  console.log(`Salvos: ${hqs.length} HQs e ${livros.length} livros.`);
}

main();
