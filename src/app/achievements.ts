import Car from './models/Car';

export default {
  0: {
    name: 'Odd Couple',
    iconName: 'odd-couple.svg',
    description: 'Ride car 3457 or 3458',
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
    iconName: 'hat-track.svg',
    description: 'Ride a single car 3 times',
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
    name: 'Master of 2600',
    iconName: 'complete.svg',
    description: 'Ride all active 2600-series cars',
    type: 'multiple',
    totalSteps: 494,
    validator(context: { [id: string]: Car }) {
      return {
        isAchieved: Object.values(context).filter(c => c.series === '2600').length >= 494,
        progress: Object.values(context).filter(c => c.series === '2600').length,
      };
    }
  },
  3: {
    name: 'Master of 3200',
    iconName: 'complete.svg',
    description: 'Ride all active 3200-series cars',
    type: 'multiple',
    totalSteps: 256,
    validator(context: { [id: string]: Car }) {
      return {
        isAchieved: Object.values(context).filter(c => c.series === '3200').length >= 256,
        progress: Object.values(context).filter(c => c.series === '3200').length,
      };
    }
  },
  4: {
    name: 'Master of 5000',
    iconName: 'complete.svg',
    description: 'Ride all active 5000-series cars',
    type: 'multiple',
    totalSteps: 708,
    validator(context: { [id: string]: Car }) {
      return {
        isAchieved: Object.values(context).filter(c => c.series === '5000').length >= 708,
        progress: Object.values(context).filter(c => c.series === '5000').length,
      };
    }
  },
  5: {
    name: 'Checkout Line',
    iconName: 'checkout-line.svg',
    description: 'Enter 100 cars by scanning',
    type: 'multiple',
    totalSteps: 100,
    validator(context: { [id: string]: Car }) {
      return {
        isAchieved: Object.values(context).filter(c => c.source === 'scan').length >= 100,
        progress: Object.values(context).filter(c => c.source === 'scan').length,
      };
    }
  },
  6: {
    name: 'Typist',
    iconName: 'typist.svg',
    description: 'Enter 100 cars by typing',
    type: 'multiple',
    totalSteps: 100,
    validator(context: { [id: string]: Car }) {
      return {
        isAchieved: Object.values(context).filter(c => c.source === 'manual').length >= 100,
        progress: Object.values(context).filter(c => c.source === 'manual').length,
      };
    }
  },
};
