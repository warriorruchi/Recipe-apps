// services/spoonacular.js

const axios = require('axios');

// const apiKey = '340a4f1903fa48c690292ff2432f2d1a';
const apiKey = 'c47b878a343f4f84b21f891b3c6d6195';

const spoonacular = axios.create({
  baseURL: 'https://api.spoonacular.com/recipes',
});

module.exports = spoonacular;
