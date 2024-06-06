import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as csurf from 'csurf';
import helmet from 'helmet';
import { Logger } from '@nestjs/common';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const middlewareFunctions = [
  //   csurf(),
  //   helmet(),
  // ];

  // app.use(...middlewareFunctions);

  app.enableCors();
  // app.enableCors({
  //   origin: 'http://localhost:3000',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   allowedHeaders: 'Content-Type, Accept',
  // });
  
  const logger = new Logger('Bootstrap');
  app.useLogger(logger);

  // For high-traffic websites in production, it is strongly recommended to offload compression from the application server;
  // typically in a reverse proxy (e.g., Nginx). In that case, you should not use compression middleware.
  app.use(compression());

  await app.listen(3000);
}

bootstrap();

/*
  csurf()
  helps prevent Cross-Site Request Forgery (CSRF) attacks. 
  CSRF attacks occur when a malicious website tricks a user's browser into making unintended requests to a different website where the user is authenticated. 
  csurf generates and validates unique tokens for each user session, which are then included in forms or API requests

  helmet()
  setting various HTTP headers to enhance security. 
  These headers include X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Content-Security-Policy, and more. 
  Each header serves a different purpose, such as 
  preventing content sniffing, 
  protecting against clickjacking attacks, 
  enabling XSS (Cross-Site Scripting) protection, and 
  enforcing a Content Security Policy to mitigate the risks associated with cross-site scripting attacks, inline scripts, and more

  conclusion
  csurf helps prevent CSRF attacks by generating and validating tokens
  helmet enhances security by setting HTTP headers to mitigate various security risks, such as content sniffing, clickjacking, XSS attacks, and more
*/