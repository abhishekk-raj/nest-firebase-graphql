import { DomainOperationResult } from './domain-operation-result.model';

export interface IDomainMutationService<MutationType, ResultType> {
  serve: (command: MutationType) => Promise<DomainOperationResult<ResultType>> | DomainOperationResult<ResultType>;
}

export interface IDomainQueryService<QueryType, ResultType> {
  serve: (query: QueryType) => Promise<DomainOperationResult<ResultType>> | DomainOperationResult<ResultType>;
}

export interface IDomainQueryWithoutParameterService<ResultType> {
  serve: () => Promise<DomainOperationResult<ResultType>> | DomainOperationResult<ResultType>;
}
