module.exports = (sequelize, DataType) => {
    const ingredients = sequelize.define('ingredients', {
        id: {
            type: DataType.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
        },
        recipeId: {
            type: DataType.INTEGER(11),
            allowNull: false,
        },
        inventoryId: {
            type: DataType.INTEGER(11),
            allowNull: false,
        },
    }, {
        classMethods: {
            associate: (models) => {
                ingredients.belongsTo(models.recipes);
                ingredients.belongsTo(models.inventory, { targetKey: 'id', foreignKey: 'inventoryId' });
            },
        },
    });
    return ingredients;
};
