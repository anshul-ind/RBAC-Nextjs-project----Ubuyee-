export type ApiOk<T> = { ok: true; data: T };
export type ApiError = { ok: false; message: string };
export type ApiResponse<T> = ApiOk<T> | ApiError;
