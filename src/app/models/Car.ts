export default interface Car {
  source: 'scan' | 'manual';
  number: number;
  series: '2600' | '3200' | '5000';
  entries: number;
  createdAt: string;
  updatedAt: string[];
}
