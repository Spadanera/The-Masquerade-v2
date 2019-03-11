"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var host = "mongodb://172.17.0.2:27017";
var dbName = "the-masquerade";

var MongoClient = require('mongodb').MongoClient;

var DbManager =
/*#__PURE__*/
function () {
  function DbManager(_host) {
    _classCallCheck(this, DbManager);

    this.host = _host ? _host : host;
    this.client = new MongoClient(this.host, {
      useNewUrlParser: true
    });
  }

  _createClass(DbManager, [{
    key: "connect",
    value: function connect(_dbName) {
      var _this = this;

      this.dbName = _dbName ? _dbName : dbName;
      var self = this;
      return new Promise(function (resolve, reject) {
        self.client.connect(function (err, db) {
          if (err) throw reject(err);
          _this.db = db;
          _this.dbo = db.db(self.dbName);
          resolve();
        });
      });
    }
  }, {
    key: "closeConnection",
    value: function closeConnection() {
      if (this.db) {
        this.db.close();
      }
    }
  }, {
    key: "find",
    value: function find(collection, query) {
      var self = this;

      if (!this.dbo) {
        throw new Error("You have to connect database");
      }

      return new Promise(function (resolve, reject) {
        self.dbo.collection(collection).find(query).toArray(function (err, result) {
          if (err) throw reject(err);
          resolve(result);
        });
      });
    }
  }, {
    key: "findOne",
    value: function findOne(collection, query) {
      var self = this;

      if (!this.dbo) {
        throw new Error("You have to connect database");
      }

      return new Promise(function (resolve, reject) {
        self.dbo.collection(collection).findOne(query, function (err, result) {
          if (err) throw reject(err);
          resolve(result);
        });
      });
    }
  }, {
    key: "insertOne",
    value: function insertOne(collection, document) {
      var self = this;

      if (!this.dbo) {
        throw new Error("You have to connect database");
      }

      return new Promise(function (resolve, reject) {
        self.dbo.collection(collection).insertOne(document, function (err, result) {
          if (err) throw reject(err);
          resolve(result);
        });
      });
    }
  }, {
    key: "updateOne",
    value: function updateOne(collection, query, document) {
      var self = this;

      if (!this.dbo) {
        throw new Error("You have to connect database");
      }

      return new Promise(function (resolve, reject) {
        self.dbo.collection(collection).updateOne(query, {
          $set: document
        }, function (err, result) {
          if (err) throw reject(err);
          resolve(result);
        });
      });
    }
  }, {
    key: "deleteOne",
    value: function deleteOne(collection, query) {
      var self = this;

      if (!this.dbo) {
        throw new Error("You have to connect database");
      }

      return new Promise(function (resolve, reject) {
        self.dbo.collection(collection).deleteOne(query, function (err, result) {
          if (err) throw reject(err);
          resolve(result);
        });
      });
    }
  }, {
    key: "connectAndFind",
    value: function () {
      var _connectAndFind = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(collection, query, _dbName) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.connect(_dbName);

              case 2:
                _context.prev = 2;
                _context.next = 5;
                return this.find(collection, query);

              case 5:
                result = _context.sent;

              case 6:
                _context.prev = 6;
                this.closeConnection();
                return _context.finish(6);

              case 9:
                return _context.abrupt("return", result);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2,, 6, 9]]);
      }));

      function connectAndFind(_x, _x2, _x3) {
        return _connectAndFind.apply(this, arguments);
      }

      return connectAndFind;
    }()
  }, {
    key: "connectAndFindOne",
    value: function () {
      var _connectAndFindOne = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(collection, query, _dbName) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.connect(_dbName);

              case 2:
                _context2.prev = 2;
                _context2.next = 5;
                return this.findOne(collection, query);

              case 5:
                result = _context2.sent;

              case 6:
                _context2.prev = 6;
                this.closeConnection();
                return _context2.finish(6);

              case 9:
                return _context2.abrupt("return", result);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2,, 6, 9]]);
      }));

      function connectAndFindOne(_x4, _x5, _x6) {
        return _connectAndFindOne.apply(this, arguments);
      }

      return connectAndFindOne;
    }()
  }, {
    key: "connectAndInsertOne",
    value: function () {
      var _connectAndInsertOne = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(collection, document, _dbName) {
        var result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.connect(_dbName);

              case 2:
                _context3.prev = 2;
                _context3.next = 5;
                return this.insertOne(collection, document);

              case 5:
                result = _context3.sent;

              case 6:
                _context3.prev = 6;
                this.closeConnection();
                return _context3.finish(6);

              case 9:
                return _context3.abrupt("return", result);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2,, 6, 9]]);
      }));

      function connectAndInsertOne(_x7, _x8, _x9) {
        return _connectAndInsertOne.apply(this, arguments);
      }

      return connectAndInsertOne;
    }()
  }, {
    key: "connectAndUpdateOne",
    value: function () {
      var _connectAndUpdateOne = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(collection, query, document, _dbName) {
        var result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.connect(_dbName);

              case 2:
                _context4.prev = 2;
                _context4.next = 5;
                return this.updateOne(collection, query, document);

              case 5:
                result = _context4.sent;

              case 6:
                _context4.prev = 6;
                this.closeConnection();
                return _context4.finish(6);

              case 9:
                return _context4.abrupt("return", result);

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[2,, 6, 9]]);
      }));

      function connectAndUpdateOne(_x10, _x11, _x12, _x13) {
        return _connectAndUpdateOne.apply(this, arguments);
      }

      return connectAndUpdateOne;
    }()
  }, {
    key: "connectAndDeleteOne",
    value: function () {
      var _connectAndDeleteOne = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(collection, query, _dbName) {
        var result;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.connect(_dbName);

              case 2:
                _context5.prev = 2;
                _context5.next = 5;
                return this.deleteOne(collection, query);

              case 5:
                result = _context5.sent;

              case 6:
                _context5.prev = 6;
                this.closeConnection();
                return _context5.finish(6);

              case 9:
                return _context5.abrupt("return", result);

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2,, 6, 9]]);
      }));

      function connectAndDeleteOne(_x14, _x15, _x16) {
        return _connectAndDeleteOne.apply(this, arguments);
      }

      return connectAndDeleteOne;
    }()
  }]);

  return DbManager;
}();

module.exports = DbManager;