import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApolloClientOptions, ApolloLink, InMemoryCache, split } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { ApolloModule, APOLLO_NAMED_OPTIONS, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { createPersistedQueryLink } from 'apollo-angular/persisted-queries';
import { sha256 } from 'crypto-hash';
import { environment } from 'src/environments/environment';
import { localMoviesReactiveVars } from '../features/movie/models/movie.model';
import { DialogService } from '../shared/services/dialog-service.service';
import { MovieInfoFragment, MovieSelectType } from './graphql-custom-backend.service';

/*
  how to use multiple endpoints: https://stackoverflow.com/questions/56212486/connect-an-angular-app-to-multiple-apollo-clients
*/

const errorLink = onError(({ graphQLErrors, networkError, response }) => {
	// React only on graphql errors
	if (graphQLErrors && graphQLErrors.length > 0) {
		if ((graphQLErrors[0] as any)?.statusCode >= 400 && (graphQLErrors[0] as any)?.statusCode < 500) {
			// user rejected request error from server
			const message = Array.isArray(graphQLErrors[0].message) ? graphQLErrors[0].message[0] : graphQLErrors[0].message;
			DialogService.showNotificationBar(message, 'error', 5000);
		} else {
			// server error with status 500 (do not display text)
			DialogService.showNotificationBar('An error happened on the server, we will be fixing it soon', 'error', 5000);
		}

		// log errors in console
		graphQLErrors.forEach(({ message, locations, path }) =>
			console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
		);
	}
	if (networkError) {
		console.log(`[Network error]:`, networkError);
		DialogService.showNotificationBar(
			'A network error occurred while executing the operation. Try refreshing the page.',
			'error',
			5000
		);
	}
});

const basicContext = setContext((_, { headers }) => {
	const token = 'random token';
	return {
		headers: {
			...headers,
			Accept: 'charset=utf-8',
			authorization: `Bearer ${token}`,
			'Content-Type': 'application/json', // Will break other content types (file upload)
		},
	};
});

export function createDefaultApollo(httpLink: HttpLink): ApolloClientOptions<any> {
	const cache = new InMemoryCache({
		// TODO - missing type safety
		// dataIdFromObject(responseObject) {
		// 	switch (responseObject.__typename) {
		// 		case 'Movie':
		// 			return `Movie:${responseObject.id}`;
		// 		default:
		// 			return defaultDataIdFromObject(responseObject);
		// 	}
		// },

		typePolicies: {
			Movie: {
				// keyFields: ['title', 'id'], // to change Movie indentification in cachce
				fields: {
					title: {
						read(title: string) {
							return title.toUpperCase();
						},
					},
					isSelected: {
						read(selectType: MovieSelectType) {
							return selectType ?? MovieSelectType.Unselected;
						},
					},
				},
			},
			Query: {
				queryType: true,
				fields: {
					getAllLocalMoviesReactiveVars: {
						read() {
							return localMoviesReactiveVars();
						},
					},
					getAllLocalMovies: {
						read(data: MovieInfoFragment[] | undefined, { variables }) {
							return data ?? [];
						},
						merge(existing: MovieInfoFragment[] = [], incoming: MovieInfoFragment | MovieInfoFragment[]) {
							// if array is passed, ignore already saved movies
							if (Array.isArray(incoming)) {
								return [...incoming];
							}
							return [incoming, ...existing];
						},
					},
				},
			},
		},
	});

	// create http with persisten queries
	// https://apollo-angular.com/docs/recipes/automatic-persisted-queries
	const http = createPersistedQueryLink({
		sha256,
	}).concat(
		httpLink.create({
			uri: environment.custom_graphql_backend_url,
		})
	);

	// add token to WS connections
	const ws = new WebSocketLink({
		uri: environment.custom_graphql_backend_ws,
		options: {
			reconnect: true,
			connectionParams: {
				authorization: `Bearer 1234`,
			},
		},
	});

	// depending on what kind of operation is being sent
	const link = split(
		// split based on operation type
		({ query }) => {
			const { kind, operation } = getMainDefinition(query) as any;
			return kind === 'OperationDefinition' && operation === 'subscription';
		},
		ws,
		http
	);

	const config: ApolloClientOptions<any> = {
		connectToDevTools: !environment.production,
		assumeImmutableResults: true,
		cache,
		link: ApolloLink.from([basicContext, errorLink, link]),
		defaultOptions: {
			watchQuery: {
				errorPolicy: 'all',
			},
		},
	};

	return config;
}

export function createNamedApollo(httpLink: HttpLink): Record<string, ApolloClientOptions<any>> {
	return {
		spaceX: {
			name: 'spaceX',
			link: httpLink.create({ uri: 'https://api.spacex.land/graphql/' }),
			cache: new InMemoryCache(),
		},
	};
}

@NgModule({
	imports: [BrowserModule, HttpClientModule, ApolloModule],
	providers: [
		{
			provide: APOLLO_OPTIONS,
			useFactory: createDefaultApollo,
			deps: [HttpLink],
		},
		{
			provide: APOLLO_NAMED_OPTIONS,
			deps: [HttpLink],
			useFactory: createNamedApollo,
		},
	],
})
export class GraphQLModule {}
