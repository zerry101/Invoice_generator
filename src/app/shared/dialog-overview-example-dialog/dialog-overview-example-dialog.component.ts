import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'igx-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.component.html',
  styleUrls: ['./dialog-overview-example-dialog.component.scss']
})
export class DialogOverviewExampleDialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>) { }

  dataYouWantToReturn = false;



  onOk() {
    this.dialogRef.close({ data: !this.dataYouWantToReturn });
  }

}
