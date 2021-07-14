import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  message(message: string, duration = 1500){
    this.snackBar.open(message, '', {
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }
}
