import { IMedicament } from "../interfaces/Medicament.interface";
import Medicament from "../schemas/Medicament.schema"

export const getMedicaments = async (): Promise<IMedicament[]> => {
    try {
        return await Medicament.find();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Error while getting medicaments: ' + error.message);
        } else {
            throw new Error('An unknown error occurred while getting medicaments');
        }
    }
}