import { Request, Response } from 'express';
import { supabase } from '../config/db';

export const getPatients = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('patients').select('*');
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPatientById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { data: patient, error: patientError } = await supabase
      .from('patients')
      .select('*')
      .eq('id', id)
      .single();

    if (patientError) throw patientError;

    // Fetch related records in parallel
    const { data: records } = await supabase.from('medical_records').select('*').eq('patient_id', id);
    const { data: labs } = await supabase.from('lab_results').select('*').eq('patient_id', id);
    const { data: prescriptions } = await supabase.from('prescriptions').select('*').eq('patient_id', id);

    res.json({
      success: true,
      data: {
        ...patient,
        medical_records: records || [],
        lab_results: labs || [],
        prescriptions: prescriptions || []
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createPatient = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('patients').insert(req.body).select().single();
    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
