export class CreateOrderItemDTO {
    readonly id: string;
    readonly orderer: string;
    readonly orderid: string;
    readonly description: string;
    readonly price: number;
    readonly paid: boolean;
    readonly accompany: boolean;
}