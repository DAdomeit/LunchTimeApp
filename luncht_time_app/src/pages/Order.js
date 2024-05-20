import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OrderAPI from "../api/OrderApi";
import { UserContext } from "../App";
import { Box, Button, Stack, TextField } from "@mui/material";
import { Add, Delete, Edit, Paid, Save } from "@mui/icons-material";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  renderEditInputCell,
  GridEditInputCell,
} from '@mui/x-data-grid';

function Order() {
  const params = useParams();
  const navigate = useNavigate();
  const isNewOrder = params.id === undefined;
  const { user, setUser } = useContext(UserContext);
  const [rowModesModel, setRowModesModel] = useState({});
  
  const [currentOrder, setCurrentOrder] = useState({
    id: null,
    creator: {id: "", name: ""},
    statuscode: 0,
    restaurant: "",
    paypal: "",
    orderItems: []
  });

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };
  
  const handleDeleteClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    let i = currentOrder.orderItems.findIndex(x => x.id === id);
    let updatedOrder = {...currentOrder};
    let updateOrderItems = [...updatedOrder.orderItems];
    updateOrderItems.splice(i, 1);
    updatedOrder.orderItems = updateOrderItems;
    OrderAPI.deleteOrderItem(id);
    setCurrentOrder(updatedOrder);
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = (newRow) => {
    OrderAPI.updateOrderItem(newRow);
    setOrderItem(newRow);
    return newRow;
  };

  const columns = [
    { field: 'orderer', headerClassName: 'grid-header', headerName: 'Besteller', valueGetter: (orderer) => orderer?.name },
    { field: 'description', headerClassName: 'grid-header', headerName: 'Beschreibung' },
    { 
      field: 'price',
      headerClassName: 'grid-header',
      headerName: 'Preis',
      type: 'number',
      editable: true,
      valueFormatter: (value) => {
        if (value === null) return '';
        return value?.toFixed(2) + " €";
      },
      preProcessEditCellProps: (props) => {
        console.log(props)
      },
      // renderEditCell: (params) => {
      //   <GridEditInputCell
      //     {...params}
      //     inputProps={{
      //       min: 0
      //     }}
      //   />
      // }
    },
    { field: 'paid', headerClassName: 'grid-header', headerName: 'Bezahlt?', type: 'boolean', editable: true },
    { field: 'accompany', headerClassName: 'grid-header', headerName: 'Begleitung', type: 'boolean', editable: true },
    { field: 'actions', headerClassName: 'grid-header', headerName: '', type:'actions', getActions:({id, row}) => {
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
      const isMyOrderItem = row.orderer.id === user.id;
      let actionItems = [];

      if ((isMyOrder() || isMyOrderItem) && !isInEditMode) {
        actionItems.push(
          <GridActionsCellItem 
            icon={<Edit />}
            label="Bearbeiten"
            onClick={handleEditClick(id)}
          />
        );
      }
      if (isInEditMode) {
        actionItems.push(
          <GridActionsCellItem 
            icon={<Save />}
            label="Speichern"
            onClick={handleSaveClick(id)}
          />
        );
      }
      if (isMyOrderItem) {
        actionItems.push(
          <GridActionsCellItem 
            icon={<Delete />}
            label="Löschen"
            onClick={handleDeleteClick(id)}
          />
        );
      }
      return actionItems;
    } }
  ]

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
    <Stack container spacing={2}>
      <h2>{isNewOrder ? "Neue Bestellung" : "Bestellung bei: " + currentOrder.restaurant}</h2>
      {isNewOrder &&
        <TextField 
          label="Restaurant"
          required
          value={currentOrder.restaurant}
          onChange={e => onOrderChange(e.target.value, "restaurant")}
        />
      }
        <TextField 
          label="Einkäufer"
          required
          disabled={!isNewOrder}
          variant={isNewOrder ? "outlined" : "filled"}
          value={currentOrder.creator.name}
          onChange={e => onOrderChange(e.target.value, "creator.name")}
        />
      {isNewOrder &&
          <TextField 
            label="Paypal Link"
            value={currentOrder.paypal}
            onChange={e => onOrderChange(e.target.value, "paypal")}
          />
      }
      {isNewOrder &&
        <Button 
          variant="contained"
          onClick={() => onCreateOrderClicked()}
          disabled={checkButtonDisabled()}
        >
          Erstellen
        </Button>
      }
      <Box
        sx={{
          width: '100%'
        }}
      >
        {!isNewOrder &&
        <DataGrid
          rows={currentOrder.orderItems}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          getRowHeight={() => 'auto'}
          autoHeight={true}
          slots={{
            toolbar: () => { return(
              <GridToolbarContainer>
                <Button startIcon={<Add/>} onClick={onCreateOrderItemClicked}>
                  Bestellung aufgeben
                </Button>
                <Button startIcon={<Paid/>} href={ currentOrder.paypal } target="_blank" rel="noreferrer">
                  Bezahlen
                </Button>
              </GridToolbarContainer>)
            } 
          }}
          getCellClassName={(props) => {
            return "datagrid-cell"
          }}
        />
        }
      </Box>
    </Stack>
  );

  function isMyOrder() {
    return currentOrder.creator.id === user.id;
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

  function setOrderItem(orderitem) {
    setCurrentOrder(previous => {
      let update = {
        ...previous
      }
      update.orderItems = update.orderItems.map(x => x.id === orderitem.id ? orderitem : x);
      return update;
    })
  }
}


export default Order;