import { Op, fn, col, where } from 'sequelize';
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

const searchInventory = async (req, res, next) => {
    let { q: searchString, lang: language } = req.query;
    const { categoryId } = req.query;

    if (!language && !searchString && !categoryId) {
        return res.status(400).send('You must provide either a search term, language or categoryId');
    }

    if (language && !searchString) {
        return res.status(400).send('You must provide a search term with lang');
    }

    const options = {
        where: {},
    };

    if (categoryId) {
        options.where.categoryId = categoryId;
    }

    try {
        if (searchString) {
            searchString = searchString.toLowerCase();
            language = language ? language.charAt(0).toUpperCase() + language.slice(1) : 'En';
            const searchMatch = { [Op.like]: `%${searchString}%` };

            options.where.$or = [];
            options.where.$or.push(where(fn('lower', col(`name${language}`)), searchMatch));
            options.where.$or.push(where(fn('lower', col('scientificName')), searchMatch));

            searchString = searchString.replace(' ', '').replace('-', '');

            if ('instock'.includes(searchString)) {
                options.where.$or.push({inStock: 1});
            } else if ('outofstock'.includes(searchString)) {
                options.where.$or.push({inStock: 0});
            }
        }

        const inventoryItems = await Inventory.findAll(options);

        res.send(inventoryItems);
    } catch (err) {
        next(err);
    }
};

const toggleStock = async (req, res, next) => {
    const { inventoryId } = req.params;

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
    searchInventory,
};
