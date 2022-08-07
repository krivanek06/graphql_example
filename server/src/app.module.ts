import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLBackendModule } from './graphql/graphql.module';

@Module({
  imports: [GraphQLBackendModule],
  controllers: [], // AppController
  providers: [AppService],
})
export class AppModule {}
