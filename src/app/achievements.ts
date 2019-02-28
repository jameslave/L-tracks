import Car from './models/Car';

export default {
  0: {
    name: 'Odd Couple',
    description: 'Ride in car 3457 or 3458',
    type: 'single',
    totalSteps: 1,
    validator(context: { [id: string]: Car }) {
      return {
        isAchieved: context['3457'] !== undefined || context['3458'] !== undefined,
      };
    }
  },
  1: {
    name: 'Hat Track',
    description: 'Ride in a single car 3 times',
    type: 'multiple',
    totalSteps: 3,
    validator(context: { [id: string]: Car }) {
      const allEntries = Object.values(context).map(c => c.entries);
      return {
        isAchieved: Math.max(...allEntries) >= 3,
        progress: Math.max(...allEntries),
      };
    }
  },
  2: {
    name: 'Mr 3(2)00',
    description: 'Ride in all active 3200-series cars',
    type: 'multiple',
    totalSteps: 253,
    validator(context: { [id: string]: Car }) {
      return {
        isAchieved: Object.values(context).filter(c => c.series === '3200').length >= 253,
        progress: Object.values(context).filter(c => c.series === '3200').length,
      };
    }
  },
};
