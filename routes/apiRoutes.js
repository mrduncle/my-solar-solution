let db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/location", function (req, res) {
    db.Location.findAll({}).then(function (dbLocation) {
      res.json(dbLocation);
    });
  });

  app.get("/api/solar", function (req, res) {
    db.Solar.findAll({}).then(function (dbSolar) {
      res.json(dbSolar);
    });
  });
  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
