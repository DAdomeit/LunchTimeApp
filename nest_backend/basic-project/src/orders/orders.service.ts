import { HttpException, Injectable } from '@nestjs/common';
import { ORDERS } from 'mocks/orders.mock';

@Injectable()
export class OrdersService {
    orders = ORDERS;

    getAllOrders(): Promise<any> {
        return new Promise(resolve => {
            resolve(this.orders);
        });
    }

    getOrder(orderId): Promise<any> {
        return new Promise(resolve => {
            const order = this.orders.find(x => x.id === orderId);
            if (!order) {
                throw new HttpException('Order with Id: ' + orderId + ' was not found.', 404)
            }
            resolve(order);
        });
    }

    addOrder(order): Promise<any> {
        return new Promise(resolve => {
            this.orders.push(order);
            resolve(this.orders);
        });
    }

    deleteOrder(orderId): Promise<any> {
        return new Promise(resolve => {
            let i = this.orders.findIndex(x => x.id === orderId);
            if (i === -1) {
                throw new HttpException('Order with Id: ' + orderId + ' was not found.', 404)
            }
            this.orders.splice(i ,1);
            resolve(this.orders);
        });
    }
}
