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
    name: 'Hat Track',
    iconName: 'hat-track.svg',
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
    name: 'Master of 2600',
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
    name: 'Master of 3200',
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
    name: 'Master of 5000',
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
    name: `Three's a Crowd`,
    iconName: 'magic-numbers.svg',
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
    name: `One Is the Loneliest Number`,
    iconName: 'magic-numbers.svg',
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
    name: `Two's Company`,
    iconName: 'magic-numbers.svg',
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
};
