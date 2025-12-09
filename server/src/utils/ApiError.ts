import { BaseResponse } from "../types/response.types.js";

class ApiError extends Error {
  public payload: BaseResponse;
  public status: number;

  constructor(message: string, status: number = 400, errors?: any) {
    super(message);
    this.status = status;

    this.payload = {
      success: false,
      message,
      errors,
    };

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export default ApiError;
