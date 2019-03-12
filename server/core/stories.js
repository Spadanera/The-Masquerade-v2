"use strict";
const uuidv4 = require('uuid/v4');

class Story {
    constructor(name) {
        this.id = uuidv4();
        this.name = name;
    }
}

module.exports = Story;