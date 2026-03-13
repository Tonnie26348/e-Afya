import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper to simulate the existing API structure for minimal code changes
export const api = {
  get: async (path: string) => {
    const table = path.replace(/^\//, '').split('/')[0];
    
    if (table === 'patients') {
      const { data, error } = await supabase.from('patients').select('*');
      if (error) throw error;
      return { data: { success: true, data } };
    }
    
    if (table === 'hospitals') {
      const { data, error } = await supabase
        .from('hospitals')
        .select('*, hospital_capacity(total_beds, available_beds, icu_beds, available_icu_beds, specialists_available)');
      if (error) throw error;
      return { data: { success: true, data } };
    }
    
    if (table === 'inventory') {
      const { data, error } = await supabase.from('drug_inventory').select('*, hospitals(name)');
      if (error) throw error;
      return { data: { success: true, data } };
    }

    if (table === 'reports') {
      const { data, error } = await supabase.from('chw_reports').select('*, patients(name)');
      if (error) throw error;
      return { data: { success: true, data } };
    }

    throw new Error(`Path ${path} not implemented in direct Supabase mode`);
  },

  post: async (path: string, body: any) => {
    const segments = path.replace(/^\//, '').split('/');
    const table = segments[0];

    if (table === 'patients') {
      const { data, error } = await supabase.from('patients').insert(body).select().single();
      if (error) throw error;
      return { data: { success: true, data } };
    }

    if (table === 'hospitals' && segments[1] === 'referrals') {
      const { data, error } = await supabase.from('referrals').insert(body).select().single();
      if (error) throw error;
      return { data: { success: true, data } };
    }

    throw new Error(`POST ${path} not implemented in direct Supabase mode`);
  },

  put: async (path: string, body: any) => {
    const segments = path.replace(/^\//, '').split('/');
    const table = segments[0];
    const id = segments[1];

    if (table === 'inventory') {
      const { data, error } = await supabase.from('drug_inventory').update(body).eq('id', id).select().single();
      if (error) throw error;
      return { data: { success: true, data } };
    }

    throw new Error(`PUT ${path} not implemented in direct Supabase mode`);
  }
};

export default api;
