import { Request, Response } from 'express';
import { supabase } from '../config/db';

export const getInventory = async (req: Request, res: Response) => {
  const { hospitalId } = req.query;
  try {
    let query = supabase.from('drug_inventory').select('*, hospitals(name)');
    if (hospitalId) query = query.eq('hospital_id', hospitalId);
    
    const { data, error } = await query;
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateInventory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('drug_inventory')
      .update({ ...req.body, last_updated: new Date() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createRedistributionRequest = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('drug_redistribution').insert(req.body).select().single();
    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
