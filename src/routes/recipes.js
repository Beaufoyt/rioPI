import RecipesController from '../controllers/recipes.js';

module.exports = (router) => {
    router.get('/recipes', RecipesController.fetchRecipes);
};
