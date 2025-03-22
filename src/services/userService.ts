import axios from "axios";
import { User } from "../interface/user/User";

const API: string = import.meta.env.VITE_USERS_API;

export function registerUser(normalizedUser: User) {
  return axios.post(API, normalizedUser);
}

export function loginUser(email: string, password: string) {
    return axios.post(`${API}/login`, {email, password});
  }

export const getUserById = async(id: string) => {
  console.log(id)
  console.log(localStorage.getItem("token"))
    const res = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}`, {
    headers: {
    "x-auth-token": localStorage.getItem("token")
    },
  });
  return res.data
}