import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieInfoFragment, MovieInputEdit } from 'src/app/graphql/graphql-custom-backend.service';

@Component({
	selector: 'app-movie-card',
	templateUrl: './movie-card.component.html',
	styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
	@Output() editMovie: EventEmitter<MovieInputEdit> = new EventEmitter<MovieInputEdit>();
	@Output() deleteMovie: EventEmitter<number> = new EventEmitter<number>();

	@Input() movieInfo!: MovieInfoFragment;

	protected readonly form: FormGroup = this.fb.nonNullable.group({
		title: ['', [Validators.required]],
		description: ['', [Validators.required]],
	});

	editing = false;

	constructor(private fb: FormBuilder) {}

	ngOnInit(): void {}

	onToggleEdit(): void {
		this.editing = !this.editing;
	}

	onSubmit(): void {
		this.form.markAllAsTouched();
		if (!this.form.invalid) {
			this.editMovie.emit({
				id: this.movieInfo.id,
				title: this.form.get('title')?.value,
				description: this.form.get('description')?.value,
			});
			this.editing = false;
		}
	}

	onDeleteMovie(): void {
		this.deleteMovie.emit(this.movieInfo.id);
	}
}
