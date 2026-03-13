export interface ApiOk<T> { ok: true; data: T }
export interface ApiError { ok: false; message: string }
export type ApiResponse<T> = ApiOk<T> | ApiError;
