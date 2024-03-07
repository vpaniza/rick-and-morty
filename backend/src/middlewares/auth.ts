import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  token?: JwtPayload;
 }

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if(!token){
      return res.status(401).json({
        message: "Unauthorized"
      })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET ?? "") as JwtPayload;
    (req as CustomRequest).token = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Authentification failed"
    });
  }
};