import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationProgressComponent } from './notification-bar.component';

describe('NotificationProgressComponent', () => {
	let component: NotificationProgressComponent;
	let fixture: ComponentFixture<NotificationProgressComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [NotificationProgressComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(NotificationProgressComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
