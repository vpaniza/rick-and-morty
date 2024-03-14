import { QueryKey, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { User } from "../models/user";
import { useMyUserQuery } from "./useUser";
import { Character, GetCharactersResponse } from "../models/character";

const charactersQueryKey = ["character"] as const;
const getCharactersQueryKey = (): QueryKey => [...charactersQueryKey, "list"];
const getCharacterQueryKey = (characterId: string): QueryKey => [...charactersQueryKey, "id", characterId];

const getCharacters = async (user: User, pageNum?: number): Promise<GetCharactersResponse | undefined> => {
  if (!user.token) throw new Error('Unauthorized');
  const config = {
    headers: { Authorization: user.token },
  };
  try{
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL_LOCAL}/character/?pageNum=${pageNum ?? 1}`, config);
    return res.data;
  }catch(err){
    const error = err as AxiosError;
    throw new Error(error.message)
  }
};

const getCharacter = async (user: User, characterId: string): Promise<Character | undefined> => {
  if (!user.token) throw new Error('Unauthorized');
  const config = {
    headers: { Authorization: user.token },
  };
  try{
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL_LOCAL}/character/${characterId}`, config);
    return res.data
  }catch(err){
    const error = err as AxiosError;
    throw new Error(error.message)
  }
};

export const useCharactersMutation = () => {
  const queryClient = useQueryClient();
  const { user } = useMyUserQuery();

  return useMutation<unknown, Error, number>(
    async (pageNum) => {
      if (!user?.token) throw new Error("Unauthorized");
      return getCharacters(user, pageNum);
    },
    {
      onSuccess: (data, variables) => {
        queryClient.setQueryData(getCharactersQueryKey(), data);
      },
      onError: (error: Error) => {
        console.error("Mutation error:", error.message);
      }
    }
  );
};

export const useCharactersQuery = () => {
  const { user } = useMyUserQuery();

  return useQuery<GetCharactersResponse | undefined, Error>(
    getCharactersQueryKey(),
    () => getCharacters(user),
    {
      enabled: !!user?.token,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 15 * 60 * 1000, // 15 minutes
      onError: (error: Error) => {
        console.error("Fetch characters error:", error.message);
      }
    }
  );
};

export const useCharacterQuery = (characterId: string) => {
  const { user } = useMyUserQuery();

  return useQuery<Character | undefined, Error>(
    getCharacterQueryKey(characterId),
    () => getCharacter(user, characterId),
    {
      enabled: !!user?.token && !!characterId,
      staleTime: 10 * 60 * 1000, // 10 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
      onError: (error: Error) => {
        console.error("Fetch character error:", error.message);
      }
    }
  );
};