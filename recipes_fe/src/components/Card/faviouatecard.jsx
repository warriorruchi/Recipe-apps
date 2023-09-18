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

function FaviouateCard({
  Title,
  img,
  imgType,
  setUpdate,
}) {
  const [expanded, setExpanded] = useState(false)
  const [view, setView] = useState([])
  function handleFavourite() {
    let token = JSON.parse(localStorage.getItem("token")) || ""
    if (token !== "") {
      axios
        .post(
          `${url}/recipes/recipebyid`,
          { headers: { Authorization: token } },
          { title, image, imageType, id }
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
      axios
        .get(`${url}/recipes/recipebyid/${id}`, {
          headers: { Authorization: token },
        })
        .then((res) => {
          setView(res.data)
          setUpdate((prev) => !prev)
        })
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
            src={img}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />

          <Stack mt="6" spacing="3">
            <Heading size="md">{Title}</Heading>
            <Text>{imgType}</Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue" onClick={handleView}>
              View
            </Button>
            
            <Button variant="ghost" colorScheme="blue" onClick={handleRemove}>
              delete recipe
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
export default FaviouateCard;
