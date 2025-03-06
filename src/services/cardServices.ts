import axios from "axios";
import { Card } from "../interface/card/Cards";

const API: string = import.meta.env.VITE_CARDS_API;

export function getAllCards() {
  return axios.get(API);
}

export function postNewCard(normalizedCard: Card) {
  return axios.post(API, normalizedCard, {
    headers: {
      "x-auth-token": sessionStorage.getItem("token"),
    },
  });
}

