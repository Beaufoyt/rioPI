module.exports = (sequelize, DataType) => {
    const categories = sequelize.define('categories', {
        id: {
            type: DataType.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
        },
        nameEn: { type: DataType.STRING(255) },
        nameFr: { type: DataType.STRING(255) },
    });

    return categories;
};
