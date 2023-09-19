import React, { useState } from "react"
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Divider,
  Text,
  ButtonGroup,
  Stack,
  Heading,
  Image,
} from "@chakra-ui/react"
import axios from "axios"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,useDisclosure
} from '@chakra-ui/react'

function FaviouateCard({
  title,
  image,
  imageType,
  id,
  setUpdate,
}) {
  const [expanded, setExpanded] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [view, setView] = useState([])
  let url=process.env.REACT_APP_URL

  function handleView() {
    if (expanded === true) {
      setExpanded(false)
    } else {
      setExpanded(true)
      let token = JSON.parse(localStorage.getItem("token")) || ""
      if(token!==""){
      axios
        .get(`${url}/recipes/recipebyid/${id}`, {
          headers: { Authorization: token },
        })
        .then((res) => {
          console.log(res.data)
          setView(res.data)
          onOpen()
          setUpdate((prev) => !prev)
        })
      }
    }
  }

  function handleRemove() {
    let token = JSON.parse(localStorage.getItem("token")) || ""
    if (token !== "") {
      axios
        .delete(`${url}/recipes/deletebyid/${id}`, {
          headers: { Authorization: token },
        })
        .then((res) => {
          setUpdate(prev => !prev)
          onClose()
          alert("deleted from favourites")
        })
    } else {
      alert("not authorized")
    }
  }
  return (
    <>
      <Card maxW="sm">
        <CardBody>
          <Image
            src={image}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />

          <Stack mt="6" spacing="3">
            <Heading size="md">{title}</Heading>
            <Text>{imageType}</Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
          <Button  variant="solid" colorScheme="blue" onClick={handleView}>HandleView</Button>

<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Modal Title</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <div dangerouslySetInnerHTML={{ __html:view.summary  }}/>
      <div> {view&& view.id}</div>
      <div>{view&& view.title}</div>
      <div>{view&& view.image}</div>
      <div>{view&& view.imageType}</div>
    </ModalBody>

    <ModalFooter>
      <Button colorScheme='blue' mr={3} onClick={onClose}>
        Close
      </Button>
      <Button variant='ghost' onClick={handleRemove}>delete</Button>
    </ModalFooter>
  </ModalContent>
  </Modal>
            
            <Button variant="ghost" colorScheme="blue" onClick={handleRemove}>
              delete recipe
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  )
}
export default FaviouateCard;
