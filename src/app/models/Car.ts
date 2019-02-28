export default interface Car {
  number: string;
  entries: number;
  createdAt: string;
  coords?: {
    lat: number,
    lon: number,
  };
}
