let db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.tbllocations.findAll({}).then(function(locationsData) {
      db.Solar.findAll({}).then(function(SolarData) {
        res.render("index", {
          locations: locationsData,
          solar: SolarData
        });
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
