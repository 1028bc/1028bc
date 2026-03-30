import { kv } from '@vercel/kv';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { url, mode } = req.body;

  try {
    let rawContent = "";

    // 1. HARVESTING: Intelligent Data Capture
    if (mode === 'harvest') {
      rawContent = await callOxylabs(url);
    } else {
      // Upgraded to v2 Engine for clean Markdown output
      rawContent = await callFirecrawl(url);
    }

    // 2. REFINEMENT: Gemini-1.5-Flash Cloud Brain
    const summary = await processWithAI(rawContent);

    // 3. PERSISTENCE: 1028bc Project Memory
    const memoryKey = `mem_${Date.now()}`;
    const memoryNode = {
      source: url,
      content: summary,
      timestamp: new Date().toISOString(),
      type: mode,
      status: 'verified'
    };

    await kv.set(memoryKey, memoryNode);

    res.status(200).json({ 
      status: "SUCCESS", 
      memory_node: memoryKey, 
      summary_preview: summary.substring(0, 150) + "..." 
    });

  } catch (error: any) {
    console.error("INGESTION_FAILURE:", error.message);
    res.status(500).json({ status: "ERROR", message: error.message });
  }
}

// --- AUTOMATION HELPERS ---

async function callOxylabs(targetUrl: string) {
  const auth = Buffer.from(`${process.env.OXYLABS_USERNAME}:${process.env.OXYLABS_PASSWORD}`).toString('base64');
  const response = await fetch('https://realtime.oxylabs.io/v1/queries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${auth}` },
    body: JSON.stringify({ source: 'universal', url: targetUrl })
  });
  
  if (!response.ok) throw new Error(`OXYLABS_UPLINK_FAILED: ${response.statusText}`);
  const data = await response.json();
  return JSON.stringify(data.results[0].content);
}

async function callFirecrawl(targetUrl: string) {
  // Utilizing the v2 endpoint for optimized LLM-ready data
  const response = await fetch('https://api.firecrawl.dev/v2/scrape', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${process.env.FIRECRAWL_API_KEY}` 
    },
    body: JSON.stringify({ 
      url: targetUrl,
      formats: ["markdown"] 
    })
  });
  
  if (!response.ok) throw new Error(`FIRECRAWL_V2_UPLINK_FAILED: ${response.statusText}`);
  const result = await response.json();
  return result.data.markdown || result.data.content;
}

async function processWithAI(content: string) {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GOOGLE_AI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `You are the 1028bc_MASTER intelligence agent. 
          OBJECTIVE: Distill the following content into the 1028bc Project Memory.
          CRITERIA: Extract technical specifications, competitive advantages, urban planning data for SolUrbana, and actionable field service logic. 
          FORMAT: Clean markdown. Zero fluff.
          CONTENT: ${content.substring(0, 25000)}`
        }]
      }]
    })
  });
  
  const data = await response.json();
  if (!data.candidates) throw new Error("GEMINI_CLOUD_REJECTION");
  return data.candidates[0].content.parts[0].text;
}