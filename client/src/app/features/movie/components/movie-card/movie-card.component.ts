import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieInfoFragment, MovieInputEdit, MovieSelectType } from 'src/app/graphql/graphql-custom-backend.service';

@Component({
	selector: 'app-movie-card',
	templateUrl: './movie-card.component.html',
	styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
	@Output() toggleSelectMovie: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() editMovie: EventEmitter<MovieInputEdit> = new EventEmitter<MovieInputEdit>();
	@Output() deleteMovie: EventEmitter<number> = new EventEmitter<number>();

	@Input() movieInfo!: MovieInfoFragment;
	@Input() showSelectMovie = true;

	protected readonly form: FormGroup = this.fb.nonNullable.group({
		title: ['', [Validators.required]],
		description: ['', [Validators.required]],
	});

	MovieSelectType = MovieSelectType;

	editing = false;

	get title(): AbstractControl {
		return this.form.get('title') as AbstractControl;
	}

	get description(): AbstractControl {
		return this.form.get('description') as AbstractControl;
	}

	constructor(private fb: FormBuilder) {}

	ngOnInit(): void {}

	onToggleEdit(): void {
		this.editing = !this.editing;
		this.title.patchValue(this.movieInfo.title);
		this.description.patchValue(this.movieInfo.description);
	}

	onSubmit(): void {
		this.form.markAllAsTouched();
		if (!this.form.invalid) {
			this.editMovie.emit({
				id: this.movieInfo.id,
				title: this.title?.value,
				description: this.description?.value,
			});
			this.editing = false;
		}
	}

	onDeleteMovie(): void {
		this.deleteMovie.emit(this.movieInfo.id);
	}

	onSelectChange(inSelected: boolean): void {
		this.toggleSelectMovie.emit(inSelected);
	}
}
