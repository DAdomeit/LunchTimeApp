import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderitemsModule } from 'src/orderitems/orderitems.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [OrderitemsModule, UsersModule]
})
export class OrdersModule {}
