import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import OrderAPI from "../api/OrderApi";

function OrderList () {
  const [allOrders, setOrders] = useState([]);
  const tableRows = allOrders.map(order => <OrderRow order={order}/>);

  useEffect(() => {
    setOrders(OrderAPI.getAllOrders());
  }, [])

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Restaurant</th>
            <th>Einkäufer</th>
            <th>Status</th>
            <th>Bestellen</th>
          </tr>
        </thead>
        <tbody>{ tableRows }</tbody>
      </table>
    </div>
  );
}

function OrderRow ({ order }) {
  return (
    <tr key={order.id}>
      <td>{ order.restaurant }</td>
      <td>{ order.creator.name }</td>
      <td>{ OrderAPI.OrderStatus[order.statuscode] }</td>
      <td><NavLink to={ "/order/" + order.id }>öffnen</NavLink></td>
    </tr>
  );
}

export default OrderList;