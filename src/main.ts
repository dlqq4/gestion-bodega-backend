import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  //**************************SWAGGER**********************************/

  const config = new DocumentBuilder()
    .setTitle('BODEGA')
    .setDescription('PRODUCT WAREHOUSE MANAGEMENT')
    .setVersion('1.0')
    .addTag('Bruno Fernandez')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //***************************************************************** */
  
  await app.listen(3000);

  console.log(`🚀 App is running on: ${await app.getUrl()} - WAREHOUSE MANAGEMENT - BACKEND`)

}
bootstrap();
