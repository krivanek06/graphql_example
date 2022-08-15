import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
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
	],
	exports: [NotificationBarModule, CustomMaterialModuleModule, FormsModule, MatFormFieldModule, ReactiveFormsModule],
})
export class SharedModule {
	constructor(_dialogService: DialogService) {}
}
