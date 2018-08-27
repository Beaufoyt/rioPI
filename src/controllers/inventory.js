import {
    inventory as Inventory,
    retailers as Retailers,
    categories as Category,
} from '../models';

const fetchInventory = async (req, res, next) => {
    let { categoryId } = req.query;

    const options = {
        where: {},
        include: [
            {
                model: Retailers,
            },
            {
                model: Category,
            },
        ],
    };

    if (categoryId) {
        categoryId = categoryId === 'null' ? null : categoryId;
        options.where.categoryId = categoryId;
    }

    try {
        const inventory = await Inventory.findAll(options);

        res.send(inventory);
    } catch (err) {
        next(err);
    }
};

const toggleStock = async (req, res, next) => {
    let { inventoryId } = req.params;

    try {
        const inventoryItem = await Inventory.findById(inventoryId);
        const newStock = !inventoryItem.inStock;

        await Inventory.update({ inStock: newStock }, { where: { id: inventoryId }});

        res.send(Object.assign({}, inventoryItem.dataValues, { inStock: newStock }));
    } catch (err) {
        next(err);
    }
};

module.exports = {
    fetchInventory,
    toggleStock,
};
