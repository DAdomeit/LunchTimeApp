import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dto/create-order.dto';
import { OrderitemsService } from 'src/orderitems/orderitems.service';
import { UsersService } from 'src/users/users.service';

@Controller('orders')
export class OrdersController {
    constructor(
        private orderService: OrdersService,
        private orderItemService: OrderitemsService,
        private userService: UsersService
    ) {}
    
    @Get()
    async getAllOrders() {
        const orders = await this.orderService.getAllOrders();
        const preparedOrders = [];
        const creatorPromises = orders.map(x => {
            return this.userService.getUser(x.creator)
        });
        const users = await Promise.all(creatorPromises);
        for (let i = 0; i < orders.length; i++) {
            preparedOrders.push({
                ...orders[i],
                creator: users[i]
            })                
        }
        return preparedOrders;
    }

    @Get(':orderId')
    async getOrder(@Param('orderId') orderId) {
        const order = await this.orderService.getOrder(orderId);
        const orderitems = await this.orderItemService.getOrderItemsForOrder(orderId);
        const preparedOrder = {...order};
        const preparedOrderitems = [];
        
        const ordererPromises = orderitems.map(x => {
            return this.userService.getUser(x.orderer)
        });
        const users = await Promise.all(ordererPromises);
        for (let i = 0; i < orderitems.length; i++) {
            preparedOrderitems.push({
                ...orderitems[i],
                orderer: users[i]
            });
        }
        preparedOrder.orderItems = preparedOrderitems;
        preparedOrder.creator = await this.userService.getUser(order.creator);
        return preparedOrder;
    }

     @Post()
     async addOrder(@Body() createOrderDTO: CreateOrderDTO) {
        const order = await this.orderService.addOrder(createOrderDTO);
        return order;
     }

     @Delete()
     async deleteOrder(@Query() query) {
        const orders = await this.orderService.deleteOrder(query.orderId);
        return orders;
     }
}
