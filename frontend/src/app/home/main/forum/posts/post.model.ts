export interface postInterface {
  id: string;
  text: string;
  imgSrc: string;
  time: Date;
  location: { lat: number; lng: number };
}
