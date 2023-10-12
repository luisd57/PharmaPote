import { IUser } from "./User.interface";

export interface AuthResponse {
    token: string;
    refreshToken: string;
    user: IUser;
}