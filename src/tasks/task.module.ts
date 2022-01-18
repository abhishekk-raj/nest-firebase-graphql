import { Module } from '@nestjs/common';
import { TaskResolver } from './task.resolver';

@Module({
  imports: [],
  providers: [TaskResolver],
})
export class TaskModule {}
