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
  
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ProductCreateScreen() {
  const { update_data, createSingleProduct } = useProductsContext()
  const navigate = useNavigate()

  const [image, setImage] = useState(null);
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [desc, setDesc] = useState("")
  const [category, setCategory] = useState('')
  const [colors, setColors] = useState('')
  const [featured, setFeatured] = useState(false)
    function handleChange(e) {
      setImage(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      const formData = new FormData()
      formData.append('image', image)
      formData.append('title', name)
      formData.append('price', price)
      formData.append('description', desc)
      formData.append('colors', colors)
      formData.append('featured', featured)
      
      await createSingleProduct(formData)
      console.log(update_data)
      if(JSON.stringify(update_data) !== "{}"){
        alert(update_data.message)
        if (update_data.status === 200){
          navigate('/dashboard/products')
        }
      }
    }

    return (
      
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Add Product
        </Typography>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 sm:w-full">
          <div className="mb-4 grid grid-cols-2 gap-6">
            <div>
            <Input size="lg" label="Name" value={name} onChange={(e) => {
              setName(e.target.value)
            }} />
            <Select label="Category" value={category} onChange={(e) => {
              setCategory(e.target.value)
              console.log(category)
            }}>
              <Option value="Celana">Celana</Option>
              <Option value="Topi">Topi</Option>
              <Option value="T-Shirt">T-Shirt</Option>
            </Select>
            <Textarea  size="lg" color="purple" label="Description" value={desc} onChange={(e) => {
              setDesc(e.target.value)
            }} />
            <input type="file" className="mt-2" onChange={handleChange} />
            <img src={image} className="h-45 w-full rounded-lg object-cover object-center" alt="not found" />
            </div>
            <div>
            <Input size="lg" label="Price" value={price} onChange={(e) => {
              setPrice(e.target.value)
            }} />
            <Input size="lg" label="Colors (hex)" value={colors} onChange={(e) => {
              setColors(e.target.value)
            }} />
            <Checkbox size='md' label="featured" value={featured} onChange={(e) => {
              setFeatured(!featured)
            }} />
            </div>
          </div>
          <Button className="mt-6" fullWidth type="submit">
            Create Product
          </Button>
        </form>
      </Card>
    );
  }