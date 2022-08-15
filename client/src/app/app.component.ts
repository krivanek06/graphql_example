import { Component, OnInit } from '@angular/core';
import { SpaceXApiService } from './core/api/space-x-api.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	constructor(private SpaceXApiService: SpaceXApiService) {}
	ngOnInit(): void {
		this.SpaceXApiService.getLaunchesPast().subscribe(console.log);
	}
}
