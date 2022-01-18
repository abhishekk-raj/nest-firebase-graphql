import { ApolloError } from 'apollo-server-express';

import { DomainOperationResult } from './domain-operation-result.model';
import { ResponseStatusCode, responseStatusMessage } from '../types';

enum ApolloErrorCode {
  BadRequest = 'BAD_USER_INPUT',
  Unauthenticated = 'UNAUTHENTICATED',
  Forbidden = 'FORBIDDEN',
}

export abstract class ResolversServiceBase {
  protected handleResult<T>(result: DomainOperationResult<T>): T {
    if (result.status.success) {
      return result.data;
    } else {
      {
        const statusCode = result.status.statusCode ?? ResponseStatusCode.InternalServerError;
        const statusMessage = result.status.message ?? responseStatusMessage[statusCode];
        const operationName = result?.operation?.constructor?.name ?? 'UnknownOperation';
        let apolloErrorCode;
        switch (statusCode) {
          case ResponseStatusCode.UnAuthorized:
            apolloErrorCode = ApolloErrorCode.Unauthenticated;
            break;
          case ResponseStatusCode.BadRequest:
            apolloErrorCode = ApolloErrorCode.BadRequest;
            break;
          case ResponseStatusCode.Forbidden:
            apolloErrorCode = ApolloErrorCode.Forbidden;
            break;
          default:
            apolloErrorCode = responseStatusMessage[statusCode];
            break;
        }
        throw (new ApolloError(statusMessage, apolloErrorCode, {statusCode: statusCode, operation: {__name: operationName, ...result.operation}, originalException: result.status.exception}));
      }
    }
  }
}
