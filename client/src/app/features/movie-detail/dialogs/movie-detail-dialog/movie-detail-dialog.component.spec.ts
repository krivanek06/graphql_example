import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailDialogComponent } from './movie-detail-dialog.component';

describe('MovieCommentDialogComponent', () => {
	let component: MovieDetailDialogComponent;
	let fixture: ComponentFixture<MovieDetailDialogComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MovieDetailDialogComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(MovieDetailDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
