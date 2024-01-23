const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller');

router.get('/', Controller.homepage);
/*
router.get('/', Controller.homepage);
router.get('/recipe/:id', Controller.exploreRecipe );
router.get('/categories', Controller.exploreCategories);
router.get('/categories/:id', Controller.exploreCategoriesById);
router.post('/search', Controller.searchRecipe);
router.get('/explore-latest', Controller.exploreLatest);
router.get('/explore-random', Controller.exploreRandom);
router.get('/submit-recipe', Controller.submitRecipe);
router.post('/submit-recipe', Controller.submitRecipeOnPost);
*/

 
module.exports = router;


