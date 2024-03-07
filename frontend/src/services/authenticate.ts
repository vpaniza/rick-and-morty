import axios from "axios";

export const login = async (username: string, password: string) => {
  try{
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL_LOCAL}/user/login`, {
      username: username,
      password: password
    }, { withCredentials: true });
    if(res.status === 200){
      return res.data;
    }else throw new Error("Invalid credentials");
  } catch(err: any){
    throw err;
  }
};

export const signup = async (username: string, password: string) => {
  try{
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL_LOCAL}/user/register`, {
      username: username,
      password: password
    }, { withCredentials: true });
    if(res.status === 201){
      return res.data;
    }else throw new Error("Error in creating user");
  } catch(err: any){
    throw err;
  }
};