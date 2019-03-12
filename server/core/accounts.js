"use strict";
const uuidv4 = require('uuid/v4');
const DbManager = require("../db/db-manager");

class Account {
    constructor(account) {
        this.id = account.id ? account.id : uuidv4();
        this.email = account.email;
        this.firstName = account.firstName;
        this.lastName = account.lastName;
        this.role = account.role;
    }

    save() {
        let dbManager = new DbManager();
        return dbManager.connectAndInsertOne("Accounts", this);
    }

    update() {
        let dbManager = new DbManager();
        return dbManager.connectAndUpdateOne("Accounts", { id: this.id }, this);
    }

    delete() {
        let dbManager = new DbManager();
        return dbManager.connectAndDeleteOne("Accounts", { id: this.id });
    }
}

module.exports = Account;