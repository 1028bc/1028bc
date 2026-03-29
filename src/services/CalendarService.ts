export interface JobNode {
  id?: string;
  title: string;
  location: string;
  coords?: [number, number];
  date?: string;
  contact?: string;
  tools?: string;
  brand?: string;
}

// Helper: Delay to prevent OpenStreetMap API from blocking us (Rate Limit: 1 req/sec)
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper: Geocode a text address into [Lat, Lng]
const geocodeAddress = async (address: string): Promise<[number, number] | undefined> => {
  if (!address || address.trim() === '') return undefined;
  
  // Clean up Outlook's escaped commas
  const cleanAddress = address.replace(/\\,/g, ',').trim();
  const cacheKey = `1028bc_geo_${cleanAddress}`;
  
  // 1. Check Local Cache (Instant Load)
  const cached = localStorage.getItem(cacheKey);
  if (cached) return JSON.parse(cached);

  // 2. Fetch from OpenStreetMap Nominatim
  try {
    await sleep(1000); // Respect Nominatim's strict 1 req/sec limit
    console.log(`[GEO-ENGINE] Locating: ${cleanAddress}...`);
    
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cleanAddress)}`);
    const data = await res.json();
    
    if (data && data.length > 0) {
      const coords: [number, number] = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      localStorage.setItem(cacheKey, JSON.stringify(coords));
      return coords;
    } else {
      console.warn(`[GEO-ENGINE] Failed to locate coordinates for: ${cleanAddress}`);
    }
  } catch (e) {
    console.error(`[GEO-ENGINE] API Error geocoding ${cleanAddress}`, e);
  }
  
  return undefined;
};

// Helper: Parse Raw ICS String
const parseICS = (icsString: string) => {
  // Unfold multi-line strings (ICS standard)
  const unfolded = icsString.replace(/\r\n\s/g, '');
  const lines = unfolded.split('\r\n');
  const events: any[] = [];
  let currentEvent: any = null;

  for (const line of lines) {
    if (line.startsWith('BEGIN:VEVENT')) {
      currentEvent = {};
    } else if (line.startsWith('END:VEVENT')) {
      if (currentEvent && currentEvent.title) {
        events.push(currentEvent);
      }
      currentEvent = null;
    } else if (currentEvent) {
      if (line.startsWith('SUMMARY:')) {
        currentEvent.title = line.substring(8);
      } else if (line.startsWith('LOCATION:')) {
        currentEvent.location = line.substring(9).replace(/\\,/g, ',');
      } else if (line.startsWith('DTSTART')) {
        const parts = line.split(':');
        if (parts.length > 1) {
          const dt = parts[1];
          if (dt.length >= 8) {
            // Format to YYYY-MM-DD
            currentEvent.date = `${dt.substring(0,4)}-${dt.substring(4,6)}-${dt.substring(6,8)}`;
          }
        }
      }
    }
  }
  return events;
};

export const CalendarService = {
  async fetchRollingWindow(icsUrl: string) {
    try {
      console.log("[SYNC] Initiating Outlook ICS Uplink...");
      
      // Use AllOrigins to bypass strict CORS blocks from Outlook
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(icsUrl)}`;
      const response = await fetch(proxyUrl);
      const icsData = await response.text();

      const events = parseICS(icsData);
      const futureEvents: JobNode[] = [];
      const now = new Date();
      now.setHours(0,0,0,0); // Start of today

      for (const ev of events) {
        if (!ev.date) continue;
        const eventDate = new Date(ev.date + 'T00:00:00');
        
        // Only process today and future events
        if (eventDate >= now) {
          // Attempt to extract a Work Order number, fallback to generic
          const woMatch = ev.title.match(/(WO-\d+)/i);
          const woNumber = woMatch ? woMatch[1] : `WO-${Math.floor(Math.random() * 9000) + 1000}`;

          const coords = ev.location ? await geocodeAddress(ev.location) : undefined;

          // Deduce generic dossier info based on title context
          let brand = "TGoTG Client";
          let tools = "Standard Field Kit";
          if (ev.title.toLowerCase().includes('starbucks')) brand = "Starbucks Retail";
          if (ev.title.toLowerCase().includes('printer')) tools = "Toolkit, Toner Vacuum";
          
          futureEvents.push({
            id: woNumber,
            title: ev.title,
            location: ev.location || "Location TBD",
            date: ev.date,
            coords: coords,
            brand: brand,
            tools: tools,
            contact: "Site Manager"
          });
        }
      }

      // Sort chronologically
      futureEvents.sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime());

      console.log(`[SYNC] Completed. Found ${futureEvents.length} upcoming actionable nodes.`);

      return {
        past: [],
        future: futureEvents,
        lastSync: new Date().toISOString()
      };

    } catch (error) {
      console.error("[SYNC] Outlook Uplink Failed:", error);
      return null;
    }
  }
};