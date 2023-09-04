
import { Request, Response } from 'express';
import * as AuthService from '../services/auth.service';

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        const { token, refreshToken, user } = await AuthService.registerUser(username, password);
        res.status(201).send({ token, refreshToken, user });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ error: error.message });
        } else {
            res.status(400).send({ error: 'An unknown error occurred.' });
        }
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        const { token, refreshToken, user } = await AuthService.loginUser(username, password);
        res.status(200).send({ token, refreshToken, user });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ error: error.message });
        } else {
            res.status(400).send({ error: 'An unknown error occurred.' });
        }
    }
};

export const isAuthenticated = (req: Request, res: Response): void => {
    try {
        const bearerHeader: string | undefined = req.headers['authorization'] as string;

        if (!bearerHeader) {
            throw new Error("Not authorized");
        }

        const bearer: string[] = bearerHeader.split(' ');
        const bearerToken: string = bearer[1];

        const isValid = AuthService.validateUserToken(bearerToken);
        if (isValid) {
            res.status(200).json(true);
        } else {
            res.status(403).json({ message: "Not authorized" });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ error: error.message });
        } else {
            res.status(400).send({ error: 'An unknown error occurred.' });
        }
    }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        const { refreshToken } = req.body;
        const message = await AuthService.userLogout(refreshToken);
        res.status(200).send({ message });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ error: error.message });
        } else {
            res.status(400).send({ error: 'An unknown error occurred.' });
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
            res.status(400).send({ error: error.message });
        } else {
            res.status(400).send({ error: 'An unknown error occurred.' });
        }
    }
};