import { Request, Response } from 'express';
import { supabase } from '../config/db';

// CHW Reports
export const createCHWReport = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('chw_reports').insert(req.body).select().single();
    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCHWReports = async (req: Request, res: Response) => {
  const { chwId } = req.query;
  try {
    let query = supabase.from('chw_reports').select('*, patients(name)');
    if (chwId) query = query.eq('chw_id', chwId);
    
    const { data, error } = await query;
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Disease Reports
export const createDiseaseReport = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('disease_reports').insert(req.body).select().single();
    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDiseaseReports = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('disease_reports').select('*');
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
