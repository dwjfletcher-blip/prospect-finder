const ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://z.overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.openstreetmap.ru/api/interpreter',
  'https://overpass.nchc.org.tw/api/interpreter',
];

async function tryEndpoint(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    body,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    signal: AbortSignal.timeout(8000),
  });
  if (res.status === 429) throw new Error('rate_limited');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { query } = req.body;
  if (!query) return res.status(400).json({ error: 'Missing query' });

  const body = 'data=' + encodeURIComponent(query);

  try {
    const data = await Promise.any(ENDPOINTS.map(url => tryEndpoint(url, body)));
    return res.status(200).json(data);
  } catch (e) {
    const isRateLimited = e instanceof AggregateError &&
      e.errors.every(err => err.message === 'rate_limited');
    return res.status(502).json({ error: isRateLimited ? 'rate_limited' : 'all_failed' });
  }
}
