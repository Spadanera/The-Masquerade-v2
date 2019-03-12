"use strict";
import uuidv4 from 'uuid/v4';

class Story {
    constructor(name) {
        this.id = uuidv4();
        this.name = name;
    }
}

export default Story;