import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class GraphQLResolver {
	@Query(() => String)
	public healthCheck() {
		return new Date().getTime();
	}
}
