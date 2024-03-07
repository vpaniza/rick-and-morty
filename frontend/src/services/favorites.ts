import axios from "axios";
import { getUser } from "../utils/user";

export const getFavorites = async (username: string) => {
  try{
    const config = {
      headers: {
        Authorization: getUser().token
      }
    }; 
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL_LOCAL}/user/${username}/favorite`, 
      config
    );
    return res.data;
  } catch(err: any){
    throw err;
  }
};

export const updateFavorites = async (username: string, favorite: string) => {
  try{
    const config = {
      headers: {
        Authorization: getUser().token
      },
    }; 
    const res = await axios.put(
      `${process.env.REACT_APP_BASE_URL_LOCAL}/user/${username}/favorite`,
      {data: {characterId: favorite}},
      config
    );
    return res;
  } catch(err: any){
    throw err;
  }
};

