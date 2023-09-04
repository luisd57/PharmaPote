import { Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    password: string;
    refreshToken?: string;
    previousRefreshToken?: string;
    comparePassword(password: string): boolean;
}
