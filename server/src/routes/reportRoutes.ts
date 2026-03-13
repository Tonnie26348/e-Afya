import { Router } from 'express';
import { createCHWReport, getCHWReports, createDiseaseReport, getDiseaseReports } from '../controllers/reportController';

const router = Router();

router.post('/chw', createCHWReport);
router.get('/chw', getCHWReports);
router.post('/disease', createDiseaseReport);
router.get('/disease', getDiseaseReports);

export default router;
