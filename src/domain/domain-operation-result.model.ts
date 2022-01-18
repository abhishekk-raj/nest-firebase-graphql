/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseStatusCode, responseStatusMessage } from '../types';

export class ResultStatus {
  constructor(
    public statusCode?: ResponseStatusCode,
    public message?: string,
    public exception?: any,
    public success?: boolean,
  ) {
    this.success =
      this.success !== undefined || this.statusCode === undefined
        ? this.success
        : this.statusCode === ResponseStatusCode.Success ||
          this.statusCode === ResponseStatusCode.Created;
  }
}

export class DomainOperationResult<ResultType, Operation = any> {
  public operation: Operation;

  constructor(
    public data?: ResultType | undefined,
    public status: ResultStatus = new ResultStatus(),
  ) {}

  public success(data?: ResultType): void {
    this.data = data ? data : this.data;
    this.status.success = true;
    this.status.statusCode = ResponseStatusCode.Success;
    this.status.message = responseStatusMessage[ResponseStatusCode.Success];
  }

  public created(data?: ResultType): void {
    this.data = data ? data : this.data;
    this.status.success = true;
    this.status.statusCode = ResponseStatusCode.Created;
    this.status.message = responseStatusMessage[ResponseStatusCode.Created];
  }

  public fail(
    statusCode: ResponseStatusCode = ResponseStatusCode.InternalServerError,
    message?: string,
    exception?: any,
  ): void {
    this.status.success = false;
    this.status.statusCode = statusCode;
    this.status.message = message || responseStatusMessage[statusCode];
    this.status.exception = exception;
  }

  public toResponse(): void {
    delete this.status.exception;
  }
}
