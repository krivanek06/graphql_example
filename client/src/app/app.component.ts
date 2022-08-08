import { Component, OnInit } from '@angular/core';
import { GetAllMoviesGQL } from './graphql/graphql-custom-backend.service';
import { DialogService } from './shared/services/dialog-service.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'graphql_example_client';
	constructor(private getAllMoviesGQL: GetAllMoviesGQL) {}
	ngOnInit(): void {
		this.getAllMoviesGQL.fetch().subscribe(console.log);
		DialogService.showNotificationBar('lasdlldasdsa', 'error');
	}
}
