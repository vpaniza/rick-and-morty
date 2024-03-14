import { QueryKey, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../models/user";
import { login, signup } from "../services/authenticate";
import { getUser, removeUser, saveUser } from "../utils/user";
import { useEffect } from "react";
import { getFavorites, updateFavorites } from "../services/favorites";

const userQueryKey = ["user"] as const;
const getUserFavoritesKey = (username: string): QueryKey => [...userQueryKey, username, "favorites"]

const getAPIUser = async () => {
  const storedUser = getUser();
  try{
    if(storedUser?.token && storedUser?.username){
      const config = {
        headers: {
          Authorization: storedUser?.token
        }
      };
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL_LOCAL}/user/${storedUser.username}`, config);
      return response.data;
    }else{
      throw new Error("Unauthorized")
    }
  }catch(error) {
    throw error;
  }
}

export const useMyUserQuery = () => {
  const { data: user, isError } = useQuery(
    userQueryKey,
    async (): Promise<User | null> => {
      const response = await getAPIUser();
      return response;
    },
    {
      onError: () => {
        removeUser();
      },
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      initialData: getUser(),
    }
  );

  useEffect(() => {
    if (!user) removeUser();
    else saveUser(user);
  }, [user]);

  return {
    user: user?.token ? user : null,
    isError
  }
}

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: loginMutation, isError } = useMutation<User, unknown, { username: string, password: string }, unknown>(
    async ({username, password}) => {
      const userData = await login(username, password);
      saveUser(userData); // Save user data after successful login
      queryClient.setQueryData(userQueryKey, userData);
      navigate('/character');
      return userData;
    },
    {
      onError: (error) => {
        console.error(error);
      }
  });
  return { loginMutation, isError};
};

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const signupMutation = useMutation(
    async ({ username, password }: { username: string; password: string }) => {
      const signupResponse = await signup(username, password);
      if (signupResponse.result) {
        const userData = await login(username, password);
        return userData; // This userData will be passed to onSuccess
      } else {
        throw new Error('Signup failed. Please try again.');
      }
    },
    {
      onSuccess: (userData) => {
        // On successful signup and login, set the user data in the query cache
        queryClient.setQueryData(userQueryKey, userData);
        navigate('/character');
      },
      onError: (error: any) => {
        if (error.response && error.response.status === 403) {
          console.error('Signup error: Username must contain at least 8 characters');
        } else {
          console.error('Signup error:', error.message);
        }
      }
    }
  );

  return { signupMutation: signupMutation.mutateAsync, isError: signupMutation.isError };
};

export const useUserFavoritesMutation = () => {
  const queryClient = useQueryClient();
  const { user } = useMyUserQuery();

  const { data, mutate: favoritesMutation, isError} = useMutation(
    async (favorite: string) => {
      queryClient.cancelQueries({queryKey: getUserFavoritesKey(user.username)});
      const response = await updateFavorites(user.username, favorite);
      const newFavs = await getFavorites(user.username);
      queryClient.setQueryData(getUserFavoritesKey(user.username), newFavs);
      return response
    },
    {
      onError: (error) => {
        console.error(error);
      }
  });
  return { data, favoritesMutation, isError};
};

export const useUserFavoritesQuery = () => {
  const { user } = useMyUserQuery();
  return useQuery(
    getUserFavoritesKey(user.username),
    async () => await getFavorites(user.username)
  )
};
