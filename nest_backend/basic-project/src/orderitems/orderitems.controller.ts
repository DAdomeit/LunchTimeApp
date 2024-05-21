import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { OrderitemsService } from './orderitems.service';
import { CreateOrderItemDTO } from './dto/create-orderitem.dto';
import { UsersService } from 'src/users/users.service';

@Controller('orderitems')
export class OrderitemsController {
    constructor(
        private orderItemService: OrderitemsService,
        private userService: UsersService
    ) {}

    @Get(':orderId')
    async GetOrderItemsForOrder(@Param('orderId') orderId) {
        const orderItems = await this.orderItemService.getOrderItemsForOrder(orderId);
        const ordererPromises = orderItems.map(x => this.userService.getUser(x.orderer));
        const preparedOrderitems = [];

        const users = await Promise.all(ordererPromises);
        for (let i = 0; i < orderItems.length; i++) {
            preparedOrderitems.push({
                ...orderItems[i],
                orderer: users[i]
            })
        }
        return preparedOrderitems;
    }

    @Post()
    async addOrderItem(@Body() createOrderItemDto: CreateOrderItemDTO) {
        const orderItem = await this.orderItemService.addOrderItem(createOrderItemDto);
        return orderItem;
    }

    @Post('update')
    async updateOrderItem(@Body() createOrderItemDto: CreateOrderItemDTO) {
        const orderItem = await this.orderItemService.updateOrderItem(createOrderItemDto);
        return orderItem;
    }

    @Delete()
     async deleteOrderitem(@Query() query) {
        const orders = await this.orderItemService.deleteOrderItem(query.orderitemId);
        return orders;
     }
}
