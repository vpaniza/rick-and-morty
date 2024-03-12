import { Request, Response } from "express";
import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();
const BASE_URL=process.env.RICKANDMORTY_API_BASE_URL || "";

// GET all characters
export const getAllCharacters = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(BASE_URL+"/character");
    if(response.status === 200){
      const characters = response.data.results.map((ch: any) => {
        return(
          {
            id: ch.id,
            name: ch.name,
            status: ch.status,
            species: ch.species,
            gender: ch.gender,
            origin: ch.origin,
            image: ch.image
          }
        )
      })
      res.json(characters);
    }else{
      throw new Error("Unexpected response status: " + response.status);
    }  
  } catch (error: any) {
    console.error(error)
    res.status(error.response.status).json({ message: error.response.data.error });
  }
}

// GET all characters
export const getCharacterByID = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(BASE_URL+"/character/"+req.params.id);
    if(response.status === 200){
      const character = {
        id: response.data.id,
        name: response.data.name,
        status: response.data.status,
        species: response.data.species,
        gender: response.data.gender,
        origin: response.data.origin,
        image: response.data.image
      }
      res.json(character);
    }else{
      throw new Error("Unexpected response status: " + response.status);
    }
  } catch (error: any) {
    console.error(`Error fetching character id ${req.params.id}`, error);
    res.status(error.response.status).json({ message: error.response.data.error })
  }
}