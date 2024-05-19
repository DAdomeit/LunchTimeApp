import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OrderAPI from "../api/OrderApi";
import { UserContext } from "../App";

function AddOrder() {
  const params = useParams();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [orderItem, setOrderitem] = useState({
    orderer: user,
    orderid: params.orderid,
    description: "",
    price: 0,
    paid: false,
    accompany: false
  }); 

  return (
    <div>
      <h2>Bestellung aufgeben</h2>
      <div>
        <label>Beschreibung</label><br/>
        <textarea 
          value={orderItem.description}
          onChange={e => onOrderChange(e.target.value, "description")}
        ></textarea>
      </div>
      <div>
        <label>Namen</label>
        <input 
          type="text" 
          required={true}
          value={orderItem.orderer.name}
          onChange={e => onOrderChange(e.target.value, "orderer.name")}
        ></input>
      </div>
      <div>
        <label>Preis</label>
        <input
          type="number"
          value={orderItem.price}
          onChange={e => onOrderChange(e.target.value, "price")}
        ></input>
      </div>
      <div>
        <label>Bezahlt?</label>
        <input 
          type="checkbox"
          checked={orderItem.paid}
          onChange={e => onOrderChange(e.target.checked, "paid")}
        ></input>
      </div>
      <div>
        <label>Begleitung?</label>
        <input 
          type="checkbox"
          checked={orderItem.accompany}
          onChange={e => onOrderChange(e.target.checked, "accompany")}
        ></input>
      </div>
      <button 
        onClick={() => onConfirmClicked()}
        disabled={checkButtonDisabled()}
      >
      Bestellung aufgeben
    </button>
    </div>
  );

  function checkButtonDisabled() {
    if (orderItem.description === "") return true;
    if (orderItem.orderer === "") return true;

    return false;
  }

  function onConfirmClicked() {
    user.name = orderItem.orderer.name;
    OrderAPI.createNewOrderItem(orderItem);
    OrderAPI.updateUser(user);
    navigate("/order/" + orderItem.orderid);
  }

  function onOrderChange(value, key) {
    if (key.includes(".")) {
      let path = key.split(".");
      setOrderitem(previous => ({
        ...previous,
        [path[0]]: {
          ...previous[path[0]],
          [path[1]]: value
        }
      }))
    }
    else {
      setOrderitem(previous => ({
        ...previous,
        [key]: value
      }))
    }
  }
}

export default AddOrder;