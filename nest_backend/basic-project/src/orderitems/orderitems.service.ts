import { HttpException, Injectable } from '@nestjs/common';
import { ORDERITEMS } from 'mocks/orderitems.mock';

@Injectable()
export class OrderitemsService {
    orderitems = ORDERITEMS;

    getOrderItemsForOrder(orderId): Promise<any> {
        return new Promise(resolve => {
            const orderItems = this.orderitems.filter(x => x.orderid === orderId);
            resolve(orderItems);
        });
    }

    addOrderItem(orderItem): Promise<any> {
        return new Promise(resolve => {
            this.orderitems.push(orderItem);
            resolve(this.orderitems);
        });
    }

    updateOrderItem(orderItem): Promise<any> {
        return new Promise(resolve => {
            const i = this.orderitems.findIndex(x => x.id === orderItem.id);
            if (i === -1) {
                throw new HttpException('OrderItem with Id: ' + orderItem.id + ' was not found.', 404)
            }
            this.orderitems[i] = orderItem;
            resolve(this.orderitems);
        }) 
    }

    deleteOrderItem(orderItemId): Promise<any> {
        return new Promise(resolve => {
            let i = this.orderitems.findIndex(x => x.id === orderItemId);
            if (i === -1) {
                throw new HttpException('OrderItem with Id: ' + orderItemId + ' was not found.', 404)
            }
            this.orderitems.splice(i ,1);
            resolve(this.orderitems);
        }) 
    }
}
