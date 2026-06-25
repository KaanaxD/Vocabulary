import jwt from "jsonwebtoken"
import { Response, Request, NextFunction } from 'express';
import { createError } from "./errorHandler";

export function auth(req: Request, res: Response, next: NextFunction) {
    const SECRET = process.env.JWT_SECRET as string
    const token = req.headers.authorization
    if (!token) {
        return next( createError(401, "anda belum login"))
    }
    const bearerToken = token.split(" ")[1] as string
    try {
        const verify = jwt.verify(bearerToken,SECRET) as UserHeader
        if (!verify) {
            return next(createError(401, "invalid token"))
        }
        req.user = verify
        next()
    } catch (error) {
        return next(createError(401, "invalid token"))
    }

}