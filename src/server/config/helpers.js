var User = require('../models/users');
var extend = require('util')._extend;

module.exports = {
  renderObject: function(req, extra = {}) {
    var renderObject = {};
    if (req.user) {
      renderObject.loggedIn = true;
      renderObject.username = req.user.username;
      renderObject.email = req.user.email;
      if (req.user.image) { renderObject.image = req.user.image; }
    }
    extend(renderObject, extra);
    return renderObject;
  },
  loggedIn: function(req, res, next) {
    if (req.user) {
      next();
    }
    else {
      res.redirect('/users/login');
    }
  },
  adminAccess: function(req, res, next) {
    if (req.user && req.user.user_type === 1) {
      next();
    }
    else {
      res.redirect('/users/login');
    }
  }
};
