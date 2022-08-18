import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovieFormComponent } from './movie-form.component';

@NgModule({
	declarations: [MovieFormComponent],
	imports: [CommonModule, SharedModule],
	exports: [MovieFormComponent],
})
export class MovieFormModule {}
