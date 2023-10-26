import { Request, Response } from 'express';
import * as MedicamentService from '../services/medicament.service';

export const getMedicaments = async (req: Request, res: Response) => {
    try {
        const medicaments = await MedicamentService.getMedicaments();
        res.status(200).json(medicaments);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error getting medicaments', details: error.message });
        } else {
            res.status(500).json({ message: 'Error getting medicaments', details: 'An unknown error occurred' });
        }
    }
}