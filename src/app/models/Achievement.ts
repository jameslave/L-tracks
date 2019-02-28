import Car from './Car';

export default interface Achievement {
  name: string;
  description: string;
  validator: (context: { [id: string]: Car }) => boolean;
}
