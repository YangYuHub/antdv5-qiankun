declare namespace API {
  type AppResponse<T = any> = {
    code: string;
    data: T;
    message: string | null;
  };

  type MessageError = {
    success: boolean;
    message?: string;
  };
  type PageParams = {
    current?: number;
    pageSize?: number;
  };
}
