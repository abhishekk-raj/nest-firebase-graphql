import { Module } from '@nestjs/common';
import { TaskResolver } from './task.resolver';
import { CreateTaskMutationService } from './service/create-task-mutation.service';
import { ReadTaskListQueryService } from './service/read-task-list-query.service';

@Module({
  imports: [],
  providers: [
    TaskResolver,
    CreateTaskMutationService,
    ReadTaskListQueryService,
  ],
})
export class TaskModule {}
