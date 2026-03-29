// src/hooks/useContextKeep.ts

export const useContextKeep = () => {
    const saveState = async (key: string, data: any) => {
      try {
        // Stripped localhost:5000 so it uses the Vite proxy
        const response = await fetch('/api/memories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key, data })
        });
        return await response.json();
      } catch (err) {
        console.error("ContextKeep Uplink Failed", err);
      }
    };
  
    const loadState = async (key: string) => {
      try {
        // Stripped localhost:5000 so it uses the Vite proxy
        const response = await fetch(`/api/memories/${key}`);
        return await response.json();
      } catch (err) {
        console.error("ContextKeep Retrieval Failed", err);
      }
    };
  
    return { saveState, loadState };
  };