import { Router } from 'express';
import { getHospitals, getHospitalCapacity, updateCapacity, createReferral, getReferrals } from '../controllers/hospitalController';

const router = Router();

router.get('/', getHospitals);
router.get('/:id/capacity', getHospitalCapacity);
router.put('/:id/capacity', updateCapacity); // Upsert
router.post('/referrals', createReferral);
router.get('/referrals/list', getReferrals);

export default router;
