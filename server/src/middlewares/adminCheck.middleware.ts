import { Request, Response, NextFunction } from 'express';

export const adminCheck = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized' });
    }
    next();
};
