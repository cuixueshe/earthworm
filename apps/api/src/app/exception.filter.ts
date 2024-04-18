import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();
    const message = exception.message ?? `${status >= 500 ? "Service Error" : "Client Error"}`;

    const errorResponse = {
      data: {},
      message,
    };
    if (typeof exceptionResponse === "object" && exceptionResponse.hasOwnProperty("message")) {
      errorResponse.message = exceptionResponse["message"];
    }
    response.status(status);
    response.header("Content-Type", "application/json; charset=utf-8");
    response.send(errorResponse);
  }
}
