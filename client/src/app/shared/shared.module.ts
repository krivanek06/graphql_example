import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationBarModule } from './components/notification-bar/notification-bar.module';
import { DialogService } from './services/dialog-service.service';

@NgModule({
	declarations: [],
	providers: [DialogService],
	imports: [CommonModule, NotificationBarModule, MatSnackBarModule],
	exports: [NotificationBarModule],
})
export class SharedModule {
	constructor(_dialogService: DialogService) {}
}
