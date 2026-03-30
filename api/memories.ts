// api/memories.ts
import { kv } from '@vercel/kv';

export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  const url = new URL(request.url);
  
  // POST: save state
  if (request.method === 'POST') {
    try {
      const { key, data } = await request.json();
      await kv.set(key, data);
      return new Response(JSON.stringify({ status: 'uplink_confirmed', key }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: 'uplink_failed' }), { status: 500 });
    }
  }

  // GET: load state (handles /api/memories?key=xyz)
  if (request.method === 'GET') {
    const key = url.searchParams.get('key');
    if (!key) return new Response('key required', { status: 400 });
    
    const data = await kv.get(key);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  }

  return new Response('method not allowed', { status: 405 });
}