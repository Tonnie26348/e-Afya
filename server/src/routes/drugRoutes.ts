import { Router } from 'express';
import { getInventory, updateInventory, createRedistributionRequest } from '../controllers/drugController';

const router = Router();

router.get('/', getInventory);
router.put('/:id', updateInventory);
router.post('/redistribute', createRedistributionRequest);

export default router;
