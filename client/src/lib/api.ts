import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ntjcffeglmitewhsdavk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50amNmZmVnbG1pdGV3aHNkYXZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MDQ1NTIsImV4cCI6MjA4ODk4MDU1Mn0.-fe9MlEzsORboT1L3lqJIS4pDc4irPJdAlI1f2mpmDk';

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

  verifyProfessional: async (id: string) => {
    const { data, error } = await supabase
      .from('health_professionals')
      .select('*')
      .eq('professional_id', id)
      .single();
    
    if (error) throw new Error('Professional ID not found in the national registry.');
    return { data: { success: true, data } };
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
