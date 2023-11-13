import { IMedicament } from "../interfaces/Medicament.interface";
import Medicament from "../schemas/Medicament.schema"

export const getMedicaments = async (searchTerm: string): Promise<IMedicament[]> => {
    try {
        const regex = new RegExp(searchTerm, 'i');
        return await Medicament.find({ substance: regex });
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Error while getting medicaments: ' + error.message);
        } else {
            throw new Error('An unknown error occurred while getting medicaments');
        }
    }
};

export const getMedicamentById = async (id: string): Promise<IMedicament | null> => {
    try {
        return await Medicament.findById(id);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Error while getting medicament: ' + error.message);
        } else {
            throw new Error('An unknown error occurred while getting medicament');
        }
    }
};