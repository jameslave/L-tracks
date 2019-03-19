import Car from './models/Car';
import { countBy } from 'lodash';

export default {
  a0: {
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
  a1: {
    name: 'Hat Trick',
    iconName: 'hat-trick.svg',
    description: 'Ride a single car 3 times',
    type: 'multiple',
    totalSteps: 3,
    validator(context: { [id: string]: Car }) {
      const completedSteps = Math.max(...[0, ...Object.values(context).map(c => c.entries)]);
      return {
        isAchieved: completedSteps >= this.totalSteps,
        progress: completedSteps,
      };
    }
  },
  a2: {
    name: 'Completionist (2600)',
    iconName: 'complete.svg',
    description: 'Ride all active 2600-series cars',
    type: 'multiple',
    totalSteps: 494,
    validator(context: { [id: string]: Car }) {
      const completedSteps = Object.values(context).filter(c => c.series === '2600').length;
      return {
        isAchieved: completedSteps >= this.totalSteps,
        progress: completedSteps,
      };
    }
  },
  a3: {
    name: 'Completionist (3200)',
    iconName: 'complete.svg',
    description: 'Ride all active 3200-series cars',
    type: 'multiple',
    totalSteps: 256,
    validator(context: { [id: string]: Car }) {
      const completedSteps = Object.values(context).filter(c => c.series === '3200').length;
      return {
        isAchieved: completedSteps >= this.totalSteps,
        progress: completedSteps,
      };
    }
  },
  a4: {
    name: 'Completionist (5000)',
    iconName: 'complete.svg',
    description: 'Ride all active 5000-series cars',
    type: 'multiple',
    totalSteps: 708,
    validator(context: { [id: string]: Car }) {
      const completedSteps = Object.values(context).filter(c => c.series === '5000').length;
      return {
        isAchieved: completedSteps >= this.totalSteps,
        progress: completedSteps,
      };
    }
  },
  a5: {
    name: 'Checkout Line',
    iconName: 'checkout-line.svg',
    description: 'Enter 100 cars by scanning',
    type: 'multiple',
    totalSteps: 100,
    validator(context: { [id: string]: Car }) {
      const completedSteps = Object.values(context).filter(c => c.source === 'scan').length;
      return {
        isAchieved: completedSteps >= this.totalSteps,
        progress: completedSteps,
      };
    }
  },
  a6: {
    name: 'Typist',
    iconName: 'typist.svg',
    description: 'Enter 100 cars by typing',
    type: 'multiple',
    totalSteps: 100,
    validator(context: { [id: string]: Car }) {
      const completedSteps = Object.values(context).filter(c => c.source === 'manual').length;
      return {
        isAchieved: completedSteps >= this.totalSteps,
        progress: completedSteps,
      };
    }
  },
  a7: {
    name: 'Coincidence or Fate?',
    iconName: 'coincidence-or-fate.svg',
    description: 'Ride a single car 10 times',
    type: 'multiple',
    totalSteps: 10,
    validator(context: { [id: string]: Car }) {
      const completedSteps = Math.max(...[0, ...Object.values(context).map(c => c.entries)]);
      return {
        isAchieved: completedSteps >= this.totalSteps,
        progress: completedSteps,
      };
    }
  },
  a8: {
    name: `Triplets (3)`,
    iconName: 'triplets.svg',
    description: `Ride a car whose ID contains three 3's`,
    type: 'single',
    totalSteps: 1,
    validator(context: { [id: string]: Car }) {
      return {
        isAchieved: Object.keys(context).findIndex((key: string) => {
          return (key.match(/3/g) || []).length >= 3;
        }) >= 0,
      };
    }
  },
  a9: {
    name: `Triplets (1)`,
    iconName: 'triplets.svg',
    description: `Ride a car whose ID contains three 1's`,
    type: 'single',
    totalSteps: 1,
    validator(context: { [id: string]: Car }) {
      return {
        isAchieved: Object.keys(context).findIndex((key: string) => {
          return (key.match(/1/g) || []).length >= 3;
        }) >= 0,
      };
    }
  },
  a10: {
    name: `Triplets (2)`,
    iconName: 'triplets.svg',
    description: `Ride a car whose ID contains three 2's`,
    type: 'single',
    totalSteps: 1,
    validator(context: { [id: string]: Car }) {
      return {
        isAchieved: Object.keys(context).findIndex((key: string) => {
          return (key.match(/2/g) || []).length >= 3;
        }) >= 0,
      };
    }
  },
  a11: {
    name: `Triplets (5)`,
    iconName: 'triplets.svg',
    description: `Ride a car whose ID contains three 5's`,
    type: 'single',
    totalSteps: 1,
    validator(context: { [id: string]: Car }) {
      return {
        isAchieved: Object.keys(context).findIndex((key: string) => {
          return (key.match(/5/g) || []).length >= 3;
        }) >= 0,
      };
    }
  },
  a12: {
    name: 'Your Lucky Day',
    iconName: 'lucky-day.svg',
    description: 'Ride car 3333 or 5555',
    type: 'single',
    totalSteps: 1,
    validator(context: { [id: string]: Car }) {
      return {
        isAchieved: context['3333'] !== undefined || context['5555'] !== undefined,
      };
    }
  },
  a13: {
    name: `Triplets (4)`,
    iconName: 'triplets.svg',
    description: `Ride a car whose ID contains three 4's`,
    type: 'single',
    totalSteps: 1,
    validator(context: { [id: string]: Car }) {
      return {
        isAchieved: Object.keys(context).findIndex((key: string) => {
          return (key.match(/4/g) || []).length >= 3;
        }) >= 0,
      };
    }
  },
};
