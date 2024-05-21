import { Module } from '@nestjs/common';
import { OrderitemsController } from './orderitems.controller';
import { OrderitemsService } from './orderitems.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [OrderitemsController],
  providers: [OrderitemsService],
  exports: [OrderitemsService],
  imports: [UsersModule]
})
export class OrderitemsModule {}
