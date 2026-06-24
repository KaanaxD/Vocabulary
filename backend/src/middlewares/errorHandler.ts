import { Response,Request,NextFunction } from 'express';
import { ZodError } from 'zod';
export function createError(status:number,msg:string){    
    const error = new Error(msg) as Err
    error.status = status||500
    return error
}

export function errorHandler(err:Err|ZodError,req:Request,res:Response<ResBody>,next:NextFunction){
    if(err instanceof ZodError){
    return res.status(400).json({
        status: 400,
        success: false,
        message: err.issues[0]?.message||"internal server error",
    })    
    }

    return res.status(err.status).json({
        status: err.status,
        success: false,
        message: err.message||"internal server error",
    })
}