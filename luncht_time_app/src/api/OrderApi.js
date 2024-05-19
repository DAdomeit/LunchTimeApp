import Connector from "./LocalStorageConnector" ;

class OrderAPI {
    static OrderStatus = {
        0: "Neu",
        1: "Offen",
        2: "Abgeschlossen"
    }

    static createNewOrder(order) {
        Connector.createNewOrder(order);
    }

    static getAllOrders() {
        return Connector.getAllOrders()
            .sort((x, y) => x.statuscode - y.statuscode);
    }

    static getOrder(orderid) {
        let order = Connector.getOrder(orderid);
        return order;
    }

    static deleteOrder(orderId) {
        Connector.deleteOrder(orderId);
    }

    static getUser(userid) {
        return Connector.getUser(userid);
    }

    static updateUser(user) {
        Connector.updateUser(user);
    }

    static createNewOrderItem(orderItem) {
        Connector.createNewOrderItem(orderItem);
    }

    static updateOrderItem (orderItem) {
        Connector.updateOrderItem(orderItem);
    }

    static deleteOrderItem (orderItemId) {
        Connector.deleteOrderItem(orderItemId);
    }

    static initDemoData() {
        const demoCreated = localStorage.getItem("demo");
        if (demoCreated !== "1") {
            localStorage.setItem("Orders", JSON.stringify(this.Demo.Orders));
            localStorage.setItem("OrderItems", JSON.stringify(this.Demo.OrderItems));
            localStorage.setItem("Users", JSON.stringify(this.Demo.Users));
            localStorage.setItem("CurrentUserId", this.Demo.CurrentUserId);
            localStorage.setItem("demo", "1");
        }
    }

    static Demo = {
        Orders: [
            {id: "1", creator: "1", statuscode: 2, restaurant: "Pizzeria", paypal: "https://www.paypal.com/paypalme/123345sdfvbabsdsfbab"},
            {id: "2", creator: "2", statuscode: 1, restaurant: "McDonalds", paypal: "https://www.paypal.com/paypalme/123345sdfvbabsdsfbab"},
            {id: "3", creator: "3", statuscode: 0, restaurant: "Chinesisch", paypal: "https://www.paypal.com/paypalme/123345sdfvbabsdsfbab"}
        ],
        OrderItems: [
            {id: "1", orderer: "1", orderid: "3", description: "Gebratene Nudeln", price: 7.50, paid: true, accompany: true},
            {id: "2", orderer: "2", orderid: "1", description: "Pizza Salami", price: 6.50, paid: true, accompany: false},
            {id: "3", orderer: "3", orderid: "1", description: "Pizza Thunfisch", price: 6.50, paid: true, accompany: false},
            {id: "4", orderer: "4", orderid: "1", description: "Pizza Margherita", price: 6.00, paid: true, accompany: true},
            {id: "5", orderer: "5", orderid: "1", description: "Pizza Diavolo", price: 6.70, paid: true, accompany: false},
            {id: "6", orderer: "3", orderid: "2", description: "Big Mac Menu, mit Cola + 6er Chicken Nuggets", price: 13.50, paid: true, accompany: false},
            {id: "7", orderer: "4", orderid: "2", description: "2 Cheesburger und 20er Chicken Nuggets", price: null, paid: false, accompany: false}
        ],
        CurrentUserId: "1",
        Users: [
            {id: "1", name: "Dennis A", paypal: "https://www.paypal.com/paypalme/123345sdfvbabsdsfbab"},
            {id: "2", name: "Max S.", paypal: "https://www.paypal.com/paypalme/123345sdfvbabsdsfbab"},
            {id: "3", name: "Markus R.", paypal: "https://www.paypal.com/paypalme/123345sdfvbabsdsfbab"},
            {id: "4", name: "Lisa M.", paypal: "https://www.paypal.com/paypalme/123345sdfvbabsdsfbab"},
            {id: "5", name: "Dieter W", paypal: "https://www.paypal.com/paypalme/123345sdfvbabsdsfbab"}
        ]
    }
}

export default OrderAPI