import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import OrderAPI from "../api/OrderApi";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useTheme } from "@emotion/react";
import { ChevronRight } from "@mui/icons-material";

function OrderList () {
  const [allOrders, setOrders] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    setOrders(OrderAPI.getAllOrders());
  }, [])

  return (
    <div>
      <h2>Alle Bestellungen</h2>
      <TableContainer component={Paper}>
      <Table>
        <TableHead
          sx={{
            "background-color": theme.palette.primary.main,
            "color": theme.palette.primary.contrastText
          }}
        >
          <TableRow>
            <TableCell>Restaurant</TableCell>
            <TableCell>Einkäufer</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Bestellen</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allOrders.map((order => (
            <TableRow
            key={order.id}
            >
              <TableCell>{order.restaurant}</TableCell>
              <TableCell>{order.creator.name}</TableCell>
              <TableCell>{OrderAPI.OrderStatus[order.statuscode]}</TableCell>
              <TableCell><NavLink to={ "/order/" + order.id }><ChevronRight/> </NavLink></TableCell>
            </TableRow>
          )))}
        </TableBody>
      </Table>
      </TableContainer>
    </div>
  );
}

export default OrderList;