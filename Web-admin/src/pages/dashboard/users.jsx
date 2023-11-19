import DataTable from 'react-data-table-component';
import React from 'react';
import { useUsersContext } from '@/context/user_context';
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
   

  export function Users() {
    
    const [selectedRows, setSelectedRows] = React.useState(false);
    const [toggledClearRows, setToggleClearRows] = React.useState(false);
    const { users, deleteUsers } = useUsersContext()
    const navigate = useNavigate()

    const handleChange = ({ selectedRows }) => {
      setSelectedRows(selectedRows);
      console.log(selectedRows);
    };

    const handleClearRows = () => {
      setToggleClearRows(!toggledClearRows);
      selectedRows.map(user => {
        deleteUsers(user._id)
      })
      setSelectedRows(false)
    }

    const TABLE_HEAD = [
      {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
        cell : (record) => (
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {record.name}
              </Typography>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-70"
              >
                {record._id}
              </Typography>
            </div>
          </div>
        )
      },
      {
        name: 'Email',
        selector: row => row.email,
        sortable: true,
      },
      {
        name: 'Role',
        selector: row => row.role,
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
            navigate(`/dashboard/edituser/${record._id}`)
          }}>
            <PencilIcon className="h-4 w-4" />
          </IconButton>
          
          <IconButton variant="text" onClick={() => {
            deleteUsers(record._id)
          }}>
            <TrashIcon className="h-4 w-4" />
          </IconButton>
  
          </div>,
      },
    ];
    
    return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card className="h-full w-full">
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            List Users
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
          <Button onClick={handleClearRows} className="flex items-center gap-3" size="sm">
            Clear Selected Rows
          </Button>
        </div>
        
        <DataTable
            columns={TABLE_HEAD}
            data={users}
            selectableRows
            onSelectedRowsChange={handleChange}
            clearSelectedRows={toggledClearRows}
        />
      </Card>
    </div>
    );
  }