import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovieCardModule } from '../../components/movie-card/movie-card.module';
import { MovieFormModule } from '../../components/movie-form/movie-form.module';
import { MovieListComponent } from './movie-list.component';

const routes: Routes = [
	{
		path: '',
		component: MovieListComponent,
	},
];

@NgModule({
	declarations: [MovieListComponent],
	imports: [CommonModule, SharedModule, RouterModule.forChild(routes), MovieCardModule, MovieFormModule],
})
export class MovieListModule {}
