import Car from './models/Car';

export default {
  0: {
    name: 'Odd Couple',
    description: 'Ride in car 3457 or 3458',
    validator(context: { [id: string]: Car }) {
      return context['3457'] !== undefined || context['3458'] !== undefined;
    }
  },
  1: {
    name: 'Hat Track',
    description: 'Ride in a car 3 times',
    validator(context: { [id: string]: Car }) {
      return Object.values(context).findIndex(c => c.entries >= 3) >= 0;
    }
  }
};
