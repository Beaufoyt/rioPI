import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

import config from './config.js';

const { host, user, password, database } = config.db;
let db = null;

if (!db) {
    const sequelize = new Sequelize(
          database,
          user,
          password,
        {
            host,
            maxConcurrentQueries: 100,
            dialect: 'mysql',
            pool: { maxConnections: 5, maxIdleTime: 30},
            language: 'en',
            operatorsAliases: false,
        }
);
    db = {
        sequelize,
        Sequelize,
        models: {},
    };
    const dir = path.join(__dirname, 'models');
    fs.readdirSync(dir).forEach(file => {
        const modelDir = path.join(dir, file);
        const model = sequelize.import(modelDir);
        db.models[model.name] = model;
    });
    // Object.keys(db.models).forEach(key => {
    //     db.models[key].associate(db.models);
    // });
}

module.exports = db;
