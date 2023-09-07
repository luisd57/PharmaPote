import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../interfaces/User.interface';

const UserSchema: Schema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: { type: String },
    previousRefreshToken: { type: String },
    treatments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Treatment'
    }]
});

UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});

UserSchema.methods.comparePassword = function (this: IUser, password: string): boolean {
    return bcrypt.compareSync(password, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
