import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { getFirestore } from 'firebase-admin/firestore';
import { TaskDto } from './dto/task.dto';
import { ITask } from './model/task.model';
import { CreateTaskMutation } from './service/create-task-mutation.model';
import { CreateTaskMutationService } from './service/create-task-mutation.service';
import { ResolversServiceBase } from '../domain';
import { GraphQLResolverResult } from '../types';
import { ReadTaskListQueryService } from './service/read-task-list-query.service';

@Resolver()
export class TaskResolver extends ResolversServiceBase {
  constructor(
    private createTaskMutationService: CreateTaskMutationService,
    private readTaskListQueryService: ReadTaskListQueryService,
  ) {
    super();
  }

  @Query(() => [TaskDto])
  public TaskListRead(): GraphQLResolverResult<[TaskDto]> {
    return this.readTaskListQueryService.serve().then(this.handleResult);
  }

  @Mutation(() => TaskDto)
  public AddNewTask(
    @Args() arguments_: CreateTaskMutation,
  ): GraphQLResolverResult<TaskDto> {
    return this.createTaskMutationService
      .serve(arguments_)
      .then(this.handleResult);
  }
}
