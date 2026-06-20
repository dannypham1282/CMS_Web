import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-alert-dialog',
  imports: [],
  templateUrl: './alert-dialog.html',
  styleUrl: './alert-dialog.css',
})
export class AlertDialogComponent {
 // Input signals to manage state and text content
  isOpen = input<boolean>(false);
  title = input<string>('Confirm Action');
  message = input<string>('Are you sure you want to proceed?');
  confirmedOk = output<void>();
  onConfirmOk() {
    this.confirmedOk.emit();
  }
}
