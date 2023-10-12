
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import randomstring from 'randomstring';
import User from '../schemas/User.schema';
import { IUser } from '../interfaces/User.interface';

const generateToken = (userId: string): string => {
    return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '15m' });
};

const generateRefreshToken = (): string => {
    return randomstring.generate();
};

export const registerUser = async (username: string, password: string): Promise<{ token: string, refreshToken: string, user: IUser }> => {
    if (password.length < 6) {
        throw new Error('Password must be at least 6 characters.');
    }

    const existingUser: IUser | null = await User.findOne({ username });
    if (existingUser) {
        throw new Error('Username already exists.');
    }

    const user: IUser = new User({ username, password });
    const refreshToken: string = generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save();

    const token: string = generateToken(user._id);
    return { token, refreshToken, user };
};

export const loginUser = async (username: string, password: string): Promise<{ token: string, refreshToken: string, user: IUser }> => {
    const user: IUser | null = await User.findOne({ username });
    if (!user) {
        throw new Error('User not found.');
    }

    const isMatch: boolean = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid password.');
    }

    const refreshToken: string = generateRefreshToken();
    user.refreshToken = refreshToken;

    await user.save();

    const token: string = generateToken(user._id);
    return { token, refreshToken, user };
};

export const validateUserToken = (bearerToken: string): boolean => {
    jwt.verify(bearerToken, process.env.JWT_SECRET!, (err: jwt.JsonWebTokenError | null) => {
        if (err) {
            throw new Error('Not authorized');
        }
    });
    return true;
};

export const userLogout = async (refreshToken: string): Promise<string> => {
    if (!refreshToken) {
        throw new Error('Refresh token required.');
    }

    const user: IUser | null = await User.findOneAndUpdate({ refreshToken }, { refreshToken: null });
    if (!user) {
        throw new Error('Invalid refresh token.');
    }
    return 'Successfully logged out.';
};

export const generateTokenFromRefresh = async (refreshToken: string): Promise<{ token: string, refreshToken: string, user: IUser }> => {
    const user: IUser | null = await User.findOne({ refreshToken });

    if (!user) {
        throw new Error('Invalid refresh token.');
    }

    if (user.refreshToken !== refreshToken) {
        throw new Error('Refresh token was revoked.');
    }

    const newRefreshToken: string = generateRefreshToken();
    user.refreshToken = newRefreshToken;

    await user.save();

    const token: string = generateToken(user._id);
    return { token, refreshToken: newRefreshToken, user };
};