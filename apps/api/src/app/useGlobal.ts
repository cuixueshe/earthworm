import { INestApplication, ValidationPipe } from "@nestjs/common";

import { HttpExceptionFilter } from "./exception.filter";

export const appGlobalMiddleware = (app: INestApplication) => {
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
};
