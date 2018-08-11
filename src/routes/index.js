import { Router } from 'express';
import Recipes from './recipes';

let router = Router();

Recipes(router);

module.exports = router;
