import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OrderAPI from "../api/OrderApi";
import { UserContext } from "../App";
import { Button, Checkbox, FormControlLabel, Stack, TextField } from "@mui/material";

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
    <Stack spacing={2}>
      <h2>Bestellung aufgeben</h2>
        <TextField
          label="Beschreibung" 
          value={orderItem.description}
          required
          multiline
          onChange={e => onOrderChange(e.target.value, "description")}
        />
        <TextField 
          label="Namen"
          required
          value={orderItem.orderer.name}
          onChange={e => onOrderChange(e.target.value, "orderer.name")}
        />
        <TextField
          label="Preis"
          type="number"
          value={orderItem.price}
          onChange={e => onOrderChange(e.target.value, "price")}
        />
        <FormControlLabel label="Bezahlt" control={
          <Checkbox
            checked={orderItem.paid}
            onChange={e => onOrderChange(e.target.checked, "paid")}
          />
        } />
        <FormControlLabel label="Begleitung" control={
          <Checkbox
            checked={orderItem.accompany}
            onChange={e => onOrderChange(e.target.checked, "accompany")}
          />
        } />
      <Button
        onClick={() => onConfirmClicked()}
        disabled={checkButtonDisabled()}
      >
        Bestellung aufgeben
      </Button>
    </Stack>
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