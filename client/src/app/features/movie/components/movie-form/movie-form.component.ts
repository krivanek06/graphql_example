import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieInputCreate } from 'src/app/graphql/graphql-custom-backend.service';

@Component({
	selector: 'app-movie-form',
	templateUrl: './movie-form.component.html',
	styleUrls: ['./movie-form.component.scss'],
})
export class MovieFormComponent implements OnInit {
	@Output() addMovie: EventEmitter<MovieInputCreate> = new EventEmitter<MovieInputCreate>();

	protected readonly form: FormGroup = this.fb.nonNullable.group({
		title: ['', [Validators.required]],
		description: ['', [Validators.required]],
	});

	constructor(private fb: FormBuilder) {}

	ngOnInit(): void {}

	onSubmit(): void {
		this.form.markAllAsTouched();

		if (!this.form.invalid) {
			this.addMovie.emit({
				title: this.form.get('title')?.value,
				description: this.form.get('description')?.value,
			});
		}
	}
}
