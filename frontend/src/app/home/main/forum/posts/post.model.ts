export interface postInterface {
  _id?: string;
  text: string;
  imgSrc?: string;
  createdAt?: string;

  location?: {
    lat: number;
    lng: number;
  };
}
