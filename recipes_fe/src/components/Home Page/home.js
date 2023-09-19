import React, { useState, useEffect } from "react"
import "./home.css"
import ChildCard from "../Card/card"
import { Flex, Spacer } from "@chakra-ui/react"
import axios from "axios"


function Home({ setUpdate }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [data, setData] = useState([])

  let url = process.env.REACT_APP_URL;


  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token")) || "";
    if (token !== "") {
      axios
        .get(`${url}/recipes/search?query=${searchQuery}`, {
          headers: { Authorization: `${token}` },
        })
        .then((res) => {
          console.log(res.data)
          setData(res.data)
          setUpdate(prev => !prev)
        })
    }
  }, [searchQuery])


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

        </Flex>
      </div>

      <div className="card-container">
        {data.map((e, i) => {
          return (
            <ChildCard
              setUpdate={setUpdate}
              key={e.id}
              id={e.id}
              title={e.title}
              image={e.image}
            />
          )
        })}
      </div>
    </>
  )
}

export default Home;
