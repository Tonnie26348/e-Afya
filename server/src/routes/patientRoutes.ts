import { Router } from 'express';
import { getPatients, getPatientById, createPatient } from '../controllers/patientController';

const router = Router();

router.get('/', getPatients);
router.get('/:id', getPatientById);
router.post('/', createPatient);

export default router;
