import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainModule } from './domain/domain.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { UsecasesModule } from './usecases/usecases.module';

@Module({
  imports: [
    DomainModule,
    UsecasesModule,
    InfrastructureModule,
    MongooseModule.forRoot('mongodb://localhost:27017/cleanhammer'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
