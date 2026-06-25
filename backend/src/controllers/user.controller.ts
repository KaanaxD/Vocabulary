import { Response, Request, NextFunction } from 'express';
export default function userController() {
    return {
        getUser: async (req: Request<{}, {}, {}, {}>, res: Response<ResBody>, next: NextFunction) => {
            try {
                
            } catch (error) {
                next(error)
            }
        }
    }
}