import DataTable from 'react-data-table-component';
import React from 'react';
import { useOrdersContext } from '@/context/order_context';
import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
  } from "@heroicons/react/24/outline";
  import { PencilIcon, UserPlusIcon, TrashIcon } from "@heroicons/react/24/solid";
  import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
    Alert,
  } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

  const showAlerts = {
    "blue": true,
    "green": true,
    "orange": true,
    "red": true,
  };
   
  const TABS = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Monitored",
      value: "monitored",
    },
    {
      label: "Unmonitored",
      value: "unmonitored",
    },
  ];
   

  export function Orders() {
    
    const [selectedRows, setSelectedRows] = React.useState(false);
    const [toggledClearRows, setToggleClearRows] = React.useState(false);
    const {orders} = useOrdersContext()
    const navigate = useNavigate()

    const handleChange = ({ selectedRows }) => {
      setSelectedRows(selectedRows);
      console.log(selectedRows);
    };

    const TABLE_HEAD = [
      {
        name: 'Name',
        selector: row => row.userData,
        sortable: true,
        cell : (record) => {
          const {userData} = record
            return(
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {userData[0].name}
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal opacity-70"
                  >
                    {userData[0].email}
                  </Typography>
                </div>
              </div>
            )
        } 
      },
      {
        name: 'Order ID',
        selector: row => row._id,
        sortable: true,
      },
      {
        name: 'Item amount',
        selector: row => `${row.items.length} ${row.items.length > 1 ? "Items" : "Item"}`,
        sortable: true,
      },
      {
        name: 'Date',
        selector: row => {
          const date = new Date(row.createdAt)
          return date.toLocaleDateString('en-US')
        },
        sortable: true,
      },
      {
        name: 'Action',
        button: true,
        cell: (record) => <div>
          <IconButton variant="text" onClick={() => {
            navigate(`/dashboard/order/${record._id}`)
          }}>
            <PencilIcon className="h-4 w-4" />
          </IconButton>
  
          </div>,
      },
    ];
    
      return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
          <Card className="h-full w-full">
            <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
              <Typography variant="h6" color="white">
                List Orders
              </Typography>
            </CardHeader>
            { 
              selectedRows.length > 0 ? 
              (
                <Card color='blue' className=" border-l-4 p-4 mb-4 mx-4" role="alert">
                  <h6>{selectedRows.length} {selectedRows.length > 1 ? <>items</> : <>item</>} selected</h6>
                </Card>
               ) : null
            }
            <div className="ml-4 flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button className="flex items-center gap-3" size="sm">
                Clear Selected Rows
              </Button>
            </div>
            
            <DataTable
                columns={TABLE_HEAD}
                data={orders}
                selectableRows
                onSelectedRowsChange={handleChange}
                clearSelectedRows={toggledClearRows}
            />
          </Card>
        </div>
        ); 
  }