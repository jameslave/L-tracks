import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor(private toastController: ToastController) { }

  async showErrorToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      color: 'danger',
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'Close'
    });
    toast.present();
  }
}
