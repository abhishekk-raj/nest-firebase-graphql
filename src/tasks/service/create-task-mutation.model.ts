import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateTaskMutation {
  @Field(() => String)
  public readonly task: string = undefined;
}
