import { User } from "../models/user";

const USER_ACCESS_TOKEN = 'My user';

export const saveUser = (user: User): void => {
  localStorage.setItem(USER_ACCESS_TOKEN, JSON.stringify({ username: user.username, token: user.token}));
};

export const getUser = () => {
  const user = localStorage.getItem(USER_ACCESS_TOKEN);
  return user ? JSON.parse(user) : undefined;
};

export const removeUser = (): void => {
  localStorage.removeItem(USER_ACCESS_TOKEN);
};