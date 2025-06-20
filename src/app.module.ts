import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/db.module';

@Module({
  imports: [DatabaseModule],
})
export class AppModule {}
