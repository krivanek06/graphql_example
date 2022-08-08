import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationProgressComponent } from '../components/notification-bar/notification-bar.component';

@Injectable()
export class DialogService {
	private static snackBar: MatSnackBar;

	constructor(private snackBar: MatSnackBar) {
		DialogService.snackBar = snackBar;
	}

	static showNotificationBar(
		message: string,
		type: 'success' | 'error' | 'notification' = 'success',
		duration: number = 4000
	): void {
		if (!DialogService.snackBar) {
			throw new Error('DialogService.snackBar not initialized');
		}

		DialogService.snackBar.openFromComponent(NotificationProgressComponent, {
			horizontalPosition: 'end',
			verticalPosition: 'top',
			panelClass: ['g-custom-snack-bar'],
			duration,
			data: {
				message,
				type,
			},
		});
	}
}
