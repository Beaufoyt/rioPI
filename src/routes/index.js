import { Router } from 'express';
import Recipes from './recipes';
import Inventory from './inventory';

let router = Router();

Recipes(router);
Inventory(router);

module.exports = router;
