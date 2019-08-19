"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _expressGraphql = _interopRequireDefault(require("express-graphql"));

var _graphql = require("graphql");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schema = new _graphql.GraphQLSchema({});

var _default = (0, _expressGraphql.default)({
  schema: schema,
  graphiql: true
});

exports.default = _default;