import { Request, Response } from 'express';
import * as MedicamentService from '../services/medicament.service';

export const getMedicaments = async (req: Request, res: Response) => {
    const searchTerm = req.query.search as string || '';
    try {
        const medicaments = await MedicamentService.getMedicaments(searchTerm);
        res.status(200).json(medicaments);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error getting medicaments', details: error.message });
        } else {
            res.status(500).json({ message: 'Error getting medicaments', details: 'An unknown error occurred' });
        }
    }
};

export const getMedicamentById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const medicament = await MedicamentService.getMedicamentById(id);
        if (medicament) {
            res.status(200).json(medicament);
        } else {
            res.status(404).json({ message: 'Medicament not found' });
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error getting medicament', details: error.message });
        } else {
            res.status(500).json({ message: 'Error getting medicament', details: 'An unknown error occurred' });
        }
    }
};
