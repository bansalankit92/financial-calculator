import { Injectable, EventEmitter, NgZone } from '@angular/core';
import { Toast } from '../models/toast';
import { MatLegacySnackBarConfig as MatSnackBarConfig, MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private config: MatSnackBarConfig;
  public toastEmitter: EventEmitter<Toast> = new EventEmitter<Toast>();

  constructor(private snackbar: MatSnackBar, private zone: NgZone) { 
    this.config = new MatSnackBarConfig();
    this.config.panelClass = ["snackbar-container"];
    this.config.duration = 4000;
  }

  error(message: string) {
    this.config.panelClass = ["snackbar-container", "error"];
    this.show(message);
  }

  success(message: string) {
    this.config.panelClass = ["snackbar-container", "success"];
    this.show(message);
  }

  warning(message: string) {
    this.config.panelClass = ["snackbar-container", "warning"];
    this.show(message);
  }

  private show(message: string, config?: MatSnackBarConfig) {
    config = config || this.config;
    this.zone.run(() => {
      this.snackbar.open(message, "x", config);
    });
  }
}
