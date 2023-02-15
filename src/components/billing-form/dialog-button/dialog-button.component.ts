import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
// import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-button',
  // selector:'mat-dialog-actions',

  templateUrl: './dialog-button.component.html',
  styleUrls: ['./dialog-button.component.scss']
})
export class DialogButtonComponent {

  constructor(public dialog: MatDialog) {}


  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
@Component({
  selector: 'dialog-content-example-dialog',

  templateUrl: './dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {}
