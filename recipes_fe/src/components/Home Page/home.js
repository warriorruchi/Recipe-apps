import React, { useState,useEffect } from "react"
import "./home.css"
import ChildCard from "../Card/card"
import { Flex, Spacer } from "@chakra-ui/react"
import axios from "axios"
// please send it

function Home({setUpdate}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [data, setData] = useState([])
  // const [searchResults, setSearchResults] = useState([]);
  let url = process.env.REACT_APP_URL
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token")) || ""
    if (token !== "") {
      axios
        .get(`${url}/recipes/search?query=${searchQuery}`, {
          headers: { Authorization: `${token}` },
        })
        .then((res) => {
          setData(res.data)
          setUpdate((prev) => !prev)
        })
    }
  }, [searchQuery])
  //   const data = value?.recipes || [] // Ensure data is defined or use an empty array

  //   const filteredData = data.filter((recipe) => {
  //     const title = recipe.title || "" // Use an empty string if title is undefined
  //     const description = recipe.description || "" // Use an empty string if description is undefined

  //     return (
  //       title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       description.toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  //   })

  return (
    <>
      <div className="search-container">
        <Flex>
          <div>
            <input
              type="text"
              placeholder="Search the Recipe"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <Spacer />
          <div className="filter-container">
            <select className="filter-select">
              <option value="title">Title</option>
              <option value="description">Description</option>
            </select>
          </div>
        </Flex>
      </div>

      <div className="card-container">
        {data.map((e, i) => {
          return (
            <ChildCard
              setUpdate={setUpdate}
              key={e.id}
              Title={e.title}
              img={e.image}
              imgType={e.imageType}
            />
          )
        })}
      </div>
    </>
  )
}

export default Home
