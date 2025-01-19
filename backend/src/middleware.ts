import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function auth(req: Request, res: Response,next:NextFunction): Promise<any> {
    try {
        const token=req.cookies.token;
        if(!token){
            return res.json({message:"not authenticated"})
        }
        const secret = process.env.JWT_SECRET || 'default_secret';
        const isVerified=jwt.verify(token,secret);
        if(!isVerified){
            return res.json({message:"not authenticated"})
        }
        //@ts-ignore
        req.id=isVerified.userId;
        next();
    } catch (error) {
        console.log(error)
    }
}