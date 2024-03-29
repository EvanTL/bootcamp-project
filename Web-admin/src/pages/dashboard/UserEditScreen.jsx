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
  
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsersContext } from "@/context/user_context";

export function UserEditScreen() {
  const userId = window.location.pathname.split('/')[3]
  const { fetchSingleUser, single_user, single_user_loading, updateUser, update_data } = useUsersContext()
  const navigate = useNavigate()

  useEffect(() => {
    fetchSingleUser(userId)
  }, [])

  const [name, setName] = useState(single_user.name)
  const [email, setEmail] = useState(single_user.email)
  const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
      e.preventDefault()

      updateUser(userId, name, email, password)
      alert(update_data.message)
      navigate('/dashboard/users')
    }

    return (
      
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Edit User: {single_user.name}
        </Typography>

        {!single_user_loading && (
          <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 sm:w-full">
          <div className="mb-4 grid grid-cols-2 gap-6">
            <div>
            <Input size="lg" label="Name" value={name} onChange={(e) => {
              setName(e.target.value)
            }} />
            <Input size="lg" type="password" label="Password" value={password} onChange={(e) => {
              setPassword(e.target.value)
            }} />
            </div>
            <div>
            <Input size="lg" label="Email" value={email} onChange={(e) => {
              setEmail(e.target.value)
            }} />
            </div>
          </div>
          <Button className="mt-6" fullWidth type="submit">
            Update
          </Button>
        </form>
        )}
        
      </Card>
    );
  }