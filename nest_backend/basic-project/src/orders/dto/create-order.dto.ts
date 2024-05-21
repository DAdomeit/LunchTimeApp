export class CreateOrderDTO {
    readonly id: string;
    readonly creator: string;
    readonly statuscode: number;
    readonly restaurant: string;
    readonly paypal: string;
}