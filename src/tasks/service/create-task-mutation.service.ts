import { Injectable } from '@nestjs/common';
import { CreateTaskMutation } from './create-task-mutation.model';
import { TaskDto } from '../dto/task.dto';
import { DomainOperationResult, IDomainMutationService } from '../../domain';
import { getFirestore } from 'firebase-admin/firestore';
import { ResponseStatusCode } from '../../types';

@Injectable()
export class CreateTaskMutationService
  implements IDomainMutationService<CreateTaskMutation, TaskDto>
{
  public async serve(
    operation: CreateTaskMutation,
  ): Promise<DomainOperationResult<TaskDto>> {
    const result = new DomainOperationResult<TaskDto>();

    const db = getFirestore();
    const docRef = db.collection('tasks').doc();
    await docRef.set({
      taskId: docRef.id,
      task: operation.task,
      startDate: new Date(),
      endDate: undefined,
    });

    const doc = await db.collection('tasks').doc(docRef.id).get();
    if (!doc.exists) {
      result.fail(ResponseStatusCode.NotFound, 'Record not created!');
    } else {
      result.success(
        new TaskDto({
          taskId: doc.data().taskId,
          task: doc.data().task,
          startDate: doc.data().startDate.toDate(),
          endDate: doc.data().endDate,
        }),
      );
    }

    return Promise.resolve(result);
  }
}
