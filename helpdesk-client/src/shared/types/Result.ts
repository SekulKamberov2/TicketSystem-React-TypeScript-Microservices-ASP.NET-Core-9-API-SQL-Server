export class Result<T> {
  data?: T;
  isSuccess: boolean;
  error?: string;
  statusCode?: number;

  private constructor(
    isSuccess: boolean,
    data?: T,
    error?: string,
    statusCode?: number
  ) {
    this.isSuccess = isSuccess;
    this.data = data;
    this.error = error;
    this.statusCode = statusCode;
  }

  static success<T>(data: T): Result<T> {
    return new Result<T>(true, data);
  }

  static failure<T>(error: string, statusCode?: number): Result<T> {
    return new Result<T>(false, undefined, error, statusCode);
  }
}