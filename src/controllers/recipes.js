import {
    recipes as Recipes,
    ingredients as Ingredients,
    inventory as Inventory,
    retailers as Retailers,
    categories as Category,
} from '../models';

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
                                {
                                    model: Category,
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
