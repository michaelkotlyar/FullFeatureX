# FullFeatureX
This is just another NodeJS Application that acts as a starter template. However, **I wouldn't officially consider it a starter template**. It still has many bugs and blank areas in it. And I have many more features I want to add to it. But since it's publicly available, I may as well promote it as such.

This project is mostly made for my personal use - to learn and condition myself for NodeJS development. **I have no clue if anyone will find this useful**. If you happen to want to use this, then by all means use it! But **be warned**. It's still a work in progress and may be a bit confusing to configure, for I have not put in much thought into the whole structure of the app.

## Features
When I wanted to create this app, I wanted to implement many things that social media websites have - mainly user authentication and media storage. This meant I would have much better knowledge of large scale apps. And by the end of it, I would have a product that would only need some added context for it to go live.

### *Current* feature list
- Database connection
- User authentication
- Responsive layout
- Unit testing

### *Future* feature list
- User profile editing
- User authentication from other sources (e.g. Facebook, Google+)
- User media storage
- Other things… ?

## Resources
Some mentionable resources that I constantly configure throughout the project

### Frontend
* **[Bootstrap 4](https://getbootstrap.com)** - Layout and base styling
* **[HTML5 Boilerplate](https://html5boilerplate.com)** - Layout metadata and icons setup (Still currently using the favicon and icons from this boilerplate…)

### Backend
* **[PostgreSQL](http://postgresguide.com)** - This app is built for accessing a PostgreSQL database. The module I use to broker this is [pg-promise](https://www.npmjs.com/package/pg-promise).
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
- [jquery](https://www.npmjs.com/package/jquery)
- [node-sass-middleware](https://www.npmjs.com/package/node-sass-middleware)
- [passport](https://www.npmjs.com/package/passport)
- [passport-local](https://www.npmjs.com/package/passport-local)
- [pg-promise](https://www.npmjs.com/package/pg-promise)
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
- [jasmine-node](https://www.npmjs.com/package/jasmine-node)
- [jscs](https://www.npmjs.com/package/jscs)
- [jshint](https://www.npmjs.com/package/jshint)
- [jshint-stylish](https://www.npmjs.com/package/jshint-stylish)
- [mocha](https://www.npmjs.com/package/mocha)
- [run-sequence](https://www.npmjs.com/package/run-sequence)
- [tiny-lr](https://www.npmjs.com/package/tiny-lr)

## What is left to be done
Before I add more features, I feel I must do some more research and figure out whether there is a better approach than how I have arranged my app. I see alot of different ways of where you put your app.js file in, what you name it, how you include your routes, configure your database, I could go on. So I must figure out if there is an objectively best way to structure this app so that it can scale with the least pain.

### To do list
- Find and implement optimal structure
- Create own favicon/icons
- Project description

## Install
### Prerequisites
You need a set of CLI tools to run this app. Make sure you have the [node package manager (npm)](https://nodejs.org/en/download/) installed first.

* [npm](https://nodejs.org/en/download/)
* [Gulp](https://www.npmjs.com/package/gulp) `npm install -g gulp`
* [Mocha](https://www.npmjs.com/package/mocha) `npm install -g mocha`
* [PostgreSQL (psql)](http://postgresguide.com/setup/install.html)

### Instructions
1. Clone this repository into your desired directory
2. `$ cd  directory-to/fullfeaturex` Go to application directory
3. `$ npm install` Install the dependencies
4. `$ psql` Enter PostgreSQL CLI
5. `# create database fullfeaturex;` create your database
6. `# \c fullfeaturex` connect to your database
7. `# \i /full-directory-to/fullfeaturex/.schema.sql` execute the stored sql to create and populate the table
8. `$ gulp` Run gulp in the fullfeaturex directory

## Contribution
I personally intend for this project to be my own work. However, if there are any improvements you can suggest, feel free to contact me.
