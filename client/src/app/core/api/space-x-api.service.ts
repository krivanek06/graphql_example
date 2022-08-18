import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, ApolloBase } from 'apollo-angular';
import { Observable } from 'rxjs';
import { LaunchesPastDocument } from './../../graphql/graphql-space-x.service';

@Injectable({
	providedIn: 'root',
})
export class SpaceXApiService {
	constructor(private apollo: Apollo) {}

	get spaceXApi(): ApolloBase<any> {
		return this.apollo.use('spaceX');
	}

	getLaunchesPast(): Observable<ApolloQueryResult<unknown>> {
		return this.spaceXApi.query({
			query: LaunchesPastDocument,
		});
	}
}
