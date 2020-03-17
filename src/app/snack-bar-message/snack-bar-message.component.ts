import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'snack-bar-message',
  template: '<span>{{ data }}</span>',
  styles: [`
    span {
      color: white;
    }
  `],
})
export class NewSnackBarMessage {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}
