import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class TaskResolver {
  @Query(() => String)
  public TaskListRead(): string {
    return 'task list';
  }
}
