import { Router } from 'express';
import fragranceController from '../controllers/fragranceController';

const router = Router();

router.get('/fragrances', fragranceController.getAllFragrances);
router.get('/fragrances/:id', fragranceController.getFragranceById);
router.post('/fragrances', fragranceController.addFragrance);
router.put('/fragrances/:id', fragranceController.updateFragrance);
router.delete('/fragrances/:id', fragranceController.deleteFragrance);

export default router;
