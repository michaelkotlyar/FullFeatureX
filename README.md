# FullFeatureX
This is just another NodeJS Application that acts as a starter template. However, **I wouldn't officially consider it a starter template**. It still has many bugs and blank areas in it. And I have many more features I want to add to it. But since it's publicly available, I may as well promote it as such.

This project is mostly made for my personal use - to learn and condition myself for NodeJS development. **I have no clue if anyone will find this useful**. If you happen to want to use this, then by all means use it! But **be warned**. It's still a work in progress and may be a bit confusing to configure, for I have not put in much thought into the whole structure of the app.

## Features
### *Current* feature list
- Database connection
- User authentication
- Responsive layout
- Unit testing
- User profile editing

### *Future* feature list
- User authentication from other sources (e.g. Facebook, Google+)
- User media storage
- Things I haven't thought of yet

## Resources
Mentionable resources that I configure throughout the project

### Frontend
* **[Bootstrap 4](https://getbootstrap.com)** - Layout and base styling
* **[HTML5 Boilerplate](https://html5boilerplate.com)** - Layout metadata and icons setup (Still currently using the favicon and icons from this boilerplate…)

### Backend
* **[PostgreSQL](http://postgresguide.com)** - This app is built for accessing a PostgreSQL database. The module I use to broker this is [knex](https://www.npmjs.com/package/knex). Knex also supports other database management systems. 
* **[Passport](https://www.npmjs.com/package/passport)** - This module is used to authenticate and create user sessions. It used to be the bane of my existence, but now, I think I've gotten the use of it.

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
- [gulp](https://www.npmjs.com/package/gulp)
- [gulp-jscs](https://www.npmjs.com/package/gulp-jscs)
- [gulp-jshint](https://www.npmjs.com/package/gulp-jshint)
- [gulp-nodemon](https://www.npmjs.com/package/gulp-nodemon)
- [gulp-plumber](https://www.npmjs.com/package/gulp-plumber)
- [jscs](https://www.npmjs.com/package/jscs)
- [jshint](https://www.npmjs.com/package/jshint)
- [jshint-stylish](https://www.npmjs.com/package/jshint-stylish)
- [mocha](https://www.npmjs.com/package/mocha)
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
* [Gulp](https://www.npmjs.com/package/gulp) `npm install -g gulp`
* [Mocha](https://www.npmjs.com/package/mocha) `npm install -g mocha`
* [PostgreSQL (psql)](http://postgresguide.com/setup/install.html)

### Installation
1. Clone this repository into your desired directory  
	`$ git clone https://github.com/uzimike/FullFeatureX.git`

2. Go to application directory  
   `$ cd  directory-to/fullfeaturex`

3. Install the dependencies  
   `$ npm install`

4. Enter PostgreSQL CLI  
   `$ psql`

5. Create your database  
   `# create database fullfeaturex;`

6. Connect to your database  
   `# \c fullfeaturex`

7. Execute the development preset sql to create and populate the table  
  `# \i /full-directory-to/fullfeaturex/database-presets/development.sql`

8. Create your test database  
   `# create database fullfeaturex_test;`

9. Connect to your test database  
   `# \c fullfeaturex_test`

10. Execute the test preset sql to create and populate the table  
   `# \i /full-directory-to/fullfeaturex/database-presets/test.sql`

11. Exit PostgreSQL CLI  
   `# \q`

12. Run gulp in the fullfeaturex directory  
   `$ gulp`

## Testing
The testing side of this project is somewhat a bit of a wasteland. That being said, there are currently a few tests written and set up. To run the tests, all you have to do is run `npm test`.

The tests are currently stored in `fullfeaturex/test/test.js`. Have a look at [mocha](https://mochajs.org/) and [chai](http://chaijs.com/) to see how to use this.

## Notes
The passwords of the preset users are their respective usernames in lowercase (e.g. User: Borat  Password: borat)

## Contribution
I personally intend for this project to be my own work. However, if there are any improvements you'd like to suggest, you're more than welcome to contact me about it.

It doesn't mean I owe you anything, though 😤

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
