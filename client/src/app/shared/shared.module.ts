import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotificationBarModule } from './components/notification-bar/notification-bar.module';
import { CustomMaterialModuleModule } from './custom-material-module.module';
import { DialogService } from './services/dialog-service.service';
@NgModule({
	declarations: [],
	providers: [DialogService],
	imports: [
		CommonModule,
		NotificationBarModule,
		CustomMaterialModuleModule,
		CustomMaterialModuleModule,
		FormsModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatTooltipModule,
		MatDialogModule,
	],
	exports: [
		NotificationBarModule,
		CustomMaterialModuleModule,
		FormsModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatTooltipModule,
		MatDialogModule,
	],
})
export class SharedModule {
	constructor(_dialogService: DialogService) {}
}
