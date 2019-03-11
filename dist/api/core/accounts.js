"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var uuidv4 = require('uuid/v4');

var DbManager = require("../db/db-manager");

var Account =
/*#__PURE__*/
function () {
  function Account(account) {
    _classCallCheck(this, Account);

    this.id = account.id ? account.id : uuidv4();
    this.email = account.email;
    this.firstName = account.firstName;
    this.lastName = account.lastName;
    this.role = account.role;
  }

  _createClass(Account, [{
    key: "save",
    value: function save() {
      var dbManager = new DbManager();
      return dbManager.connectAndInsertOne("Accounts", this);
    }
  }, {
    key: "update",
    value: function update() {
      var dbManager = new DbManager();
      return dbManager.connectAndUpdateOne("Accounts", {
        id: this.id
      }, this);
    }
  }, {
    key: "delete",
    value: function _delete() {
      var dbManager = new DbManager();
      return dbManager.connectAndDeleteOne("Accounts", {
        id: this.id
      });
    }
  }]);

  return Account;
}();

module.exports = Account;