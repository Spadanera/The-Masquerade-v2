"use strict";

var uuidv4 = require('uuid/v4');

var express = require('express');

var router = express.Router();
var stories = [{
  id: "10ba038e-48da-487b-96e8-8d3b99b6d18a",
  name: "Prima storia"
}, {
  id: "1b671a64-40d5-491e-99b0-da01ff1f3341",
  name: "Seconda storia"
}]; // Get all stories

router.get("/", function (req, res) {
  res.json(stories);
}); // Get single story

router.get("/:id", function (req, res) {
  res.json(stories.find(function (s) {
    return s.id === req.params.id;
  }));
}); // Create new story

router.post("/", function (req, res) {
  var newStory = {
    id: uuidv4(),
    name: req.body.name
  };
  stories.push(newStory);
  res.json(newStory);
}); // Update Story

router.put("/:id", function (req, res) {
  var story = stories.find(function (s) {
    return s.id === req.params.id;
  });
  story.name = req.body.name ? req.body.name : story.name;
  res.json(story);
});
module.exports = router;