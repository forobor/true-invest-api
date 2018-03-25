const noteRoutes = require('./companies_routes');
module.exports = function(app, db) {    
  noteRoutes(app, db);
};