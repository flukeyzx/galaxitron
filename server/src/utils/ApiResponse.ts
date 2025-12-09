import { Response } from "express";
import { BaseResponse } from "../types/response.types.js";

class ApiResponse<T> {
  private payload: BaseResponse;

  constructor() {
    this.payload = {
      success: true,
      message: "Success",
    };
  }

  setMessage(message: string) {
    this.payload.message = message;
    return this;
  }

  setData(data: T) {
    this.payload.data = data;
    return this;
  }

  send(res: Response, statusCode: number = 200) {
    return res.status(statusCode).json(this.payload);
  }
}

export default ApiResponse;
