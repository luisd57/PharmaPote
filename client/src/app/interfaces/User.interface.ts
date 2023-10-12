export interface IUser {
    _id?: string;
    username: string;
    password: string;
    refreshToken?: string;
    treatments: string[];
    role: 'user' | 'admin';
}
