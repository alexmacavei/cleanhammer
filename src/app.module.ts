import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { DomainModule } from './domain/domain.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { UseCasesModule } from './usecases/usecases.module';

@Module({
  imports: [
    DomainModule,
    UseCasesModule,
    InfrastructureModule,
    MongooseModule.forRoot(
      process.env.DATABASE_URL || 'mongodb://localhost:27017/cleanhammer',
    ),
  ],
  controllers: [AppController],
})
export class AppModule {}
