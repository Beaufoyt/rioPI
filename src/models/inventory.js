module.exports = (sequelize, DataType) => {
    const inventory = sequelize.define('inventory', {
        id: {
            type: DataType.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
        },
        categoryId: { type: DataType.INTEGER(11) },
        retailerId: { type: DataType.INTEGER(11) },
        nameEn: { type: DataType.STRING(255) },
        nameFr: { type: DataType.STRING(255) },
        scientificName: { type: DataType.STRING(255) },
        descriptionEn: { type: DataType.STRING(1000) },
        descriptionFr: { type: DataType.STRING(1000) },
        inStock: { type: DataType.TINYINT(1) },
    }, {
        freezeTableName: true,
        classMethods: {
            associate: (models) => {
                inventory.belongsTo(models.retailers, { targetKey: 'id', foreignKey: 'retailerId' });
                inventory.belongsTo(models.categories, { targetKey: 'id', foreignKey: 'categoryId' });
            },
        },
    });

    return inventory;
};
