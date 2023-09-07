import { Document } from 'mongoose';
import { ITreatment } from './Treatment.interface';

export interface IUser extends Document {
    username: string;
    password: string;
    refreshToken?: string;
    previousRefreshToken?: string;
    treatments: ITreatment['_id'][];
    comparePassword(password: string): boolean;
}
