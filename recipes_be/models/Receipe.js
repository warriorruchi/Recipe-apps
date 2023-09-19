const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  // imageType: {
  //   type: String,
  //   required: true,
  // },
  id:{
    type: String,
    required: true,
  },
  userId:{
    type:String,
    required:true
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
