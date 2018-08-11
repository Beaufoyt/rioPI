module.exports = (sequelize, DataType) => {
    const recipes = sequelize.define('recipes', {
        id: {
            type: DataType.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataType.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        description: {
            type: DataType.STRING(1000),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    }, {
        classMethods: {
            // associate: (models) => {
                // Tasks.belongsTo(models.Users);
            // },
        },
    });
    return recipes;
};
