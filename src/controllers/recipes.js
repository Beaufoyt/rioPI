import { recipes, ingredients, inventory, retailers } from '../models';

const Recipes = recipes;
const Ingredients = ingredients;
const Inventory = inventory;
const Retailers = retailers;

module.exports = {
    fetchRecipes: (req, res) => {
        const options = {
            include: [
                {
                    model: Ingredients,
                    include: [
                        {
                            model: Inventory,
                            include: [
                                {
                                    model: Retailers,
                                },
                            ],
                        },
                    ],
                },
            ],
        };

        Recipes.findAll(options).then(recipes => {
            res.send(recipes);
        });
    },
};
