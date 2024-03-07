import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "./../models/user";
import { markCharacterAsFavorite } from "../services/user";

interface CustomRequest extends Request {
  token?: JwtPayload;
}

export const register = async (req: Request, res: Response) => {
  try{
    if(!req.body.username || !req.body.password){
      return res.status(422).json({
        message: 'Unprocessable entity: missing params',
      })
    }
    const verifyUsername = await User.findOne({ username: req.body.username });
  
    if(verifyUsername){
      return res.status(409).json({
        message: "Username already exists"
      })
    } else {
      if(req.body.username.length < 8){
        return res.status(403).json({
          message: 'Username must contain at least 8 characters',
        })
      }

      const hashPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        username: req.body.username,
        password: hashPassword,
      });
  
      const response = await user.save();
      return res.status(201).json({
        message: 'User created successfully',
        result: response,
      })
    }
  }catch (err: any) {
    res.status(500).json({ error: "Internal server error" })
  }
};

export const login = async (req: Request, res: Response) => {
  try{
    const user = await User.findOne({ username: req.body.username })
    if(!user) {
      return res.status(401).json({
        message: "Authentication failed",
      })
    } else {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if(!isPasswordValid) {
        return res.status(401).json({
          message: "Authentication failed",
        })
      }

      const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET || "a-secret-encoder" );
      return res.status(200).json({ message: "Login successful", token: "Bearer " + token, username: user.username, favorites: user.favorites });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    })
  }
};

export const getUser = async (req: CustomRequest, res: Response) => {
  try{
    if(!req.headers.authorization){
      return res.status(401).json({
        message: "Unauthorized",
      })
    }
    const user = await User.findOne({ username: req.params.username });

    if(!user) {
      return res.status(401).json({
        message: "Authentication failed",
      })
    } else {
      return res.status(200).json({username: user.username, favorites: user.favorites});
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" })
  }
};

export const getUserFavorites = async (req: CustomRequest, res: Response) => {
  try{
    const user = await User.findOne({ username: req.params.username });
    if(!user) {
      return res.status(404).json({
        message: "User not found",
      })
    } else {
      return res.status(200).json({favorites: user.favorites});
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" })
  }
};

export const markAsFavoriteHandler = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.params.username;
    const characterId = parseInt(req.body.data.characterId);
    const result = await markCharacterAsFavorite(userId, characterId);
    res.json(result);
  } catch (error: any) {
    console.error('Error marking character as favorite:', error.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
