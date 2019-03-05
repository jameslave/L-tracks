import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { AchievementsService } from './achievements.service';
import Car from '../models/Car';
import { ErrorsService } from './errors.service';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  constructor(
    private storage: Storage,
    private errorsService: ErrorsService,
    private achievementsService: AchievementsService,
  ) { }

  cars: { [id: string]: Car } = {};

  private getCleanCarNumber(carNumber: number | string): number {
    if (!carNumber || carNumber.toString().length !== 4) {
      throw new Error('Did not receive valid car number.');
    }
    let cleanNumber: number;
    if (typeof carNumber === 'number') {
      cleanNumber = carNumber;
    } else if (typeof carNumber === 'string') {
      cleanNumber = parseInt(carNumber, 10);
    }
    return cleanNumber;
  }

  private getCarSeries(carNumber: number): '2600' | '3200' | '5000' {
    let series;
    if (carNumber >= 2600 && carNumber <= 3200) {
      series = '2600';
    } else if (carNumber >= 3201 && carNumber <= 3458) {
      series = '3200';
    } else if (carNumber >= 5001 && carNumber <= 5714) {
      series = '5000';
    }
    if (!series) {
      throw new Error('Car number is not from a valid active series.');
    }
    return series;
  }

  init() {
    this.loadCarsFromStorage();
  }

  private async saveCarsToStorage(cars = this.cars): Promise<void> {
    await this.storage.set('cars', cars);
  }

  private async loadCarsFromStorage(): Promise<void> {
    await this.storage.ready();
    const cars = await this.storage.get('cars');
    if (cars) {
      this.cars = cars;
      await this.achievementsService.checkForNewAchievements(this.cars);
    } else {
      this.cars = {};
      await this.saveCarsToStorage({});
    }
  }

  public async addCar(carNumber: number | string, source: 'scan' | 'manual'): Promise<void> {
    try {
      const cleanCarNumber = this.getCleanCarNumber(carNumber);

      if (this.cars[cleanCarNumber]) {
        this.cars[cleanCarNumber].entries += 1;
        this.cars[cleanCarNumber].updatedAt = new Date().toISOString();
      } else {
        const series = this.getCarSeries(cleanCarNumber);
        const newCar: Car = {
          source,
          number: cleanCarNumber,
          series,
          entries: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        this.cars[cleanCarNumber] = newCar;
      }
      this.achievementsService.checkForNewAchievements(this.cars);
      await this.saveCarsToStorage();
    } catch (error) {
      this.errorsService.showErrorToast(error.message);
    }
  }

  public async removeCar(number: string): Promise<void> {
    delete this.cars[number];
    await this.saveCarsToStorage();
  }
}
