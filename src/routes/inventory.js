import { fetchInventory, toggleStock } from '../controllers/inventory.js';

module.exports = (router) => {
    router.get('/inventory', fetchInventory);
    router.put('/inventory/toggle-stock/:inventoryId', toggleStock);
};
