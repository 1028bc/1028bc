import { kv } from '@vercel/kv';

export default async function handler(req: any, res: any) {
  const { q } = req.query; // The search term

  try {
    // 1. Fetch all keys starting with 'mem_'
    const keys = await kv.keys('mem_*');
    
    if (keys.length === 0) {
      return res.status(200).json([]);
    }

    // 2. Multi-get all memory nodes
    const records = await kv.mget(...keys);
    
    // 3. Filter based on the query (case-insensitive)
    const filtered = records
      .filter((record: any) => {
        if (!q) return true;
        const searchStr = `${record.source} ${record.content}`.toLowerCase();
        return searchStr.includes(q.toLowerCase());
      })
      .sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    res.status(200).json(filtered);
  } catch (error: any) {
    console.error("SEARCH_FAILURE:", error.message);
    res.status(500).json({ error: "FAILED_TO_QUERY_MEMORY" });
  }
}