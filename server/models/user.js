var Model = require('objection').Model;
var bcrypt = require('bcryptjs');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'email'],
      properties: {
        id: { type: 'integer' },
        username: { type: 'string' },
        hash: { type: 'string' },
        email: { type: 'string' },
        type: { type: 'integer' }
      }
    };
  }

  get details() {
    return {
      username: this.username,
      email: this.email
    }
  }

  set password(password) {
    this.hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  };

  verifyPassword(password, callback) {
    bcrypt.compare(password, this.hash, callback);
  };

}

module.exports = User;
