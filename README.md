# README #

Parken API

### What is this repository for? ###

* Quick summary

This API makes available data stored from multiple sensors (umidity, temperature, CO2, etc...) installed in a Park. 

### How do I get set up? ###

* Summary of set up

1.Clone the repo - git clone git@bitbucket.org:parken_dev/parkenwebapi.git

2.Open the command line we install swagger - npm install -g swagger

3.Install application packages - npm install

4.Start Project - swagger project start OR npde app.js

For more details about how sawgger and node js restfull api have a look at [This link](https://scotch.io/tutorials/speed-up-your-restful-api-development-in-node-js-with-swagger "RESTful API development in Node.js with Swagger")

* Database configuration

In order to run the API a database config.js file needs to be created with the content bellow:
```
'use strict;'
var settings = {
    port: '10010'
};

settings.mysql = {
    host: 'xxx.xxx.x.x',
    user: 'xxxxxx',
    password: 'xxxxx',
    database: 'xxxxxx'
};

module.exports = settings;
```
### Contribution guidelines ###

* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact