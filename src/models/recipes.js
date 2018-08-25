module.exports = (sequelize, DataType) => {
    const recipes = sequelize.define('recipes', {
        id: {
            type: DataType.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
        },
        titleEn: {
            type: DataType.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        titleFr: {
            type: DataType.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        descriptionEn: {
            type: DataType.STRING(1000),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        descriptionFr: {
            type: DataType.STRING(1000),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    }, {
        classMethods: {
            associate: (models) => {
                recipes.hasMany(models.ingredients, { sourceKey: 'id', foreignKey: 'recipeId' });
            },
        },
    });

    return recipes;
};
