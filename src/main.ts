import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MongoServerErrorExceptionFilter } from '../src/infrastructure/exception-filters/mongo-server-error.exception-filter';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  //**************************EXCEPTION FILTER*************************/
  app.useGlobalFilters(new MongoServerErrorExceptionFilter());

  //**************************SWAGGER**********************************/

  const config = new DocumentBuilder()
    .setTitle('BODEGA')
    .setDescription('PRODUCT WAREHOUSE MANAGEMENT')
    .setVersion('1.0')
    .addTag('Bruno Fernandez')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //***************************CORS***************************************/

  /*
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  });
  */

  app.enableCors({
    origin: ['https://desplieguefront.web.app', 'http://localhost:4200'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://desplieguefront.web.app', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });
  
  //**********************************************************************/
  
  await app.listen(process.env.PORT);

  console.log(`🚀 App is running on: ${await app.getUrl()} - WAREHOUSE MANAGEMENT - BACKEND`)

}
bootstrap();
