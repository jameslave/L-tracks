import Car from './Car';

export default interface Achievement {
  name: string;
  description: string;
  type: string;
  totalSteps?: number;
  validator: (context: { [id: string]: Car }) => { isAchieved: boolean, progress?: number };
}
