import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Textarea,
    Select,
    Option,
  } from "@material-tailwind/react";
import { useProductsContext } from "@/context/products_context";
  
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function ProductEditScreen() {
  const productId = window.location.pathname.split('/')[3]
  const { fetchSingleProduct, updateSingleProduct, single_product, update_data } = useProductsContext()
  const navigate = useNavigate()

  useEffect(() => {
    fetchSingleProduct(productId)
  }, [])

  const {title, price, description} = single_product

  const [image, setImage] = useState();
  const [name, setName] = useState(title)
  const [newPrice, setNewPrice] = useState(price)
  const [desc, setDesc] = useState(description)
    function handleChange(e) {
      console.log(image)
      setImage(URL.createObjectURL(e.target.files[0]));
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      await updateSingleProduct(name, newPrice, desc, image, productId)
      console.log(update_data)
      if (update_data.status === 200){
        navigate('/dashboard/products')
      }
    }

    return (
      
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Edit Product: {title}
        </Typography>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 sm:w-full">
          <div className="mb-4 grid grid-cols-2 gap-6">
            <div>
            <Input size="lg" label="Name" value={name} onChange={(e) => {
              setName(e.target.value)
            }} />
            <Select label="Category">
              <Option>Celana</Option>
              <Option>Topi</Option>
              <Option>T-Shirt</Option>
            </Select>
            <Textarea  size="lg" color="purple" label="Description" value={desc} onChange={(e) => {
            }} />
            <input type="file" className="mt-2" onChange={handleChange} />
            <img className="h-45 w-full rounded-lg object-cover object-center" src={image} />
            </div>
            <div>
            <Input size="lg" label="Price" value={newPrice} onChange={(e) => {
              console.log("Price:" + newPrice)
            }} />
            </div>
          </div>
          <Button className="mt-6" fullWidth type="submit">
            Update
          </Button>
        </form>
      </Card>
    );
  }