const mongoose = require('mongoose');

const MONGODB_HOST = 'localhost';
const MONGODB_DB_NAME = 'demo-express';
const MONGODB_CONNECTION_STRING = `mongodb://${MONGODB_HOST}/${MONGODB_DB_NAME}`;

class Db {
  static get instance() {
    if (!this._instance) {
      mongoose.connect(MONGODB_CONNECTION_STRING, { useNewUrlParser: true }, () => {        
        console.log(`Connected to MongoDB Database hosted at ${MONGODB_HOST}`);
      });
      this._instance = mongoose;
    }

    return this._instance;
  }
}

module.exports = Db.instance;