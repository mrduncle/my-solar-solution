const db = require("../models");
const sequelize = require("sequelize");
// let userData = require("../public/js/index");

module.exports = function (app) {
  // Get all locations
  app.get("/api/location", function (req, res) {
    db.tbllocations.findAll({}).then(function (dbLocation) {
      res.json(dbLocation);
    });
  });
  // Get all solar
  app.get("/api/solar", function (req, res) {
    db.Solar.findAll({}).then(function (dbSolar) {
      res.json(dbSolar);
    });
  });
  // Get all radiation
  app.get("/api/radiation", function (req, res) {
    db.tblradiations.findAll({}).then(function (dbRadiation) {
      res.json(dbRadiation);
    });
  });
  // Call stored procedure in DB
  app.post("/api/userentry", function (req, res) {
    db.sequelize
      .query("Call calc_savings(:param1, :param2, @dolls_yr);", {
        replacements: {
          param1: req.body.userLocation,
          param2: req.body.userArea
        },
        type: sequelize.QueryTypes.SELECT
      })
      .spread(function (results, metadata) {
        console.log(results);
        res.json(results);
      });
  });
};
