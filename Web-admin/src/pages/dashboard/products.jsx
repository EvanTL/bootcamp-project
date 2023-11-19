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

export function Products() {
  const { products, fetchProducts, deleteProducts, update_data } = useProductsContext()
  const navigate = useNavigate()

  const [selectedRows, setSelectedRows] = React.useState(false);

  const handleChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
    console.log(selectedRows);
  };

  const handleClearRows = () => {
    selectedRows.map(product => {
      deleteProducts(product._id)
    })
    setSelectedRows(false)
  }

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
      name: 'Price',
      selector: row => new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(row.price),
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
        <IconButton variant="text" disabled={selectedRows.length === 0} onClick={() => {
          navigate(`/dashboard/editproduct/${record._id}`)
        }}>
          <PencilIcon className="h-4 w-4" />
        </IconButton>
        
        <IconButton variant="text" disabled={selectedRows.length !== 0} onClick={() => {
          deleteProducts(record._id)
          console.log(update_data)
        }}>
          <TrashIcon className="h-4 w-4" />
        </IconButton>
  
        </div>,
    },
  ];

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-6 p-6">
          <Typography variant="h6" color="white">
            List Products
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
          <Button onClick={() => navigate('/dashboard/createproduct')} className="flex items-center gap-3" size="sm">
            Add Product
          </Button>
        </div>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <DataTable
            columns={TABLE_HEAD}
            data={products}
            selectableRows
            onSelectedRowsChange={handleChange}
        />
        </CardBody>
      </Card>
      
    </div>
  );
}

export default Products;
