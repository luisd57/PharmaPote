import { Document } from 'mongoose';
import { ITreatment } from './Treatment.interface';

export interface IUser extends Document {
    username: string;
    password: string;
    refreshToken?: string;
    treatments: ITreatment['_id'][];
    role: 'user' | 'admin';
    comparePassword(password: string): boolean;
}
