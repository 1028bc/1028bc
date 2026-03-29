import { supabase } from '../supabaseClient';

export const pushToContextKeep = async (category: string, subject: string, details: string) => {
  const activeId = localStorage.getItem('1028bc_last_active_id');
  
  const payload = {
    identity_id: activeId || 'UNKNOWN_NODE',
    category: category,
    subject: subject,
    details: details,
    timestamp: new Date().toISOString()
  };

  try {
    // Write directly to your Supabase memory bank
    const { data, error } = await supabase
      .from('system_state')
      .insert([
        { 
          key: `ctx_${Date.now()}_${category}`, 
          data: payload 
        }
      ]);

    if (error) throw error;
    
    console.log(`> [FLUX] Context synced to Supabase: ${category}`);
    return data;
  } catch (error) {
    console.error("> [FLUX] CONTEXTKEEP_SYNC_ERROR:", error);
    return null;
  }
};