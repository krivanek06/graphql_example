import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MovieInfoFragment } from 'src/app/graphql/graphql-custom-backend.service';
import { localMoviesReactiveVars } from '../models/movie.model';
import { GetAllLocalMoviesReactiveVarsGQL } from './../../../graphql/graphql-custom-backend.service';

@Injectable({
	providedIn: 'root',
})
export class MovieLocalService {
	constructor(private getAllLocalMoviesReactiveVarsGQL: GetAllLocalMoviesReactiveVarsGQL) {}

	getAllLocalMoviesReactiveVars(): Observable<MovieInfoFragment[]> {
		// return localMoviesReactiveVars()]); // <-- this also works
		return this.getAllLocalMoviesReactiveVarsGQL.watch().valueChanges.pipe(map((res) => res.data.getAllLocalMoviesReactiveVars));
	}

	addMovieIntoLocalMoviesReactiveVars(movie: MovieInfoFragment): void {
		localMoviesReactiveVars([movie, ...localMoviesReactiveVars()]);
	}
}
