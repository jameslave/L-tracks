import { Component } from '@angular/core';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { sortBy } from 'lodash';
import * as distanceInWords from 'date-fns/distance_in_words';

import { BarcodeScannerService } from '../services/barcode-scanner.service';
import { CarsService } from '../services/cars.service';
import Car from '../models/Car';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(
    private barcodeScanner: BarcodeScannerService,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private carsService: CarsService
  ) { }

  get cars(): { [id: string]: Car } {
    return this.carsService.cars;
  }

  get sortedCarIds(): string[] {
    const carIds = Object.keys(this.cars);
    const sortedCarIds = carIds.sort((id1, id2) => {
      return (new Date(this.cars[id2].updatedAt[0]) as any) - (new Date(this.cars[id1].updatedAt[0]) as any);
    });
    return sortedCarIds;
  }

  async saveCarFromBarcode(): Promise<void> {
    const barcodeScanResult = await this.barcodeScanner.scan();
    if (!barcodeScanResult.cancelled && barcodeScanResult.text) {
      await this.carsService.addCar(barcodeScanResult.text, 'scan');
    }
  }

  async saveCarFromPrompt(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Enter car number',
      inputs: [
        {
          name: 'carNumber',
          type: 'number',
          placeholder: 'e.g., 3233',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler: async (value) => {
            await this.carsService.addCar(value.carNumber, 'manual');
          }
        }
      ]
    });

    await alert.present();
  }

  getTimeFromNow(dateString: string) {
    return distanceInWords(new Date(), dateString, { addSuffix: true });
  }

  async onPressCar(number: string): Promise<void> {
    const actionSheet = await this.actionSheetController.create({
      header: `Car ${number}`,
      buttons: [
        {
          text: 'Undo latest ride',
          icon: 'undo',
          handler: () => {
            this.carsService.undoLatestEntry(number);
          }
        },
        {
          text: 'Delete',
          icon: 'trash',
          role: 'destructive',
          handler: () => {
            this.carsService.removeCar(number);
          }
        },
      ],
    });
    await actionSheet.present();
  }
}
