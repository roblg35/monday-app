import { Request, Response } from 'express';
import FragranceService from '../services/fragranceService';

const fragranceController = {
  getAllFragrances: async (req: Request, res: Response) => {
    try {
      const fragrances = await FragranceService.getAllFragrances();
      res.status(200).json(fragrances);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getFragranceById: async (req: Request, res: Response) => {
    try {
      const fragrance = await FragranceService.getFragranceById(req.params.id);
      if (!fragrance) {
        res.status(404).json({ error: 'Fragrance not found' });
      } else {
        res.status(200).json(fragrance);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  addFragrance: async (req: Request, res: Response) => {
    try {
      const fragrance = await FragranceService.addFragrance(req.body);
      res.status(201).json(fragrance);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateFragrance: async (req: Request, res: Response) => {
    try {
      const fragrance = await FragranceService.updateFragrance(req.body);
      res.status(200).json(fragrance);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  deleteFragrance: async (req: Request, res: Response) => {
    try {
      const id = await FragranceService.deleteFragrance(req.params.id);
      res.status(200).json({ message: 'Fragrance deleted successfully', id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default fragranceController;
