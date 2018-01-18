var User = require('../models/users');

module.exports = {
  getAll: () => {
    return User.query();
  },

  create: (req) => {
    return User
      .query()
      .insert({
        username: req.body.username,
        hash: req.body.password,
        email: req.body.email
      });
  },

  edit: (req, res, next) => {
    var user = {}
    if (req.username !== req.body.username && req.username !== '') {
      user.username = req.body.username;
    }
    if (req.email !== req.body.email && req.email !== '') {
      user.email = req.body.email;
    }
    if (req.image) {
      user.image = req.body.image;
    }
    return User
      .query()
      .where('id', req.user.id)
      .update(user);
  }
}