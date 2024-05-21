export default class NestConnector {
    static baseUrl = "http://localhost:3100";

    static createNewOrder(order) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        const raw = JSON.stringify({
            "id": crypto.randomUUID(),
            "creator": order.creator.id,
            "statuscode": "0",
            "restaurant": order.restaurant,
            "paypal": order.paypal
          });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        return fetch(this.baseUrl + "/Orders", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }

    static getAllOrders() {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        
        return fetch(this.baseUrl + "/Orders", requestOptions)
            .then((response) => response.text())
            .then((result) => JSON.parse(result))
            .catch((error) => console.error(error));
    }

    static getOrder(orderId) {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
          
        return fetch(this.baseUrl + "/Orders/" + orderId, requestOptions)
            .then((response) => response.text())
            .then((result) => JSON.parse(result))
            .catch((error) => console.error(error));
    }

    static deleteOrder(orderId) {
        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
        };
        
        fetch(this.baseUrl + "/Orders?orderId=" + orderId, requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }

    static createNewOrderItem(orderItem) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "id": crypto.randomUUID(),
            "orderer": orderItem.orderer.id,
            "orderid": orderItem.orderid,
            "description": orderItem.description,
            "price": orderItem.price,
            "paid": orderItem.paid,
            "accompany": orderItem.accompany
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        return fetch(this.baseUrl + "/Orderitems", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }

    static updateOrderItem(orderItem) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "id": orderItem.id,
            "orderer": orderItem.orderer.id,
            "orderid": orderItem.orderid,
            "description": orderItem.description,
            "price": orderItem.price,
            "paid": orderItem.paid,
            "accompany": orderItem.accompany
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        return fetch(this.baseUrl + "/Orderitems/update", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }

    static deleteOrderItem(orderItemId) {
        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
          };
          
          return fetch(this.baseUrl + "/Orderitems?orderitemId=" + orderItemId, requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }

    static getUser(userId) {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
          };
          
        return fetch(this.baseUrl + "/Users/" + userId, requestOptions)
            .then((response) => response.text())
            .then((result) => JSON.parse(result))
            .catch((error) => console.error(error));
    }

    static updateUser(user) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        const raw = JSON.stringify({
            "id": user.id,
            "name": user.name,
            "paypal": user.paypal
          });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        return fetch(this.baseUrl + "/Users/update", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }
}