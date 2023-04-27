interface IApiResponse<T> {
  isSuccess: boolean;
  message: string;
  data?: T;
}

export default IApiResponse;
