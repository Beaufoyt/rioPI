import { fetchInventory } from '../controllers/inventory.js';

module.exports = (router) => {
    router.get('/inventory', fetchInventory);
};
