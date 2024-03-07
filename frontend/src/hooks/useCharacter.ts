import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../models/user";
import { useMyUserQuery } from "./useUser";

const charactersQueryKey = ["character"] as const;
const getCharactersQueryKey = (): QueryKey => [...charactersQueryKey, "list"];
const getCharacterQueryKey = (characterId: string): QueryKey => [...charactersQueryKey, "id", characterId];

const getCharacters = async (user: User) => {
  try{
    if(user.token){
      const config = {
        headers: {
          Authorization: user.token
        }
      }; 
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL_LOCAL}/character`, config);
      return res.data
    }
  }catch(err: any){
    throw new Error(err)
  }
};

const getCharacter = async (user: User, characterId: string) => {
  try{
    if(user.token){
      const config = {
        headers: {
          Authorization: user.token
        }
      }; 
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL_LOCAL}/character/${characterId}`, config);
      return res.data
    }
  }catch(err: any){
    throw new Error(err)
  }
};

export const useCharactersQuery = () => {
  const queryClient = useQueryClient();  
  const { user } = useMyUserQuery();

  return useQuery(
    getCharactersQueryKey(),
    async () => {
      queryClient.cancelQueries({queryKey: getCharactersQueryKey()});
      if(user){
        return getCharacters(user);
      }else{
        throw new Error("Unauthorized")
      }
    },
    {
      enabled: !!user?.token
    }
  )
};

export const useCharacterQuery = (characterId: string) => {
  const { user } = useMyUserQuery();
  const queryClient = useQueryClient();
  return useQuery(
    getCharacterQueryKey(characterId),
    () => {
      queryClient.cancelQueries({queryKey: getCharacterQueryKey(characterId)});
      if(user){
        return getCharacter(user, characterId)
      }else{
        throw new Error("Unauthorized")
      }
    },
    {
      enabled: !!user?.token
    }
  )
};