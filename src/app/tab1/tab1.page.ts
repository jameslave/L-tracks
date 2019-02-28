import { Component } from '@angular/core';
import { BarcodeScannerService } from '../services/barcode-scanner.service';
import { AlertController, ToastController } from '@ionic/angular';
import { CarsService } from '../services/cars.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(
    private barcodeScanner: BarcodeScannerService,
    private alertController: AlertController,
    private toastController: ToastController,
    private carsService: CarsService
  ) { }

  get cars() {
    return Object.values(this.carsService.cars);
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
          type: 'text',
          placeholder: 'e.g., 3233'
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

  async removeCar(number: string): Promise<void> {
    await this.carsService.removeCar(number);
  }
}
