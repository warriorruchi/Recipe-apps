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

const RegisterForm = ({ setUpdate }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSmallerThanSm] = useMediaQuery("(max-width: 30em)")
  let url = process.env.REACT_APP_URL

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add your registration logic here

    axios
      .post(`${url}/users/reister`, {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.token))
        setUpdate((prev) => !prev)
      })

    console.log("Email:", email)
    console.log("Password:", password)
    console.log("Confirm Password:", confirmPassword)
  }

  return (
    <Box
      w={isSmallerThanSm ? "100%" : "400px"}
      mx="auto"
      mt="10vh"
      p={4}
      bg="white"
      borderRadius="lg"
      boxShadow="lg"
    >
      <VStack spacing={4}>
        <Heading size="md">Register</Heading>
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
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl id="confirmPassword" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            Register
          </Button>
        </form>
      </VStack>
    </Box>
  )
}

export default RegisterForm
