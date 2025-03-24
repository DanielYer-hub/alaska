import axios from "axios";
import { Card } from "../interface/card/Cards";

const API: string = import.meta.env.VITE_CARDS_API;

export function getAllCards() {
  return axios.get(API);
}

export function postNewCard(normalizedCard: Card) {
  return axios.post(API, normalizedCard, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
}

export function deleteCard(cardId: string) {
  return axios.delete(`${API}/${cardId}`, {
    headers: { "x-auth-token": localStorage.getItem("token") },
  });
}

export function updateCard(cardId: string, updatedData: Card) {
  return axios.put(`${API}/${cardId}`, updatedData, {
    headers: { "x-auth-token": localStorage.getItem("token") },
  });
}

const API_URL = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards";

export const toggleLike = async (cardId: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("The token not found");

  return axios.patch(`${API_URL}/${cardId}`, {}, {
    headers: { "x-auth-token": token },
  });
};