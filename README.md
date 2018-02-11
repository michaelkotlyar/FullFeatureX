# FullFeatureX
A boilerplate, dashboard themed, application with user authentication capabilities. This is really just a side project for myself, but it's completely free for anyone to use.

## Resources
### Frontend
* **[Bootstrap 4](https://getbootstrap.com)** - Layout and base styling
* **[HTML5 Boilerplate](https://html5boilerplate.com)** - Layout metadata and icons setup (Still currently using the favicon and icons from this boilerplate…)

### Backend
* **[PostgreSQL](http://postgresguide.com)** - This app is built for accessing a PostgreSQL database. The module I use to broker this is [Knex.js](https://www.npmjs.com/package/knex). Knex also supports other database management systems such as [MySQL](https://www.mysql.com) and [SQLite3](https://www.sqlite.org).
* **[Knex.js](http://knexjs.org/) + [Objection.js](http://vincit.github.io/objection.js/)** - An ORM module I have recently adopted onto the project.
* **[Passport](https://www.npmjs.com/package/passport)** - This module is used to authenticate and create user sessions when logging in.

## Dependencies
### Production
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [bootstrap](https://www.npmjs.com/package/bootstrap)
- [connect-flash](https://www.npmjs.com/package/connect-flash)
- [cookie-session](https://www.npmjs.com/package/cookie-session)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [faker](https://www.npmjs.com/package/faker)
- [jquery](https://www.npmjs.com/package/jquery)
- [knex](https://www.npmjs.com/package/knex)
- [node-sass-middleware](https://www.npmjs.com/package/node-sass-middleware)
- [objection](https://www.npmjs.com/package/objection)
- [passport](https://www.npmjs.com/package/passport)
- [passport-local](https://www.npmjs.com/package/passport-local)
- [pg](https://www.npmjs.com/package/pg)
- [popper.js](https://www.npmjs.com/package/popper.js)
- [pug](https://www.npmjs.com/package/pug)
- [serve-favicon](https://www.npmjs.com/package/serve-favicon)

### Development
- [chai](https://www.npmjs.com/package/chai)
- [chai-http](https://www.npmjs.com/package/chai-http)
- [git-hooks](https://www.npmjs.com/package/git-hooks)
- [gulp](https://www.npmjs.com/package/gulp)
- [gulp-eslint](https://www.npmjs.com/package/gulp-eslint)
- [gulp-nodemon](https://www.npmjs.com/package/gulp-nodemon)
- [gulp-plumber](https://www.npmjs.com/package/gulp-plumber)
- [eslint](https://www.npmjs.com/package/eslint)
- [eslint-config-standard](https://www.npmjs.com/package/eslint-config-standard)
- [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)
- [eslint-plugin-node](https://www.npmjs.com/package/eslint-plugin-node)
- [eslint-plugin-promise](https://www.npmjs.com/package/eslint-plugin-promise)
- [eslint-plugin-standard](https://www.npmjs.com/package/eslint-plugin-standard)
- [mocha](https://www.npmjs.com/package/mocha)
- [mocha-eslint](https://www.npmjs.com/package/mocha-eslint)
- [nyc](https://www.npmjs.com/package/nyc)
- [run-sequence](https://www.npmjs.com/package/run-sequence)
- [tiny-lr](https://www.npmjs.com/package/tiny-lr)

## To do list
- Create own favicon/icons
- User profile image
- MORE TESTS!

## Getting Started
### Prerequisites
You need a set of CLI tools to run this app. Make sure you have [Node Package Manager (npm)](https://nodejs.org/en/download/) installed first.

* [npm](https://nodejs.org/en/download/)
* [Knex.js](https://www.npmjs.com/package/knex) `npm install -g knex`
* [Gulp](https://www.npmjs.com/package/gulp) `npm install -g gulp`
* [Mocha](https://www.npmjs.com/package/mocha) `npm install -g mocha`
* [PostgreSQL](http://postgresguide.com/setup/install.html) (client & CLI)  
Make sure your database server is running for the installation.

### Installation Instructions
These instructions assume you have installed the [prerequisites](#prerequisites), like using command-line, and you are using PostgreSQL as your DBMS. You can use other databases such as [SQLite3](http://sqlite.org/) and [MySQL](https://www.mysql.com/) according to [Objection.js](https://www.npmjs.com/package/objection) and [Knex.js](https://www.npmjs.com/package/knex).

1. Clone this repository into your desired directory  
	`$ git clone https://github.com/uzimike/FullFeatureX.git`

2. Change the name of `.env-sample` to `.env`. And make any necessary changes to the file variables.

3. Go to application directory  
   `$ cd  directory-to/fullfeaturex`

4. Install the dependencies  
   `$ npm install`

5. Enter the PostgreSQL CLI  
   `$ psql`

6. Create your database  
   `# create database fullfeaturex;`

7. Create your test database  
   `# create database fullfeaturex_test;`

8. Exit the PostgreSQL CLI  
   `# \q`

9. In the fullfeaturex directory, migrate knex  
   `$ knex migrate:latest`

10. Run the knex seed  
  `$ knex seed:run`

11. Run gulp  
   `$ gulp`

## Testing
`npm test`

There are a few tests currently stored in `fullfeaturex/test/*.js`. Have a look at [mocha](https://mochajs.org/) and [chai](http://chaijs.com/) to see how to use this. [eslint](https://www.npmjs.com/package/eslint) is used to check for configurable coding syntax. [nyc](https://www.npmjs.com/package/nyc) is used for testing coverage.

This project uses [git-hooks](https://www.npmjs.com/package/git-hooks) and tests the project at every commit (only if there is any `*.js` files in the commit).

## Notes
### Preset accounts
In the development environment, there are three accessible users accounts in the user database.

**Michael**

    username: Michael
    password: michael

**Borat**

    username: Borat
    password: borat

**Admin**

    username: Admin
    password: admin

The rest that you see in the `/users` page are [faker](https://www.npmjs.com/package/faker) accounts generated when seeding data into the database. The passwords are practically unknown.

## Contribution
I personally intend for this project to be my own work. However, if there are any improvements you'd like to suggest, you're more than welcome to contact me about it.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
