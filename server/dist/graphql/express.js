"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _lodash = require("lodash");

var _expressGraphql = _interopRequireDefault(require("express-graphql"));

var _graphqlTools = require("graphql-tools");

var _query = require("./resolvers/query");

var _userResolvers = require("./resolvers/user-resolvers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schema = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: _fs.default.readFileSync(_path.default.join(__dirname, "api.graphql"), 'utf-8'),
  resolvers: (0, _lodash.merge)(_query.resolvers, _userResolvers.resolvers)
});

var _default = (0, _expressGraphql.default)({
  schema: schema,
  graphiql: true
});

exports.default = _default;