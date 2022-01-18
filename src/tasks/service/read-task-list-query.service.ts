import { TaskDto } from '../dto/task.dto';
import {
  DomainOperationResult,
  IDomainQueryWithoutParameterService,
} from '../../domain';
import { ITask } from '../model/task.model';
import { getFirestore } from 'firebase-admin/firestore';
import { firestore } from 'firebase-admin';
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;
import Timestamp = firestore.Timestamp;

export class ReadTaskListQueryService
  implements IDomainQueryWithoutParameterService<TaskDto[]>
{
  public async serve(): Promise<DomainOperationResult<TaskDto[]>> {
    const result = new DomainOperationResult<TaskDto[]>();

    const db = getFirestore();
    const snapshot = await db.collection('tasks').get();
    const data: ITask[] = [];
    snapshot.forEach((doc: QueryDocumentSnapshot<ITask>) => {
      const startDate = doc.data().startDate as unknown as Timestamp;
      data.push(
        new TaskDto({
          taskId: doc.id,
          task: doc.data().task,
          startDate: startDate.toDate(),
          endDate: doc.data().endDate,
        }),
      );
    });

    result.success(data);
    return Promise.resolve(result);
  }
}
