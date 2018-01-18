var User = require('../models/users');

module.exports = {
  getAll: () => {
    return User.query();
  },

  create: (req) => {
    return User
      .query()
      .insert(req.body);
  },

  edit: (req, res, next) => {
    var changeUsername = false, changeEmail = false, changeImage = false;
    var user = {
      id: req.user.user_id
    };
    if (req.username !== req.body.username && req.username !== '') {
      changeUsername = true;
      user.user_name = req.body.username;
    }
    if (req.email !== req.body.email && req.email !== '') {
      changeEmail = true;
      user.user_email = req.body.email;
    }
    if (req.image) {
      changeImage = true;
      user.user_image = req.body.image;
    }
    return User.modifyUser(user);
  }
}
