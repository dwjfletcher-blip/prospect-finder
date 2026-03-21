const ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://z.overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.openstreetmap.ru/api/interpreter',
  'https://overpass.nchc.org.tw/api/interpreter',
];

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { query } = req.body;
  if (!query) return res.status(400).json({ error: 'Missing query' });

  let lastError = 'No endpoints tried';

  for (const url of ENDPOINTS) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: 'data=' + encodeURIComponent(query),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        signal: AbortSignal.timeout(25000),
      });

      if (response.status === 429) { lastError = 'rate_limited'; continue; }
      if (!response.ok) { lastError = `HTTP ${response.status} from ${url}`; continue; }

      const data = await response.json();
      return res.status(200).json(data);
    } catch (e) {
      lastError = `${e.name}: ${e.message} (${url})`;
      continue;
    }
  }

  return res.status(502).json({ error: lastError });
}
