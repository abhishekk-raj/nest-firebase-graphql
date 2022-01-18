import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ITask } from '../model/task.model';

@ObjectType()
export class TaskDto {
  @Field(() => ID)
  public taskId: string | undefined;

  @Field(() => String)
  public task: string | undefined;

  @Field(() => Date, {
    nullable: true,
  })
  public startDate: Date | undefined;

  @Field(() => Date, {
    nullable: true,
  })
  public endDate: Date | undefined;

  constructor(initialValues: ITask) {
    if (initialValues) {
      this.taskId = initialValues.taskId;
      this.task = initialValues.task;
      this.startDate = initialValues.startDate;
      this.endDate = initialValues.endDate;
    }
  }
}
