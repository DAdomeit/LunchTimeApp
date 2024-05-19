export default class LocalStorageConnector {
    
    static createNewOrder(order) {
        order.creator = order.creator.id;
        this.createNewItem(order, "Orders");
    }

    static getAllOrders() {
        let orders = this.getItemsForKey("Orders");
        return orders.map(x => {
            x.creator = this.getUser(x.creator);
            return x;
        })
    
    }

    static getOrder(orderId) {
        let orders = this.getItemsForKey("Orders");
        let filteredOrders = orders.filter(x => x.id === orderId);
        let order = null;
        if (filteredOrders.length === 1) {
            order = filteredOrders[0];
            order.orderItems = this.getOrderitemsForOrder(orderId);
        }
        order.creator = this.getUser(order.creator);

        return order;
    }

    static deleteOrder(orderId) {
        let orders = this.getItemsForKey("Orders");
        let i = orders.findIndex(x => x.id === orderId);
        if (i > -1) {
            this.getOrderitemsForOrder(orderId).forEach(x => this.deleteOrderItem(x));
            orders.splice(i, 1);
            localStorage.setItem("Orders", JSON.stringify(orders));
        }
    }

    static createNewOrderItem(orderItem) {
        orderItem.orderer = orderItem.orderer.id;
        this.createNewItem(orderItem, "OrderItems");
    }

    static updateOrderItem(orderItem) {
        let updateItem = {...orderItem}
        updateItem.orderer = orderItem.orderer.id;
        let orderItems = this.getItemsForKey("OrderItems");
        let i = orderItems.findIndex(x => x.id === updateItem.id);
        if (i > -1) {
            orderItems[i] = updateItem;
        }
        localStorage.setItem("OrderItems", JSON.stringify(orderItems));
    }

    static deleteOrderItem(orderItemId) {
        let orderItems = this.getItemsForKey("OrderItems");
        let i = orderItems.findIndex(x => x.id === orderItemId);
        if (i > -1){
            orderItems.splice(i, 1);
        }
        localStorage.setItem("OrderItems", JSON.stringify(orderItems));
    }

    static createNewItem(item, key) {
        let items = this.getItemsForKey(key);

        if (item.id == null) {
            item.id = crypto.randomUUID();
        }
        items.push(item);
        localStorage.setItem(key, JSON.stringify(items));
    }
    
    static createNewUser(user) {
        this.createNewItem(user, "Users");
    }
    static getUser(userId) {
        let users = this.getItemsForKey("Users");
        let filteredUsers = users.filter(x => x.id === userId);
        if (filteredUsers.length === 1) return filteredUsers[0];
        else return {};
    }

    static updateUser(user) {
        let users = this.getItemsForKey("Users");
        let i = users.findIndex(x => (x.id === user.id));
        if(i < 0) i = users.length;
        users[i] = user;
        localStorage.setItem("Users", JSON.stringify(users));
    }

    static getOrderitemsForOrder(orderId) {
        return this.getItemsForKey("OrderItems")
            .filter(x => x.orderid === orderId)
            .map(x => {
                x.orderer = this.getUser(x.orderer);
                return x;
            });
    }

    static getItemsForKey(key) {
        let items = JSON.parse(localStorage.getItem(key));
        if (!Array.isArray(items)) {
            items = [];
        }
        return items;
    }
}