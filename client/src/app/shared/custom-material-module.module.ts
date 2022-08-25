import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const modules = [
	MatRadioModule,
	MatSnackBarModule,
	MatCardModule,
	MatIconModule,
	MatButtonModule,
	MatInputModule,
	MatCheckboxModule,
];

@NgModule({
	declarations: [],
	imports: [...modules],
	exports: [...modules],
})
export class CustomMaterialModuleModule {}
