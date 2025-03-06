import { Adress } from "./Adress";
import { Image } from "./Image";

export interface Card {
  _id?: string;
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web: string;
  image: Image;
  address: Adress;
  bizNumber?: number;
  likes?: string[];
  user_id?: string;
}