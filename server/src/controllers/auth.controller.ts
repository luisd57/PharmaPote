
import { Request, Response } from 'express';
import * as AuthService from '../services/auth.service';

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        const { token, refreshToken, user } = await AuthService.registerUser(username, password);

        res.cookie('token', token, {
            httpOnly: true,
            // secure: true, for prod with https
            maxAge: 15 * 60 * 1000 // 15 min in millis
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            // secure: true, // Uncomment for production with HTTPS
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
        });

        res.status(201).send({ refreshToken, user });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error registering user', details: error.message });
        } else {
            res.status(500).json({ message: 'Error registering user', details: 'An unknown error occurred' });
        }
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        const { token, refreshToken, user } = await AuthService.loginUser(username, password);

        res.cookie('token', token, {
            httpOnly: true,
            // secure: true, // for prod with https
            maxAge: 15 * 60 * 1000 // 15 min in millis
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            // secure: true, // Uncomment for production with HTTPS
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
        });


        res.status(200).send({ token, refreshToken, user });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error logging in user', details: error.message });
        } else {
            res.status(500).json({ message: 'Error logging in user', details: 'An unknown error occurred' });
        }
    }
};

export const isAuthenticated = (req: Request, res: Response): void => {
    try {
        const token = req.cookies ? req.cookies.token : undefined;

        if (!token) {
            throw new Error("Not authorized");
        }

        const isValid = AuthService.validateUserToken(token);
        if (isValid) {
            res.status(200).json(true);
        } else {
            res.status(403).json({ message: "Not authorized" });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error validating user', details: error.message });
        } else {
            res.status(500).json({ message: 'Error validating user', details: 'An unknown error occurred' });
        }
    }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        const refreshToken = req.cookies ? req.cookies.refreshToken : undefined;
        const message = await AuthService.userLogout(refreshToken);

        res.clearCookie('token');
        res.clearCookie('refreshToken');

        res.status(200).send({ message });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error logging out user', details: error.message });
        } else {
            res.status(500).json({ message: 'Error logging out user', details: 'An unknown error occurred' });
        }
    }
};

export const token = async (req: Request, res: Response): Promise<void> => {
    try {
        const { refreshToken } = req.body;
        const { token, refreshToken: newRefreshToken, user } = await AuthService.generateTokenFromRefresh(refreshToken);
        res.status(200).send({ token, refreshToken: newRefreshToken, user });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error generating token', details: error.message });
        } else {
            res.status(500).json({ message: 'Error generating token', details: 'An unknown error occurred' });
        }
    }
};