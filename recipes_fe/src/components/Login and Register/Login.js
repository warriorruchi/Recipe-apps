import React, { useState } from "react"
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
const LoginForm = ({ setUpdate }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSmallerThanSm] = useMediaQuery("(max-width: 30em)")
  const navigate = useNavigate("")
  let url = process.env.REACT_APP_URL

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add your login logic here
    axios
      .post(`${url}/users/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.token))
        setUpdate((prev) => !prev)
      })
    console.log("Email:", email)
    console.log("Password:", password)
  }

  return (
    <>
      <div>
        <Box
          w={isSmallerThanSm ? "100%" : "400px"}
          mx="auto"
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          boxShadow="lg"
          bg="white"
          mt="20vh"
        >
          <Heading size="md" mb={4}>
            Login
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" mt={4} isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              _hover={{
                bg: "teal.500",
              }}
            >
              Login
            </Button>
          </form>
        </Box>
      </div>
    </>
  )
}

export default LoginForm
