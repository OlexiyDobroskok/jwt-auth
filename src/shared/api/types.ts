export interface ResponseError {
  message: Message;
  errors?: ApiErrors;
}

export interface ApiResponseMessage {
  message: Message;
}
