import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationProgressComponent } from './notification-bar.component';

@NgModule({
	declarations: [NotificationProgressComponent],
	imports: [CommonModule, MatProgressBarModule, MatIconModule, MatDialogModule, MatSnackBarModule],
	exports: [],
})
export class NotificationBarModule {}
