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
              {record.email}
            </Typography>
          </div>
        </div>
      )
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
          alert(record.name)
        }}>
          <PencilIcon className="h-4 w-4" />
        </IconButton>
        
        <IconButton variant="text" onClick={() => {
          alert(record.job);
        }}>
          <TrashIcon className="h-4 w-4" />
        </IconButton>

        </div>,
  	},
  ];
   

  export function SortableTable() {
    
    const [selectedRows, setSelectedRows] = React.useState(false);
    const [toggledClearRows, setToggleClearRows] = React.useState(false);

    const handleChange = ({ selectedRows }) => {
      setSelectedRows(selectedRows);
      console.log(selectedRows);
    };

    const handleClearRows = () => {
      setToggleClearRows(!toggledClearRows);
    }

    const { users } = useUsersContext()
    
    return (
      <Card className="h-full w-full">
        
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
    );
  }