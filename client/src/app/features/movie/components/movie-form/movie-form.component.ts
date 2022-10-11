import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieInputCreate } from 'src/app/graphql/graphql-custom-backend.service';
import { MovieForm, PersistOptionType } from '../../models/movie.model';

@Component({
	selector: 'app-movie-form',
	templateUrl: './movie-form.component.html',
	styleUrls: ['./movie-form.component.scss'],
})
export class MovieFormComponent implements OnInit {
	@Output() addMovie: EventEmitter<MovieForm> = new EventEmitter<MovieForm>();

	protected readonly form: FormGroup = this.fb.nonNullable.group({
		title: ['', [Validators.required]],
		description: ['', [Validators.required]],
		persistOption: ['Server', [Validators.required]],
	});

	persistOptions: PersistOptionType[] = ['Server', 'LocalReactiveVariables', 'LocalApolloCache'];

	constructor(private fb: FormBuilder) {}

	ngOnInit(): void {}

	onSubmit(): void {
		this.form.markAllAsTouched();

		if (this.form.invalid) {
			return;
		}

		// get data
		const movieInputCreate: MovieInputCreate = {
			title: this.form.get('title')?.value,
			description: this.form.get('description')?.value,
		};
		const persistOption: PersistOptionType = this.form.get('persistOption')?.value;

		// emit
		this.addMovie.emit({
			movieInputCreate,
			persistOption,
		});
	}
}
