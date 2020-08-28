import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      introspection: true,
      debug: true,
      playground: true,
      cors: true,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
    }),
    UsersModule,
    PostsModule,
  ],
})
export class AppModule {}
