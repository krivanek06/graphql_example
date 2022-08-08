import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
	selector: 'app-notification-bar',
	templateUrl: './notification-bar.component.html',
	styleUrls: ['./notification-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationProgressComponent implements OnInit {
	constructor(
		@Inject(MAT_SNACK_BAR_DATA)
		public data: {
			message: string;
			type: 'success' | 'error' | 'notification';
		},
		private snackBarRef: MatSnackBarRef<NotificationProgressComponent>
	) {}

	ngOnInit(): void {}

	closeSnackbar(): void {
		this.snackBarRef.dismiss();
	}
}
