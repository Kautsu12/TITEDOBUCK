// Busca automática de recomendações sobre o Bucky / Soldado Invernal.
// - HQs: API oficial da Marvel (precisa MARVEL_PUBLIC_KEY e MARVEL_PRIVATE_KEY)
// - Livros: API do Google Books (GOOGLE_BOOKS_KEY é opcional)
// Gera src/data/hqs.json e src/data/livros.json.
// Rodar: npm run atualizar  (ou pela GitHub Action semanal)

import { createHash } from 'node:crypto';
import { writeFile, mkdir } from 'node:fs/promises';

const DATA_DIR = new URL('../src/data/', import.meta.url);
const AMAZON_TAG = process.env.AMAZON_TAG || '';

function amazonSearch(title) {
  const q = encodeURIComponent(title);
  return AMAZON_TAG
    ? `https://www.amazon.com.br/s?k=${q}&tag=${AMAZON_TAG}`
    : `https://www.amazon.com.br/s?k=${q}`;
}

async function fetchMarvelHQs() {
  const pub = process.env.MARVEL_PUBLIC_KEY;
  const priv = process.env.MARVEL_PRIVATE_KEY;
  if (!pub || !priv) {
    console.log('Marvel: chaves ausentes — pulando HQs.');
    return null;
  }
  const ts = Date.now().toString();
  const hash = createHash('md5').update(ts + priv + pub).digest('hex');
  const base = 'https://gateway.marvel.com/v1/public';
  const auth = `ts=${ts}&apikey=${pub}&hash=${hash}`;

  // Encontra o personagem "Winter Soldier" e pega as HQs dele.
  let comics = [];
  try {
    const rc = await fetch(`${base}/characters?name=${encodeURIComponent('Winter Soldier')}&${auth}`);
    const jc = await rc.json();
    const char = jc?.data?.results?.[0];
    if (char) {
      const r = await fetch(`${base}/characters/${char.id}/comics?orderBy=-onsaleDate&limit=12&${auth}`);
      const j = await r.json();
      comics = j?.data?.results || [];
    }
  } catch (e) {
    console.error('Marvel personagem erro:', e.message);
  }

  if (comics.length === 0) {
    const r = await fetch(`${base}/comics?titleStartsWith=${encodeURIComponent('Winter Soldier')}&orderBy=-onsaleDate&limit=12&${auth}`);
    const j = await r.json();
    comics = j?.data?.results || [];
  }

  return comics
    .map((c) => {
      const image = c.thumbnail
        ? `${c.thumbnail.path}.${c.thumbnail.extension}`.replace('http://', 'https://')
        : '';
      const detail = c.urls?.find((u) => u.type === 'detail')?.url;
      return {
        title: c.title,
        description: (c.description || '').replace(/\s+/g, ' ').trim().slice(0, 180),
        image,
        url: AMAZON_TAG ? amazonSearch(c.title) : (detail || amazonSearch(c.title)),
        store: AMAZON_TAG ? 'Amazon' : 'Marvel',
      };
    })
    .filter((x) => x.title && !x.image.includes('image_not_available'));
}

async function fetchBooks() {
  const key = process.env.GOOGLE_BOOKS_KEY ? `&key=${process.env.GOOGLE_BOOKS_KEY}` : '';
  const q = encodeURIComponent('"Winter Soldier" OR "Bucky Barnes" Marvel');
  const url = `https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=12&printType=books${key}`;
  const r = await fetch(url);
  const j = await r.json();
  return (j.items || [])
    .map((it) => {
      const v = it.volumeInfo || {};
      const image = (v.imageLinks?.thumbnail || v.imageLinks?.smallThumbnail || '').replace('http://', 'https://');
      return {
        title: v.title,
        description: (v.description || (v.authors ? `Por ${v.authors.join(', ')}` : '')).slice(0, 180),
        image,
        url: AMAZON_TAG ? amazonSearch(v.title || '') : (v.infoLink || amazonSearch(v.title || '')),
        store: AMAZON_TAG ? 'Amazon' : 'Google Books',
      };
    })
    .filter((x) => x.title);
}

async function main() {
  await mkdir(DATA_DIR, { recursive: true });

  try {
    const hqs = await fetchMarvelHQs();
    if (hqs && hqs.length) {
      await writeFile(new URL('hqs.json', DATA_DIR), JSON.stringify(hqs, null, 2));
      console.log(`HQs: ${hqs.length} itens salvos.`);
    }
  } catch (e) {
    console.error('Erro nas HQs:', e.message);
  }

  try {
    const livros = await fetchBooks();
    if (livros && livros.length) {
      await writeFile(new URL('livros.json', DATA_DIR), JSON.stringify(livros, null, 2));
      console.log(`Livros: ${livros.length} itens salvos.`);
    }
  } catch (e) {
    console.error('Erro nos livros:', e.message);
  }

  console.log('Atualização concluída.');
}

main();
