import DataTable from 'react-data-table-component';
import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { useProductsContext } from "@/context/products_context";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom"

export function Tables() {
  const { products } = useProductsContext()
  const navigate = useNavigate()

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
      selector: row => row.title,
      sortable: true,
      cell : (record) => (
        <div className="flex items-center gap-3">
          <Avatar src={`http://localhost:8000/${record.imageUrl}`} size="sm" />
          <div className="flex flex-col">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {record.title}
            </Typography>
          </div>
        </div>
      )
    },
    {
      name: 'Price',
      selector: row => row.price,
      sortable: true,
    },
    {
      name: 'Colors',
      selector: row => row.colors,
      sortable: true,
    },
    {
      name: 'Featured',
      selector: row => row.featured,
      sortable: true,
      cell : (record) => (
        <div className="flex items-center gap-3">
          <Chip
            variant="gradient"
            color={record.featured ? "green" : "blue-gray"}
            value={record.featured ? "featured" : "-"}
            className="py-0.5 px-2 text-[11px] font-medium"
          />
        </div>
      )
    },
    {
      name: 'Action',
      button: true,
      cell: (record) => <div>
        <IconButton variant="text" onClick={() => {
          navigate('/dashboard/editproduct')
        }}>
          <PencilIcon className="h-4 w-4" />
        </IconButton>
        
        <IconButton variant="text" onClick={() => {
          dele
        }}>
          <TrashIcon className="h-4 w-4" />
        </IconButton>
  
        </div>,
    },
  ];

  const [selectedRows, setSelectedRows] = React.useState(false);
    const [toggledClearRows, setToggleClearRows] = React.useState(false);

    const handleChange = ({ selectedRows }) => {
      setSelectedRows(selectedRows);
      console.log(selectedRows);
    };

    const handleClearRows = () => {
      setToggleClearRows(!toggledClearRows);
    }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            List Products
          </Typography>
        </CardHeader>
        <div className="ml-4 flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button onClick={handleClearRows} className="flex items-center gap-3" size="sm">
            Clear Selected Rows
          </Button>
        </div>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <DataTable
            columns={TABLE_HEAD}
            data={products}
        />
        </CardBody>
      </Card>
      
    </div>
  );
}

export default Tables;
