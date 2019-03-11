"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uuidv4 = require('uuid/v4');

var Story = function Story(name) {
  _classCallCheck(this, Story);

  this.id = uuidv4();
  this.name = name;
};

module.exports = Story;