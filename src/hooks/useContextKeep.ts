export const useContextKeep = () => {
  const saveState = async (key: string, data: any) => {
    try {
      const response = await fetch('/api/memories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, data })
      });
      return await response.json();
    } catch (err) {
      console.error("1028bc uplink failed", err);
    }
  };

  const loadState = async (key: string) => {
    try {
      // passing key as query param for the edge function
      const response = await fetch(`/api/memories?key=${key}`);
      return await response.json();
    } catch (err) {
      console.error("1028bc retrieval failed", err);
    }
  };

  return { saveState, loadState };
};