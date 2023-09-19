const Recipe = require("../models/Receipe.js");
const axios=require("axios")

// Controller to create a new recipe
exports.createRecipe = async (req, res) => {
    try {
        const userId=req.user.id       
        const { title, image, imageType, id} = req.body;
        const recipe = new Recipe({ title, image, imageType,id,userId });
        await recipe.save();
        res.status(201).json(recipe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller to retrieve all recipes
exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({userId:req.user.id});
        res.status(200).json(recipes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller to retrieve a specific recipe by ID

exports.getRecipeById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=c47b878a343f4f84b21f891b3c6d6195`)
        const recipe=await response.data
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json(recipe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// Controller to delete a recipe by ID
exports.deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findOneAndDelete({id,userId:req.user.id});
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};