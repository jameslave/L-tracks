import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Geolocation, Coordinates } from '@ionic-native/geolocation/ngx';

interface Car {
  number: string;
  entries: number;
  createdAt: string;
  coords?: {
    lat: number,
    lon: number,
  };
}

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  constructor(
    private storage: Storage,
    private geolocation: Geolocation,
  ) {
    this.init();
  }

  cars: { [id: string]: Car } = {};

  init() {
    this.loadCarsFromStorage();
  }

  async saveCarsToStorage(cars = this.cars): Promise<void> {
    await this.storage.set('cars', cars);
  }

  async loadCarsFromStorage(): Promise<void> {
    await this.storage.ready();
    const cars = await this.storage.get('cars');
    if (cars) {
      this.cars = cars;
    } else {
      await this.saveCarsToStorage({});
      this.cars = {};
    }
  }

  async addCar(number: string): Promise<void> {
    // const coords = await this.geolocation.getCurrentPosition();
    // console.log(coords);
    const newCar: Car = {
      number,
      entries: 1,
      createdAt: new Date().toISOString(),
      // coords: {
      //   lat: coords.coords.latitude,
      //   lon: coords.coords.longitude,
      // },
    };
    this.cars[number] = newCar;
    await this.saveCarsToStorage();
  }

  async removeCar(number: string): Promise<void> {
    delete this.cars[number];
    await this.saveCarsToStorage();
  }
}
