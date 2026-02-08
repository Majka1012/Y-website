import { userInterface } from './user.model';
export interface postInterface {
  _id?: string;
  text: string;
  imgSrc: string;
  createdAt?: Date;

  user: userInterface;

  location?: {
    lat: number;
    lng: number;
    city?: string;
    country?: string;
  };
}
