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


function ChildCard({
  title,
  image,
  imageType,
  id,
  setUpdate,
}) {
  const [expanded, setExpanded] = useState(false)
  const [view, setView] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  let url=process.env.REACT_APP_URL
  function handleFavourite() {
    let token = JSON.parse(localStorage.getItem("token")) || ""
    if (token !== "") {
      axios
        .post(
          `${url}/recipes/recipebyid`,
          { title, image, imageType, id },
          { headers: { Authorization: token } }
        )
        .then((res) => {
          setUpdate((prev) => !prev)
          alert("added to favourites")
        })
    } else {
      alert("not authorized")
    }
  }
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
            {/* <Button variant="solid" colorScheme="blue" onClick={handleView}>
              View
            </Button> */}
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
            <Button variant='ghost' onClick={handleFavourite}>Save</Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
            <Button
              variant="ghost"
              colorScheme="blue"
              onClick={handleFavourite}
            >
              Save recipe
            </Button>
          </ButtonGroup>
        </CardFooter>

        {/* {expanded && (
          <div>
            <h2>Additional Information</h2>
            <h3>Ingredients:</h3>
            <ul>
              {Ingrediemts &&
                Ingrediemts.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h3>Instructions:</h3>
            <ol>
              {Instruction &&
                Instruction.map((step, index) => <li key={index}>{step}</li>)}
            </ol>
            <h3>Nutritional Information:</h3>
            <ul>
              {Nut && (
                <>
                  <li>Calories: {Nut.calories}</li>
                  <li>Protein: {Nut.protein}g</li>
                  <li>Carbohydrates: {Nut.carbohydrates}g</li>
                  <li>Fat: {Nut.fat}g</li>
                </>
              )}
            </ul>
          </div>
              )} */}
      </Card>
    </>
  )
}
export default ChildCard;
