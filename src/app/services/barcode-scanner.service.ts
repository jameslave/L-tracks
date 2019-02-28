import { Injectable } from '@angular/core';
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner/ngx';

@Injectable({
  providedIn: 'root'
})
export class BarcodeScannerService {

  constructor(
    private barcodeScanner: BarcodeScanner,
  ) { }

  async scan(): Promise<BarcodeScanResult> {
    try {
      const barcodeScanResult: BarcodeScanResult = await this.barcodeScanner.scan();

      return barcodeScanResult;
    } catch (error) {
      console.error('Error', error.message);
    }
  }
}
