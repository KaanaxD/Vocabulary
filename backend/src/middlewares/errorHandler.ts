import { Response,Request,NextFunction } from 'express';
import { ZodError } from 'zod';
export function createError(status:number=500,msg:string="internal server error"){    
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

    return res.status(err.status||500).json({
        status: err.status||500,
        success: false,
        message: err.message||"internal server error",
    })
}