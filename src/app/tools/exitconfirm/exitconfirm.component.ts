import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exitconfirm',
  templateUrl: './exitconfirm.component.html',
  styleUrls: ['./exitconfirm.component.css']
})
export class ExitconfirmComponent {
  auth = new FirebaseTSAuth();

  constructor(public dialogRef: MatDialogRef<ExitconfirmComponent>,
    private router: Router) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
    this.auth.signOut();
    this.router.navigate(['/']);
  }
}
