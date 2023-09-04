import mongoose from 'mongoose';
import { IUser } from '../interfaces/User.interface';
import UserSchema from '../schemas/User.schema';

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
