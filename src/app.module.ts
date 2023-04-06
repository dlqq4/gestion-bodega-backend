import { Module } from '@nestjs/common';
import { InfraestructurebModule } from './infrastructure/infraestructure.module';


@Module({
  imports: [InfraestructurebModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
