# README #

Parken API

### What is this repository for? ###

* Quick summary
This API makes available data stored from multiple sensors (umidity, temperature, CO2, etc...) installed in a Park. 

### How do I get set up? ###

* Summary of set up

#Clone the repo - git clone git@bitbucket.org:parken_dev/parkenwebapi.git
#Open the command line we install swagger - npm install -g swagger
#Install application packages - npm install
#Start Project - swagger project start OR npde app.js
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