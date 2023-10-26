import jwt from 'jsonwebtoken';
import User from '../schemas/User.schema';
import { Request, Response, NextFunction } from 'express';


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies ? req.cookies.token : undefined;

        if (!token) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: "Not authorized" });
        }

        req.user = {
            _id: user._id.toString(),
            role: user.role
        };
        next();

    } catch (error) {
        return res.status(401).json({ message: "Not authorized" });
    }
};