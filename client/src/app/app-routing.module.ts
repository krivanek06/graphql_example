import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'movies',
		pathMatch: 'full',
	},
	{
		path: 'movies',
		loadChildren: () => import('./features/movie/pages/movie-list/movie-list.module').then((m) => m.MovieListModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
