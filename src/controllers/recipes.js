import { models } from '../db.js';

const Recipes = models.recipes;

module.exports = {
    fetchRecipes: (req, res) => {
        Recipes.findAll().then(recipes => {
            res.send(recipes);
        });
    },
};
