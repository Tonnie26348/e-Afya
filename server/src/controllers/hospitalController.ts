import { Request, Response } from 'express';
import { supabase } from '../config/db';

export const getHospitals = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('hospitals')
      .select('*, hospital_capacity(total_beds, available_beds, icu_beds, available_icu_beds, specialists_available)');
    
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getHospitalCapacity = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('hospital_capacity')
      .select('*, hospitals(name, type, county)')
      .eq('hospital_id', id)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "Row not found"
    
    res.json({ success: true, data: data || { message: 'No capacity data found' } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCapacity = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('hospital_capacity')
      .upsert({ hospital_id: id, ...req.body, last_updated: new Date() })
      .select()
      .single();
      
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createReferral = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('referrals').insert(req.body).select().single();
    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getReferrals = async (req: Request, res: Response) => {
  const { hospitalId } = req.query; // Filter by receiving hospital
  try {
    let query = supabase.from('referrals').select('*, patients(name, digital_health_id), referring_hospital:hospitals!referrals_referring_hospital_id_fkey(name)');
    
    if (hospitalId) {
      query = query.eq('receiving_hospital_id', hospitalId);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
