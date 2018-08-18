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
        container: { type: DataType.ENUM('dropper-bottle','plastic-bag','glass-jar') },
        scientificName: { type: DataType.STRING(255) },
        description: { type: DataType.STRING(512) },
        inStock: { type: DataType.TINYINT(1) },
    }, {
        freezeTableName: true,
        classMethods: {
            associate: (models) => {
                inventory.belongsTo(models.retailers, { targetKey: 'id', foreignKey: 'retailerId' });
            },
        },
    });
    return inventory;
};
