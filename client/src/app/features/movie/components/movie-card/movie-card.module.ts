import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovieCardComponent } from './movie-card.component';

@NgModule({
	declarations: [MovieCardComponent],
	imports: [CommonModule, SharedModule],
	exports: [MovieCardComponent],
})
export class MovieCardModule {}
