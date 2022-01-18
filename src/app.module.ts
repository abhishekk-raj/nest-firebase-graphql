import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TaskModule } from './tasks/task.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      debug: true,
      playground: true,
      sortSchema: true,
      introspection: true,
      context: ({ req }) => ({ req }),
      cors: {
        credentials: true,
        origin: true,
      },
    }),
    TaskModule,
  ],
})
export class AppModule {}
