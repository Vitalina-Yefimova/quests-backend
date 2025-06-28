export class BaseResponseDto<T> {
  constructor(data: Partial<T>) {
    Object.assign(this, data);
  }
}
