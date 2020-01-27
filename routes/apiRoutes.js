let db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/location", function(req, res) {
    db.tbllocations.findAll({}).then(function(dbLocation) {
      res.json(dbLocation);
    });
  });

  app.get("/api/solar", function(req, res) {
    db.Solar.findAll({}).then(function(dbSolar) {
      res.json(dbSolar);
    });
  });
};
