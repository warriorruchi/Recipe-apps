// routes/recipes.js

const express = require("express")
const router = express.Router()
const spoonacular = require("../services/spoonacular.js")
const authenticateToken = require("../middleware/auth.js")
const {
  getRecipeById,
  createRecipe,
  getAllRecipes,
  deleteRecipe,
} = require("../Controller/recipeController.js")

// Search recipes
router.get("/search", authenticateToken, async (req, res) => {
  try {
    const { query } = req.query
    const response = await spoonacular.get("/complexSearch", {
      params: { query, apiKey: "340a4f1903fa48c690292ff2432f2d1a" },
    })
    const recipes = response.data.results
    res.json(recipes)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal Server Error" })
  }
})

router.get("/recipebyid/:id", authenticateToken, getRecipeById)
router.post("/recipebyid", authenticateToken, createRecipe)
router.get("/getAll", authenticateToken, getAllRecipes)
router.delete("/deletebyid/:id", authenticateToken, deleteRecipe)

module.exports = router
