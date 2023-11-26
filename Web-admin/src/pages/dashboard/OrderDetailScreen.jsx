import DataTable from 'react-data-table-component';
import React, { useEffect } from 'react';
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
   

  export function OrderdetailScreen() {

    const orderId = window.location.pathname.split('/')[3]
    const {single_order, loading, getSingleOrder} = useOrdersContext()
    const navigate = useNavigate()

    useEffect(() => {
      getSingleOrder(orderId)
    }, [orderId])

    const {items, delivery, userData, totalpay} = single_order

    const TABLE_HEAD = [
      {
        name: 'Name',
        selector: row => row.name,
        cell : (record) => (
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {record.userData.name}
              </Typography>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-70"
              >
                {record.userData.email}
              </Typography>
            </div>
          </div>
        )
      },
      {
        name: 'Order ID',
        selector: row => row._id,
      },
      {
        name: 'Date',
        selector: row => {
          const date = new Date(row.createdAt)
          return date.toLocaleDateString('en-US')
        },
      },
    ];

    if (loading) {
      return <h1>Fetching...</h1>
    }
    
    
    if (!loading) {
      return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
          <Card className="h-full w-full">
            <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
              <Typography variant="h6" color="white">
                Order Detail
              </Typography>
            </CardHeader>
            <div className="grid grid-cols-3 gap-4 rounded-lg p-5 mt-5 mb-[5rem]">
                    <div className="grid grid-cols-2">
                        {userData && userData.map(data => {
                            return(
                            <>
                            <div>
                                <h4 className="font-semibold">Customer</h4>
                                <p className="font-semibold">Name: {data.name}</p>
                                <span className="font-semibold">Email: {data.email}</span>
                                <p className="font-semibold">Payment method: {data.payment}</p>
                            </div>
                            </>
                            )
                        })}
                    </div>
                    {delivery && delivery.map(data => {
                        return(
                        <>
                        <div className="grid grid-cols-2">
                        <div>
                            <h4 className="font-semibold">Shipping info</h4>
                            <p className="font-semibold">Shipping: {data.country}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div>
                            <h4 className="font-semibold">Delivery Address</h4>
                            <p className="font-semibold">{data.address}, {data.city}</p>
                            <p className="font-semibold">Postal code: {data.postal_code}</p>
                        </div>
                    </div>
                        </>
                        )
                    })}
                    <div className="col-span-2">
                        <h4 className="font-semibold text-center">Your Cart</h4>
                        <div className="grid grid-cols-4">
                            <p className="col-start-3 text-center uppercase mb-2">Qty</p>
                            <p className="col-start-4 text-center uppercase">Subtotal</p>
                            {items && items.map(item => {
                            return(
                            <>
                                <img src={`http://localhost:8000/${item.image}`} className="col-start-1 rounded-lg w-[131px] h-fit mx-auto py-1"/>
                                <div className="col-start-2 border-l-2 border-black pl-5">
                                    <p>{item.name}</p>
                                    <p>Color: <div style={{background: item.color}} className='w-[0.7rem] h-[0.7rem] inline-block rounded-full'/></p>
                                </div>
                                <p className="col-start-3 text-center border-l-2 border-black">{item.amount}</p>
                                <p className="col-start-4 text-center border-l-2 border-black">{item.price * item.amount}</p>
                            </>
                            )
                        })}
                        </div>
                    </div>
                    <div className="w-[250px] mx-auto">
                        {totalpay && totalpay.map(data => {
                            return(
                                <>
                                                        <div className="bg-slate-200 p-2 grid grid-cols-2 h-fit mb-3 mt-9">
                        <>
                            <p>Subtotal:</p>
                            <p className="mb-3">{data.subtotal}</p>
                        </>
                        <>
                            <p>Shipping:</p>
                            <p className="mb-3">{data.shipping}</p>
                        </>
                        <>
                            <p>Tax:</p>
                            <p className="mb-3">{data.tax}</p>
                        </>
                        <>
                            <p>Total:</p>
                            <p className="mb-3">{data.subtotal + data.shipping + data.tax}</p>
                        </>
                        </div>
                                </>
                            )
                        })}
                        <button className="btn col-start-3" onClick={() => navigate('/dashboard/orders')}>Back to order list</button>
                    </div>
                </div>
          </Card>
        </div>
        );  
    }
  }