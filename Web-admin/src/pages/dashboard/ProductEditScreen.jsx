import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Textarea,
    Option,
  } from "@material-tailwind/react";
import { useProductsContext } from "@/context/products_context";
  
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormControlLabel, MenuItem, Radio, RadioGroup, Select } from "@mui/material";

export function ProductEditScreen() {
  const productId = window.location.pathname.split('/')[3]
  const { fetchSingleProduct, updateSingleProduct, single_product, update_data, form,
    setForm, } = useProductsContext()
  const navigate = useNavigate()

  useEffect(() => {
    fetchSingleProduct(productId)
  }, [])

  console.log(form)

  const {title} = single_product
  const [file, setFile] = useState(null)


    function handleChange(e) {
      setForm({
        ...form,
        image: e.target.files[0]
      });
      setFile(URL.createObjectURL(e.target.files[0]))
    }

    const handleChangeform = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      })
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      const formData = new FormData()
      formData.append('newTitle', form.name)
      formData.append('newPrice', form.price)
      formData.append('newDesc', form.description)
      formData.append('newFeatured', form.featured)

      if(form.image){
        formData.append('image', form.image)
      }

      await updateSingleProduct(formData, productId)
      alert(update_data.message)
      navigate('/dashboard/products')
    }

    console.log(form)

    return (
      
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Edit Product: {title}
        </Typography>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 sm:w-full">
          <div className="mb-4 grid grid-cols-2 gap-6">
            <Input size="lg" label="Name" name="name" value={form.name} onChange={handleChangeform} />

            <Select labelId="Category" name="category" className="w-full" value={form.category} onChange={handleChangeform}>
              <MenuItem value="Celana">Celana</MenuItem>
              <MenuItem value="Topi">Topi</MenuItem>
              <MenuItem value="T-Shirt">T-Shirt</MenuItem>
            </Select>

            <Textarea  size="lg" color="purple" name="description" label="Description" value={form.description} onChange={handleChangeform} />
            <RadioGroup
              name="featured"
              value={form.featured}
              onChange={handleChangeform}>
                <FormControlLabel
                value={true}
                control={<Radio/>}
                label="True">
                </FormControlLabel>

                <FormControlLabel
                value={false}
                control={<Radio/>}
                label="False">
                </FormControlLabel>
              </RadioGroup>
              <Input size="lg" label="Price" name="price" value={form.price} onChange={handleChangeform} />
            <input type="file" name="image" className="mt-2" onChange={handleChange} />
            <img src={file === null ? `http://localhost:8000/${form.image}` : file} className="h-45 w-full rounded-lg object-cover object-center" alt="not found" />
            {/* <Checkbox size='md' label="featured" name="featured" value={form.featured} onChange={(e) => {
              setForm({
                ...form,
                featured: !form.featured
              })
            }} /> */}
          </div>
          <Button className="mt-6" fullWidth type="submit">
            Update
          </Button>
        </form>
      </Card>
    );
  }