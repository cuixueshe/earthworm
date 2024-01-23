export interface ErrorVo {
  message: string
  statusCode: number
}

export function isError(data: any): data is ErrorVo {
  return data && data.message && data.statusCode
}
