module.exports = (sequelize, DataType) => {
    const retailers = sequelize.define('retailers', {
        id: {
            type: DataType.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
        },
        name: { type: DataType.STRING(255) },
        url: { type: DataType.STRING(255) },
    }, {
        classMethods: {
            // associate: (models) => {
            // },
        },
    });
    return retailers;
};
