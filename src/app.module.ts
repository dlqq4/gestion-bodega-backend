import { Module } from '@nestjs/common';
import { InfraestructurebModule } from './infrastructure/infraestructure.module';
import { join } from 'node:path';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [InfraestructurebModule,
    ConfigModule.forRoot({
      envFilePath: join(
        process.cwd(),
        'environments',
        `.env.${process.env.SCOPE?.trimEnd()}`,
      ),
      isGlobal: true,
    }),],
  controllers: [],
  providers: [],
})
export class AppModule {}
