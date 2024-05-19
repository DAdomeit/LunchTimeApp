import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OrderAPI from "../api/OrderApi";
import { UserContext } from "../App";

function Order() {
  const params = useParams();
  const navigate = useNavigate();
  const isNewOrder = params.id === undefined;
  const { user, setUser } = useContext(UserContext);

  const [currentOrder, setCurrentOrder] = useState({
    id: null,
    creator: {id: "", name: ""},
    statuscode: 0,
    restaurant: "",
    paypal: "",
    orderItems: []
  });

  useEffect(() => {
      if (params.id != null) {
        let order = OrderAPI.getOrder(params.id);
        setCurrentOrder(order);
      }
      else {
        setCurrentOrder({
          id: null,
          creator: user,
          statuscode: 0,
          restaurant: "",
          paypal: user.paypal,
          orderItems: []
        })
      }
  }, [params.id, user]);
  
  if (currentOrder === null) {
    return (<div>Bestellung konnte nicht gefunden werden</div>)
  }

  return (
    <div>
      <h2>{isNewOrder ? "Neue Bestellung" : "Bestellung bei: " + currentOrder.restaurant}</h2>
      {isNewOrder &&
      <div>
        <label>Restaurant</label>
        <input type="text" disabled={!isNewOrder} value={currentOrder.restaurant} onChange={e => onOrderChange(e.target.value, "restaurant")}></input>
      </div>
      }
      <div>
        <label>Einkäufer</label>
        <input type="text" disabled={!isNewOrder} value={currentOrder.creator.name} onChange={e => onOrderChange(e.target.value, "creator.name")}></input>
      </div>
      {isNewOrder ?
        <div>
            <label>Paypal Link </label>
              <input type="text" value={currentOrder.paypal} onChange={e => onOrderChange(e.target.value, "paypal")}></input>
        </div> :
        (<div>
          <a href={ currentOrder.paypal } target="_blank" rel="noreferrer">Bezahlen</a>
        </div>)
      }
      {isNewOrder &&
        <button 
          onClick={() => onCreateOrderClicked()}
          disabled={checkButtonDisabled()}
        >
          Erstellen
        </button>
      }
      {!isNewOrder &&
        <button 
        onClick={() => onCreateOrderItemClicked()}
      >
        Bestellung aufgeben
      </button>
      }
      {!isNewOrder && isMyOrder() &&
        <button 
        onClick={() => onDeleteOrderClicked()}
      >
        Bestellung löschen
      </button>
      }
      {!isNewOrder &&
        <table>
          <thead>
            <tr>
              <th>Besteller</th>
              <th>Beschreibung</th>
              <th>Preis</th>
              <th>Bezahlt?</th>
              <th>Begleitung?</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentOrder.orderItems.map(orderitem => { return (
            <tr key={orderitem.id}>
              <td>{orderitem.orderer.name}</td>
              <td>{orderitem.description}</td>
              <td>{(!isMyOrder() && !isMyOrderItem(orderitem)) ?
                orderitem.price :
                <input 
                  type="number"
                  value={orderitem.price}
                  onChange={e => onOrderItemChange(orderitem, e.target.value, "price")}
                />
              }</td>
              <td>
                <input 
                  type="checkbox"
                  checked={orderitem.paid} 
                  disabled={!(isMyOrder()) && !(isMyOrderItem(orderitem))}
                  onChange={e => onOrderItemChange(orderitem, e.target.checked, "paid")}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={orderitem.accompany}
                  disabled={!(isMyOrderItem(orderitem))}
                  onChange={e => onOrderItemChange(orderitem, e.target.checked, "accompany")}
                />
              </td>
              <td>
                {(isMyOrder() || isMyOrderItem(orderitem)) &&
                  <button disabled={!orderitem.hasChanges} onClick={() => onSaveOrderItemClicked(orderitem)}>
                    Speichern
                  </button>}
                {(orderitem.orderer.id === user.id) &&
                  <button onClick={() => onDeleteOrderItemClicekd(orderitem.id)}>
                    Löschen
                  </button>}
              </td>
            </tr>
            )}
            )}
          </tbody>
        </table>
      }
    </div>
  );

  function isMyOrder() {
    return currentOrder.creator.id === user.id;
  }

  function isMyOrderItem (orderitem) {
    return orderitem.orderer.id === user.id;
  }

  function onOrderChange(value, key) {
    if (key.includes(".")) {
      let path = key.split(".");
      setCurrentOrder(previous => ({
        ...previous,
        [path[0]]: {
          ...previous[path[0]],
          [path[1]]: value
        }
      }))
    }
    else {
      setCurrentOrder(previous => ({
        ...previous,
        [key]: value
      }))
    }
  }

  function checkButtonDisabled() {
    if (!isNewOrder) return false;
    if (currentOrder.restaurant === "" || currentOrder.creator === "") return true;

    return false;
  }

  function onCreateOrderClicked() {
    OrderAPI.createNewOrder(currentOrder);
    OrderAPI.updateUser(currentOrder.creator);
    setUser(currentOrder.creator);
    navigate("/")
  }

  function onCreateOrderItemClicked() {
    navigate("/addorder/" + params.id);
  }

  function onDeleteOrderClicked() {
    OrderAPI.deleteOrder(currentOrder.id);
    navigate("/");
  }

  function onDeleteOrderItemClicekd(orderItemId) {
    let i = currentOrder.orderItems.findIndex(x => x.id === orderItemId);
    const updatedOrder = {...currentOrder};
    updatedOrder.orderItems.splice(i, 1);
    OrderAPI.deleteOrderItem(orderItemId);
    setCurrentOrder(updatedOrder);
  }

  function onSaveOrderItemClicked(orderitem) {
    delete orderitem.hasChanges;
    OrderAPI.updateOrderItem(orderitem);
    setOrderItem(orderitem);
  }

  function onOrderItemChange(orderitem, value, key) {
    orderitem[key] = value;
    orderitem.hasChanges = true;
    setOrderItem(orderitem);
  }

  function setOrderItem(orderitem) {
    setCurrentOrder(previous => {
      let update = {
        ...previous
      }
      let i = update.orderItems.findIndex(x =>  x.id === orderitem.id);
      update.orderItems[i] = orderitem;
      return update;
    })
  }
}


export default Order;