import { Request, Response } from 'express';
import * as UserService from '../services/user.service';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const deletedUser = await UserService.deleteUser(userId);
        if (deletedUser) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
}