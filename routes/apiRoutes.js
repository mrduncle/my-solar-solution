const db = require("../models");
const sequelize = require("sequelize");
// let userData = require("../public/js/index");

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

  app.get("/api/radiation", function(req, res) {
    db.tblradiations.findAll({}).then(function(dbRadiation) {
      res.json(dbRadiation);
    });
  });

  app.post("/api/userentry", function(req, res) {
    db.sequelize
      .query("Call calc_savings(:param1, :param2, @dolls_yr);", {
        replacements: {
          param1: req.body.userLocation,
          param2: req.body.userArea
        },
        type: sequelize.QueryTypes.SELECT
      })
      .spread(function(results, metadata) {
        console.log(results);
        res.json(results);
      });
  });
};
