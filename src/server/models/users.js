var Model = require('objection').Model;
var bcrypt = require('bcryptjs');

class User extends Model {
  $beforeInsert(context) {
    var maybePromise = super.$beforeInsert(context);
    return Promise.resolve(maybePromise).then(() => {
      return this.generateHash();
    });
  }

  $beforeUpdate(opt, context) {
    var maybePromise = super.$beforeUpdate(context);
    return Promise.resolve(maybePromise).then(() => {
      return this.generateHash();
    });
  }

  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'email'],
      properties: {
        id: {type: 'integer'},
        username: {type: 'string'},
        hash: {type: 'string'},
        email: {type: 'string'},
        type: {type: 'integer'}
      }
    };
  }

  verifyPassword(password, callback) {
    return bcrypt.compare(password, this.hash, callback);
  }

  generateHash() {
    var password = this.hash;

    if (password) {
      if (this.constructor.isBcryptHash(password)) {
        throw new Error('bcrypt tried to hash another bcrypt hash');
      }
      this.hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      return;
    }

    throw new Error('password must not be empty');
  }

  static isBcryptHash(str) {
    var protocol = str.split('$');

    return protocol.length === 4 &&
    protocol[0] === '' &&
    ['2a', '2b', '2y'].indexOf(protocol[1]) > -1 &&
    /^\d+$/.test(protocol[2]) &&
    protocol[3].length === 53;
  }

}

module.exports = User;
