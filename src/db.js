import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

import config from './config.js';

const { host, user, password, database } = config.db;
let db = null;

if (!db) {
    const sequelize = new Sequelize(database, user, password, {
        host,
        maxConcurrentQueries: 100,
        dialect: 'mysql',
        pool: { maxConnections: 5, maxIdleTime: 30},
        language: 'en',
        operatorsAliases: false,
    });

    db = {
        sequelize,
        Sequelize,
        models: {},
    };

    console.log('Connected to db!');

    const dir = path.join(__dirname, 'models');
    fs.readdirSync(dir).forEach(file => {
        const modelDir = path.join(dir, file);
        if (!modelDir.includes('index.js')) {
            const model = db.sequelize.import(modelDir);
            db.models[model.name] = model;
        }
    });
    Object.keys(db.models).forEach(key => {
        const { classMethods } = db.models[key].options;

        if (classMethods.hasOwnProperty('associate')) {
            classMethods.associate(db.models);
        }
    });

    console.log('Loaded models!');
}

module.exports = db;
