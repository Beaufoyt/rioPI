import { fetchInventory, toggleStock, searchInventory } from '../controllers/inventory.js';

module.exports = (router) => {
    router.get('/inventory', fetchInventory);
    router.get('/inventory/search', searchInventory);
    router.put('/inventory/toggle-stock/:inventoryId', toggleStock);
};
